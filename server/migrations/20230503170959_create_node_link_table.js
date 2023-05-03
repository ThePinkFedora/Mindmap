/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('link', (table) => {
        table.uuid('id').primary();
        table.uuid('node_a_id')
            .references('node.id')
            .onUpdate('CASCADE')
            .onDelete('CASCADE')
            .notNullable();
        table.uuid('node_b_id')
            .references('node.id')
            .onUpdate('CASCADE')
            .onDelete('CASCADE')
            .notNullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('link');
};
