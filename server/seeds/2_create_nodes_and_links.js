
const nodesData = [
  {
    id: 1,
    map_id: 1,
    name: "Flexbox",
    description: `Flexbox is a one-dimensional layout method for arranging items in rows or columns. Items flex (expand) to fill additional space or shrink to fit into smaller spaces. This article explains all the fundamentals.`,
    x: 300,
    y: 300
  },
  {
    id: 2,
    map_id: 1,
    name: "justify-content",
    description: `The CSS justify-content property defines how the browser distributes space between and around content items along the main-axis of a flex container, and the inline axis of a grid container.`,
    x: 150,
    y: 450  
  },
  {
    id: 3,
    map_id: 1,
    name: "align-items",
    description: `The CSS align-items property sets the align-self value on all direct children as a group. In Flexbox, it controls the alignment of items on the Cross Axis. In Grid Layout, it controls the alignment of items on the Block Axis within their grid area.`,
    x: 450,
    y: 450    
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
