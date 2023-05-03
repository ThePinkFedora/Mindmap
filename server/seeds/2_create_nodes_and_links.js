
const nodesData = [
  {
    id: 1,
    map_id: 1,
    name: "Flexbox"
  },
  {
    id: 2,
    map_id: 1,
    name: "justify-content"
  },
  {
    id: 3,
    map_id: 1,
    name: "align-items"
  },
];

const linksData = [
  {
    id: 1,
    node_a_id: 1,
    node_b_id: 2,
  },
  {
    id: 2,
    node_a_id: 1,
    node_b_id: 3,
  },
];

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('node').del()
  await knex('node').insert(nodesData);

  // Deletes ALL existing entries
  await knex('link').del()
  await knex('link').insert(linksData);
};
