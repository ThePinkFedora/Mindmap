const mapsData = [
  {
    id: 1,
    name: "CSS",
    description: "CSS"
  }
];

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('map').del()
  await knex('map').insert(mapsData);
};
