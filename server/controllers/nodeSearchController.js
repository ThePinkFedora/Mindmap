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

            const results = await db.select('*')
                .from(
                    //Get node_id from fields which have a name or value matching the query
                    db.select('node_id', 'name', 'value',db.raw('? as type',['field'])).from('field')
                        .whereILike('name', `%${parsedQuery}%`)
                        .orWhereILike('value', `%${parsedQuery}%`)
                        //Union with nodes with a name or description matching the query
                        .union([
                            db.select('id as node_id', 'name', 'description as value',db.raw('? as type',['node']))
                                .from('node')
                                .whereILike('name', `%${parsedQuery}%`)
                                .orWhereILike('description', `%${parsedQuery}%`)
                        ]).as('t1')
                )
                //Filter for only node_Ids within
                .whereIn('node_id', db.select('id').from('node').where({ map_id: mapId }))
                .orderBy('node_id');

            res.json({ results });
        } catch (error) {
            console.error(error);
            res.sendStatus(500);
        }
    },

}