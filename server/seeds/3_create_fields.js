const fieldsData = [
    {
        id: 1,
        node_id: 1,
        type: "text",
        name: "Text Element",
        value: "Text element value"
    },
];

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
    await knex('field').del()
    await knex('field').insert(fieldsData);
};
