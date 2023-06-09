const knexConfig = require("../knexfile");
const knex = require("knex");
const db = knex(knexConfig);
const { v4 } = require('uuid');

const tableName = 'link';

module.exports = {

    getAll: async (req, res) => {
        try {
            const results = await db(tableName);
            res.json({ results });
        } catch (error) {
            console.error(error);
            res.sendStatus(500);
        }
    },
    getAllForMap: async (req, res) => {
        const { mapId } = req.params;
        try {
            const results = await db(tableName)
                .select('link.id', 'link.node_a_id', 'link.node_b_id', 'node1.name as node_a_name', 'node2.name as node_b_name')
                .join('node as node1', 'link.node_a_id', 'node1.id')
                .join('node as node2', 'link.node_b_id', 'node2.id')
                .where({ "node1.map_id": mapId });

            res.json({ results });
        } catch (error) {
            console.error(error);
            res.sendStatus(500);
        }
    },
    getAllForNode: async (req, res) => {
        const { nodeId } = req.params; //node id
        try {
            const results = await db(tableName).where({ node_a_id: nodeId }).orWhere({ node_b_id: nodeId });
            res.json({ results });
        } catch (error) {
            console.error(error);
            res.sendStatus(500);
        }
    },
    getSingle: async (req, res) => {
        const { linkId } = req.params;
        try {
            const result = await db(tableName).where({ id: linkId });
            if (result.length > 0) {
                const link = result[0];
                res.json(link);
            } else {
                res.status(404).send('Link not found');
            }
        } catch (error) {
            console.error(error);
            res.sendStatus(500);
        }
    },
    create: async (req, res) => {
        const { node_a_id, node_b_id } = req.body;

        if (!node_a_id || !node_b_id) {
            return res.status(400).json({
                error: "POST body must contain all requiredProperties",
                requiredProperties: [
                    "node_a_id",
                    "node_b_id"
                ]
            });
        }

        try {
            const id = v4();
            await db(tableName).insert({ id, node_a_id, node_b_id });
            const results = await db(tableName).where({ id });
            if (results.length) {
                res.status(201).json(results[0]);
            } else {
                res.status(400).send('Invalid body');
            }
        } catch (error) {
            console.error(error);
            res.sendStatus(500);
        }
    },
    update: async (req, res) => {
        const { linkId } = req.params;
        const { node_a_id, node_b_id } = req.body;
        try {
            const updates = await db(tableName).where({ id: linkId }).update({ node_a_id, node_b_id });
            if (updates) {
                const results = await db(tableName).where({ id: linkId });
                res.json(results[0]);
            } else {
                res.status(404).send('Link not found');
            }
        } catch (error) {
            console.error(error);
            res.sendStatus(500);
        }
    },
    delete: async (req, res) => {
        const { linkId } = req.params;
        try {
            const updates = await db(tableName).where({ id: linkId }).del();
            if (updates) {
                res.status(200).json({ success: true });
            } else {
                res.status(404).send('Link not found');
            }
        } catch (error) {
            console.error(error);
            res.sendStatus(500);
        }
    },
};