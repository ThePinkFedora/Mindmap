import { createContext, useContext } from 'react';
import { createLink, createNode, deleteLink, deleteNode, getLinks, updateNode } from '../../js/api';
import { WorkspaceContext } from './Workspace';
import Hotkeys from './Hotkeys';
export const NodesContext = createContext(null);
export const LinksContext = createContext(null);
export const SelectionContext = createContext(null);

function WorkspaceProviders({ mapId, nodes, setNodes, links, setLinks, selection, setSelection, children }) {
    const { dispatchWorkspace } = useContext(WorkspaceContext);

    /** @param {Selections} newSelection */
    const handleSelect = (newSelection) => {
        setSelection(newSelection.clone());
    };

    /** @param {import('../../js/nodemaps').Node} node */
    const handleUpdate = (node) => {
        const original = nodes.find(n => n.id === node.id);
        //If the update was to the name or description send an update immediately.
        if (node.name !== original.name || node.description !== original.description) {
            updateNode(mapId, node.id, node)
                .then(nodeData => {
                    setNodes(nodes.filter(n => n.id !== node.id).concat([{ ...nodeData, x: node.x, y: node.y }]));
                })
        }
        //If the update was just a move, mark the node as moved. (The update will be sent on the next autosave)
        else {
            node.moved = true;
            setNodes(nodes.filter(n => n.id !== node.id).concat([node]));
        }
    };

    /**
     * @param {number} x 
     * @param {number} y 
     * @param {boolean} autoLink - If true, the newly created node will be automatically link to the selected node.
     */
    const handleAdd = (x = 500, y = 500, autoLink = false) => {
        createNode(mapId)
            .then(nodeData => {
                const node = { ...nodeData, x, y };
                setNodes([...nodes, node]);
                if (autoLink && selection.length === 1) {
                    handleLink(selection.ids[0], node.id);
                }
                handleSelect(selection.set(node.id));
            });
    };

    const handleDelete = () => {
        const ids = [...selection.ids];
        //Send delete requests
        ids.forEach(id => deleteNode(mapId, id));
        //Remove deleted nodes, and dependant links
        setNodes(nodes.filter(node => !selection.contains(node.id)));
        setLinks(links.filter(link => !selection.contains(link.node_a_id) && !selection.contains(link.node_b_id)));
        //Clear selection and focus
        handleSelect(selection.clear());
        dispatchWorkspace({ type: 'clear_focus' });
    };

    const handleLink = (node_a_id, node_b_id) => {
        createLink(null, node_a_id, node_b_id)
            .then(link => setLinks([...links, link]))
    };

    const handleUnlink = (link_id) => {
        deleteLink(null, link_id).then(res => { getLinks(mapId).then(links => setLinks(links)); });
    };

    return (
        <NodesContext.Provider value={{ nodes, addNode: handleAdd, deleteNodes: handleDelete, updateNode: handleUpdate }}>
            <LinksContext.Provider value={{ links, onLink: handleLink, onUnlink: handleUnlink }}>
                <SelectionContext.Provider value={{ selection, setSelection: handleSelect }}>
                    <Hotkeys onAdd={handleAdd} onDelete={handleDelete} onLink={handleLink} onUnlink={handleUnlink}>
                        {children}
                    </Hotkeys>
                </SelectionContext.Provider>
            </LinksContext.Provider>
        </NodesContext.Provider>
    );
}
export default WorkspaceProviders;