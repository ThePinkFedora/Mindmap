/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('field', (table) => {
        table.uuid('id').primary();
        table.uuid('node_id')
            .references('node.id')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
        table.string('type').notNullable();
        table.string('name').notNullable().defaultTo("");
        table.text('value').notNullable().defaultTo("");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('field');
};
