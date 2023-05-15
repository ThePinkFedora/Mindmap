
# Mindmap

Mindmap, this project, is an intuitive and flexible app that allows users to visually structure and organize their data using a mind map format. Each topic is represented by a node, and users can create links between related nodes. Users can add various types of fields to each node, including text, checklists, attachments, and more, making it easy to store and access different kinds of information.
### Table of Contents
[Features](#features)<br>
[Tech Stack](#features)<br>
[Installation](#features)<br>
[Usage](#usage)<br>
[Server Endpoints](#server-endpoints)<br>


## Features

- Create and manage multiple mind maps
- Add and edit nodes within a mind map
- Create connections (links) between nodes
- Attach different types of fields to nodes, such as text, and attachments

## Tech Stack

**Client:** React, Sass, Axios

**Server:** Node, Express, Knex, MySQL


## Installation

1. Clone the repository: `git clone https://github.com/ThePinkFedora/Mindmap.git`
2. Navigate to the project directory: `cd mindmap`

### Client

1. Navigate to the client directory: `cd client`
2. Install the dependencies: `npm install`

### Server

1. Navigate to the server directory: `cd server`
2. Install the dependencies: `npm install`
3. Set up the database: npm run migrate
4. Set up the database: npm run seed

## Usage
For detailed instructions on how to use the Mindmap application and its client interface, please refer to the [User Guide](./docs/user-guide.md).

## Server Endpoints

- [Maps](#maps):
  - [GET /maps](#get-maps)
  - [POST /maps](#post-maps)
  - [GET /maps/:mapId](#get-mapsmapid)
  - [PUT /maps/:mapId](#put-mapsmapid)
  - [DELETE /maps/:mapId](#delete-mapsmapid)
- [Nodes](#nodes):
  - [GET /maps/:mapId/nodes](#get-mapsmapidnodes)
  - [POST /maps/:mapId/nodes](#post-mapsmapidnodes)
  - [GET /maps/:mapId/nodes/:nodeId](#get-mapsmapidnodesnodeid)
  - [PUT /maps/:mapId/nodes/:nodeId](#put-mapsmapidnodesnodeid)
  - [DELETE /maps/:mapId/nodes/:nodeId](#delete-mapsmapidnodesnodeid)
- [Links](#links):
  - [GET /maps/:mapId/links](#get-mapsmapidlinks)
  - [POST /maps/:mapId/links](#post-mapsmapidlinks)
  - [GET /maps/:mapId/links/:linkId](#get-mapsmapidlinkslinkid)
  - [DELETE /maps/:mapId/links/:linkId](#delete-mapsmapidlinkslinkid)
  - [GET /maps/:mapId/nodes/:nodeId/links](#get-mapsmapidnodesnodeidlinks)
- [Fields](#fields):
  - [GET /maps/:mapId/nodes/:nodeId/fields](#get-mapsmapidnodesnodeidfields)
  - [POST /maps/:mapId/nodes/:nodeId/fields](#post-mapsmapidnodesnodeidfields)
  - [GET /maps/:mapId/nodes/:nodeId/fields/:fieldId](#get-mapsmapidnodesnodeidfieldsfieldid)
  - [PUT /maps/:mapId/nodes/:nodeId/fields/:fieldId](#put-mapsmapidnodesnodeidfieldsfieldid)
  - [DELETE /maps/:mapId/nodes/:nodeId/fields/:fieldId](#delete-mapsmapidnodesnodeidfieldsfieldid)
- [Node Search](#node-search)
  - [GET /maps/:mapId/node-search/?query=...](#get-mapsmapidnode-searchquery)

### Common Request and Response Formats

All requests and responses in this section follow the JSON format.

Request Format

```
{
  // Request body format goes here
}
```

Response Format

```
{
  // Response body format goes here
}
```

For responses returning arrays, the array is enclosed within an object with a results property. The response format will look like this:

```
{
  "results": [
    // Array of objects goes here
  ]
}
```

### Maps

#### `GET /maps/`

- Description: Retrieve all maps
- Request Parameters: None
- Response: [Array of Map Objects](#map-object)

#### `POST /maps/`

- Description: Retrieve all maps.
- Request: [Map Object](#map-object)
- Response: [Map Object](#map-object)

#### `GET /maps/:mapId`

- Description: Retrieve a specific map by its ID.
- Request Parameters:
  - `mapId` (path parameter): The ID of the map to retrieve.
- Response: [Map Object](#map-object)

#### `PUT /maps/:mapId`

- Description: Retrieve a specific map by its ID.
- Request Parameters:
  - `mapId` (path parameter): The ID of the map to retrieve.
- Request: [Map Object](#map-object)
- Response: [Map Object](#map-object)


#### `DELETE /maps/:mapId`

- Description: Delete a specific map by its ID.
- Request Parameters:
  - `mapId` (path parameter): The ID of the map to delete.
- Response Body Example: `{ "success": true }`

### Nodes

#### `GET /maps/:mapId/nodes`

- Description: Retrieve all nodes within a specific map.
- Request Parameters:
  - `mapId` (path parameter): The ID of the map.
- Respose: [Array of Node Objects](#node-object)

#### `POST /maps/:mapId/nodes`

- Description: Create a new node within a specific map.
- Request Parameters:
  - `mapId` (path parameter): The ID of the map to which the node belongs.
- Request: [Node Object](#node-object)
- Response: [Node Object](#node-object)

#### `GET /maps/:mapId/nodes/:nodeId`

- Description: Retrieve a specific node by its ID.
- Request Parameters:
  - `mapId` (path parameter): The ID of the map to which the node belongs.
  - `nodeId` (path parameter): The ID of the node to retrieve.
- Response: [Node Object](#node-object)

#### `PUT /maps/:mapId/nodes/:nodeId`

- Description: Update a specific node by its ID.
- Request Parameters:
  - `mapId` (path parameter): The ID of the map to which the node belongs.
  - `nodeId` (path parameter): The ID of the node to update.
- Request: [Node Object](#node-object)
- Response: [Node Object](#node-object)

#### `DELETE /maps/:mapId/nodes/:nodeId`

- Description: Delete a specific node by its ID.
- Request Parameters:
  - `mapId` (path parameter): The ID of the map to which the node belongs.
  - `nodeId` (path parameter): The ID of the node to delete.
- Response Body Example: `{ "success": true }`

### Links

#### `GET /maps/:mapId/links`

- Description: Retrieve all links within a specific map.
- Request Parameters:
  - `mapId` (path parameter): The ID of the map.
- Response: [Array of Link Objects](#link-object)

#### `POST /maps/:mapId/links`

- Description: Create a new link within a specific map.
- Request Parameters:
  - `mapId` (path parameter): The ID of the map to which the link belongs.
- Request: [Link Object](#link-object)
- Response: [Link Object](#link-object)

#### `GET /maps/:mapId/links/:linkId`

- Description: Retrieve a specific link by its ID.
- Request Parameters:
  - `mapId` (path parameter): The ID of the map to which the link belongs.
  - `linkId` (path parameter): The ID of the link to retrieve.
- Response: [Link Object](#link-object)

#### `DELETE /maps/:mapId/links/:linkId`

- Description: Delete a specific link by its ID.
- Request Parameters:
  - `mapId` (path parameter): The ID of the map to which the link belongs.
  - `linkId` (path parameter): The ID of the link to delete.
- Response Body Example: `{ "success": true }`

#### `GET /maps/:mapId/nodes/:nodeId/links`

- Description: Retrieve all links for a specific node.
- Request Parameters:
  - `mapId` (path parameter): The ID of the map to which the node belongs.
  - `nodeId` (path parameter): The ID of the node.
- Response: [Array of Link Objects](#link-object)

### Fields

#### `GET /maps/:mapId/nodes/:nodeId/fields`

- Description: Retrieve all fields for a specific node.
- Request Parameters:
  - `mapId` (path parameter): The ID of the map to which the node belongs.
  - `nodeId` (path parameter): The ID of the node.
- Response: [Array of Field Objects](#field-object)

#### `POST /maps/:mapId/nodes/:nodeId/fields`

- Description: Create a new field for a specific node.
- Request Parameters:
  - `mapId` (path parameter): The ID of the map to which the node belongs.
  - `nodeId` (path parameter): The ID of the node.
- Request: [Field Object](#field-object)
- Response: [Field Object](#field-object)

#### `GET /maps/:mapId/nodes/:nodeId/fields/:fieldId`

- Description: Retrieve a specific field for a specific node by its ID.
- Request Parameters:
  - `mapId` (path parameter): The ID of the map to which the node belongs.
  - `nodeId` (path parameter): The ID of the node.
  - `fieldId` (path parameter): The ID of the field to retrieve.
- Response: [Field Object](#field-object)

#### `PUT /maps/:mapId/nodes/:nodeId/fields/:fieldId`

- Description: Update a specific field for a specific node by its ID.
- Request Parameters:
  - `mapId` (path parameter): The ID of the map to which the node belongs.
  - `nodeId` (path parameter): The ID of the node.
  - `fieldId` (path parameter): The ID of the field to update.
- Request: [Field Object](#field-object)
- Response: [Field Object](#field-object)

#### `DELETE /maps/:mapId/nodes/:nodeId/fields/:fieldId`

- Description: Delete a specific field for a specific node by its ID.
- Request Parameters:
  - `mapId` (path parameter): The ID of the map to which the node belongs.
  - `nodeId` (path parameter): The ID of the node.
  - `fieldId` (path parameter): The ID of the field to delete.
- Response: [Field Object](#field-object)
- Response Body Example: `{ "success": true }`

### Node Search
#### `GET /maps/:mapId/node-search?query=...`
- Description: Search for nodes which match a given query.
- Request Parameters:
  - `mapId` (path parameter): The ID of the map to which the node belongs.
  - `query` (query parameter): The query to search for.
- Response: [Array of Node Query Objects](#node-query-object)

### Object Definitions

#### Map Object

- Description: Represents a mind map object.
- Attributes:
  - `name` (string): Name of the map.
  - `description` (string): Description of the map.
  - `id` (string, response only): Unique identifier of the map.

#### Node Object

- Description: Represents a node within a mind map.
- Attributes:
  - `name` (string): Name of the node.
  - `description` (string): Description of the node.
  - `x` (number): X coordinate of the node.
  - `y` (number): Y coordinate of the node.
  - `id` (string, response only): Unique identifier of the node.

#### Link Object

- Description: Represents a link between two nodes.
- Attributes:
  - `node_a_id` (string): Unique identifier of the first node.
  - `node_b_id` (string): Unique identifier of the second node.
  - `id` (string, response only): Unique identifier of the link.
  - `node_a_name` (string, response only): Name of the first node.
  - `node_b_name` (string, response only): Name of the second node.

#### Field Object

- Description: Represents a field within a node.
- Attributes:
  - `type` (string): Type of the field.
  - `name` (string): Name of the field.
  - `value` (string): Value of the field.
  - `id` (string, response only): Unique identifier of the field.
  - `node_id` (string, response only): Unique identifier of the node to which the field belongs.

#### Node Query Object
- Description: Represents a search query result for a node.
- Attributes:
- `node_id` (string): Unique identifier of the node.
- `node_name` (string): Name of the node.
- `matches` (array): An array of search matches for the node.
  - `name` (string): The matched field name or attribute.
  - `value` (string): The matched field value or attribute description.
  - `type` (string): The type of match (e.g., "node", "field").