/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('node',(table) => {
        table.uuid('id').primary();
        table.uuid('map_id')
            .references('map.id')
            .onUpdate("CASCADE")
            .onDelete("CASCADE");
        table.string('name').notNullable();
        table.text('description').notNullable().defaultTo("");
        table.integer('x').notNullable().defaultTo(0);
        table.integer('y').notNullable().defaultTo(0);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('node');
};
