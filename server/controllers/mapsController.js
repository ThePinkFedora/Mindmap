const knexConfig = require("../knexfile");
const knex = require("knex");
const db = knex(knexConfig);
const {v4} = require('uuid');

const tableName = 'map';

module.exports = {
    getAll: async (req,res) => {
        try{
            const results = await db(tableName);
            res.json({results});
        }catch(error){
            console.error(error);
            res.sendStatus(500);
        }
    },
    getSingle: async (req,res) => {
        const {mapId} = req.params;
        try{
            const result = await db(tableName).where({id:mapId});
            if(result.length > 0){
                const item = result[0];
                res.json(item);
            }else{
                res.status(404).send('Map not found');
            }
        }catch(error){
            console.error(error);
            res.sendStatus(500);
        }
    },
    create: async (req,res) => {
        const {name,description} = req.body;

        if (!name) {
            return res.status(400).json({
                error: "POST body must contain all requiredProperties",
                requiredProperties: [
                    "name"
                ]
            });
        }

        try{
            const id = v4();
            await db(tableName).insert({id,name,description: description ?? ""});
            const results = await db(tableName).where({id});
            if(results.length){
                res.status(201).json(results[0]);
            }else{
                res.status(400).send('Invalid body');
            }
        }catch(error){
            console.error(error);
            res.sendStatus(500);
        }
    },
    update: async (req,res) => {
        const {mapId} = req.params;
        const {name,description} = req.body;
        try{
            const updates = await db(tableName).where({id: mapId}).update({name,description});
            if(updates){
                const results = await db(tableName).where({id: mapId});
                res.json(results[0]);
            }else{
                res.status(404).send('Map not found');
            }
        }catch(error){
            console.error(error);
            res.sendStatus(500);
        }
    },
    delete: async (req,res) => {
        const {mapId} = req.params;
        try{
            const updates = await db(tableName).where({id: mapId}).del();
            if(updates){
                res.status(200).json({success: true});
            }else{
                res.status(404).send('Map not found');
            }
        }catch(error){
            console.error(error);
            res.sendStatus(500);
        }
    },
}