import axios from 'axios';

const config = {
    baseUrl: process.env.REACT_APP_BASE_URL
}


/**
 * GET /maps/:mapId/
 * @param {*} map_id 
 * @returns {Promise<object>}
 */
export async function getMap(map_id) {
    try {
        const response = await axios.get(`${config.baseUrl}/maps/${map_id}/`);
        return response.data;
    } catch (error) {
        console.error("Error during getMap");
        throw error;
    }
}

/**
 * GET /maps/:mapId/
 * @param {*} map_id 
 * @returns {Promise<object>}
 */
export async function createMap(name, description) {
    try {
        const response = await axios.post(`${config.baseUrl}/maps/`, { name, description });
        return response.data;
    } catch (error) {
        console.error("Error during createMap");
        throw error;
    }
}


/**
 * GET /maps/:mapId/nodes
 * @param {*} map_id 
 * @returns {Promise<object[]>}
 */
export async function getNodes(map_id) {
    try {
        const response = await axios.get(`${config.baseUrl}/maps/${map_id}/nodes`);
        return response.data.results;
    } catch (error) {
        console.error("Error during getNodes");
        throw error;
    }
}

/**
 * POST /maps/:mapId/nodes
 * @param {*} map_id 
 * @returns {Promise<object>}
 */
export async function createNode(map_id) {
    try {
        const response = await axios.post(`${config.baseUrl}/maps/${map_id}/nodes`, { name: "New Node" });
        return response.data;
    } catch (error) {
        console.error("Error during createNode");
        throw error;
    }
}

/**
 * PUT /maps/:mapId/nodes/:nodeId
 * @param {*} map_id 
 * @returns {Promise<object>}
 */
export async function updateNode(map_id, node_id, node) {
    try {
        const response = await axios.put(`${config.baseUrl}/maps/${map_id}/nodes/${node_id}`, node);
        return response.data;
    } catch (error) {
        console.error("Error during updateNode");
        throw error;
    }
}

/**
 * DELETE /maps/:mapId/nodes/:nodeId
 * @param {string} map_id 
 * @param {string} node_id 
 * @param {object} node 
 * @returns {Promise<object>}
 */
export async function deleteNode(map_id, node_id, node) {
    try {
        const response = await axios.delete(`${config.baseUrl}/maps/${map_id}/nodes/${node_id}`, node);
        return response.data;
    } catch (error) {
        console.error("Error during deleteNode");
        throw error;
    }
}


/**
 * GET /maps/:mapid/links
 * @param {string} map_id 
 * @returns {Promise<object[]>}
 */
export async function getLinks(map_id) {
    try {
        const response = await axios.get(`${config.baseUrl}/maps/${map_id}/links`);
        return response.data.results;
    } catch (error) {
        console.error("Error during getLinks");
        throw error;
    }
}

/**
 * POST /maps/:mapid/links
 * @param {string} map_id 
 * @returns {Promise<object>}
 */
export async function createLink(map_id, node_a_id, node_b_id) {
    try {
        const response = await axios.post(`${config.baseUrl}/maps/${map_id}/links`, { node_a_id, node_b_id });
        return response.data;
    } catch (error) {
        console.error("Error during createLink");
        throw error;
    }
}

/**
 * DELETE /maps/:mapId/links/link:id
 * @param {string} map_id 
 * @param {string} link_id 
 * @returns {Promise<object>}
 */
export async function deleteLink(map_id, link_id) {
    try {
        const response = await axios.delete(`${config.baseUrl}/maps/${map_id}/links/${link_id}`);
        return response.data;
    } catch (error) {
        console.error("Error during deleteLink");
        throw error;
    }
}

/**
 * GET /maps/:mapId/nodes/:nodeId/fields
 * @param {string} map_id 
 * @param {string} node_id 
 * @returns {Promise<object[]>}
 */
export async function getFields(map_id, node_id) {
    try {
        const response = await axios.get(`${config.baseUrl}/maps/${map_id}/nodes/${node_id}/fields`);
        return response.data.results;
    } catch (error) {
        console.error("Error during getFields");
        throw error;
    }
}

/**
 * POST /maps/:mapId/nodes/:nodeId/fields
 * @param {string} map_id 
 * @param {string} node_id 
 * @param {string} type 
 * @returns {Promise<object>}
 */
export async function createField(map_id, node_id, type) {
    try {
        const response = await axios.post(`${config.baseUrl}/maps/${map_id}/nodes/${node_id}/fields`, { type, name: "New Field", value: "" });
        return response.data;
    } catch (error) {
        console.error("Error during createField");
        throw error;
    }
}

/**
 * PUT /maps/:mapId/nodes/:nodeId/fields/:fieldId
 * @param {string} map_id 
 * @param {string} node_id 
 * @param {string} field_id
 * @param {object} data
 * @param {string} data.name
 * @param {string} data.value
 * @returns {Promise<object>}
 */
export async function updateField(map_id, node_id, field_id, { name, value }) {
    try {
        const response = await axios.put(`${config.baseUrl}/maps/${map_id}/nodes/${node_id}/fields/${field_id}`, { name, value });
        return response.data;
    } catch (error) {
        console.error("Error during updateField");
        throw error;
    }
}

/**
 * POST /maps/:mapId/nodes/:nodeId/fields
 * @param {string} map_id 
 * @param {string} node_id 
 * @param {string} field_id 
 * @returns {Promise<object>}
 */
export async function deleteField(map_id, node_id, field_id) {
    try {
        const response = await axios.delete(`${config.baseUrl}/maps/${map_id}/nodes/${node_id}/fields/${field_id}`);
        return response.data;
    } catch (error) {
        console.error("Error during deleteField");
        throw error;
    }
}


export async function searchNodes(map_id, query) {
    try {
        const response = await axios.get(`${config.baseUrl}/maps/${map_id}/node-search/?query=${query}`);
        return response.data;
    } catch (error) {
        console.error("Error during searchNodes");
        throw error;
    }
}