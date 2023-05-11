const knexConfig = require("../knexfile");
const knex = require("knex");
const db = knex(knexConfig);

module.exports = {
    searchNodes: async (req, res) => {
        const { mapId } = req.params;
        const { query } = req.query;



        if (!query && query !== "") {
            return res.status(400).json({
                error: "Query parameters must contain all requiredParameters",
                requiredParameters: [
                    "query"
                ]
            });
        }
        //Remove wrapping quotes
        const parsedQuery = query.replace(/^["'](.+(?=["']$))["']$/, '$1');

        console.log(parsedQuery);
        try {

            const results = await
                db.select('*')
                    .from(
                        //Get node_id from fields which have a name or value matching the query
                        db
                            .select('node_id', 'field.name as name', 'node.name as node_name', 'value', db.raw('? as type', ['field']))
                            .from('field')
                            .whereILike('field.name', `%${parsedQuery}%`)
                            .orWhereILike('value', `%${parsedQuery}%`)
                            //Join node names
                            .join('node', 'field.node_id', 'node.id')
                            //Union with nodes with a name or description matching the query
                            .union([
                                db.select('id as node_id', 'name', 'name as node_name', 'description as value', db.raw('? as type', ['node']))
                                    .from('node')
                                    .whereILike('name', `%${parsedQuery}%`)
                                    .orWhereILike('description', `%${parsedQuery}%`)
                            ])
                            .as('t1')

                    )
                    //Filter for only node_Ids within
                    .whereIn('node_id', db.select('id').from('node').where({ map_id: mapId }))
                    .orderBy([{ column: 'node_id' }, { column: 'type', order: 'desc' }]);

            ///Group results by id
            const nodeIds = [...new Set(results.map(res => res.node_id))];
            const finalResults = {
                results: nodeIds.map(id => ({
                    node_id: id,
                    node_name: results.find(res => res.node_id === id).node_name,
                    matches: results
                        .filter(res => res.node_id === id)
                        .map(res => ({ name: res.name, value: res.value, type: res.type }))
                }))
            }


            res.json(finalResults);
        } catch (error) {
            console.error(error);
            res.sendStatus(500);
        }
    },

}