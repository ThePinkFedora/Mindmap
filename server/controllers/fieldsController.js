const knexConfig = require("../knexfile");
const knex = require("knex");
const db = knex(knexConfig);
const { v4 } = require('uuid');

const tableName = 'field';

module.exports = {
    getAll: async (req, res) => {
        try {
            const results = await db(tableName);
            res.json(results);
        } catch (error) {
            console.error(error);
            res.sendStatus(500);
        }
    },
    getAllForNode: async (req, res) => {
        const { nodeId } = req.params; //node id
        try {
            const results = await db(tableName).where({ node_id: nodeId });
            res.json({ results });
        } catch (error) {
            console.error(error);
            res.sendStatus(500);
        }
    },
    getSingle: async (req, res) => {
        const { fieldId } = req.params;
        try {
            const result = await db(tableName).where({ id: fieldId });
            if (result.length > 0) {
                const item = result[0];
                res.json(item);
            } else {
                res.status(404).send('Field not found');
            }
        } catch (error) {
            console.error(error);
            res.sendStatus(500);
        }
    },
    create: async (req, res) => {
        const { nodeId } = req.params;
        const { type, name, value } = req.body;
        
        if (!type) {
            return res.status(400).json({
                error: "POST body must contain all requiredProperties",
                requiredProperties: [
                    "type"
                ]
            });
        }

        try {
            const id = v4();
            await db(tableName).insert({ id, node_id: nodeId, type, name, value });
            const results = await db(tableName).where({ id });
            if (results.length > 0) {
                res.status(201).json(results[0]);
            } else {
                res.status(400).send('Field body');
            }
        } catch (error) {
            console.error(error);
            res.sendStatus(500);
        }
    },
    update: async (req, res) => {
        const { fieldId } = req.params;
        const { type, name, value } = req.body;
        try {
            const updates = await db(tableName).where({ id: fieldId }).update({ type, name, value });
            if (updates) {
                const results = await db(tableName).where({ id: fieldId });
                res.json(results[0]);
            } else {
                res.status(404).send('Field not found');
            }
        } catch (error) {
            console.error(error);
            res.sendStatus(500);
        }
    },
    delete: async (req, res) => {
        const { fieldId } = req.params;
        try {
            const updates = await db(tableName).where({ id: fieldId }).del();
            if (updates) {
                res.status(200).json({success: true});
            } else {
                res.status(404).send('Field not found');
            }
        } catch (error) {
            console.error(error);
            res.sendStatus(500);
        }
    },
}