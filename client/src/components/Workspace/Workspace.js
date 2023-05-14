import './Workspace.scss';
import { createContext, useCallback, useEffect, useState } from 'react';
import { getLinks, getNodes, updateNode } from '../../js/api';
import { Selections } from '../../js/nodemaps';
import Inspector from '../Inspector/Inspector';
import Map from '../Map/Map';
import Sidebar from '../Sidebar/Sidebar';
import Tools from '../Tools/Tools';
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { useImmerReducer } from "use-immer";
import WorkspaceProviders from './WorkspaceProviders';
import { NodesContext, LinksContext, SelectionContext } from './WorkspaceProviders';

/**
 * @typedef {Object} WorkspaceState
 * @property {string} id
 * @property {string|string[]|null} focus - Node ids focused
 * @property {number} cursorX - Cursor y position on map
 * @property {number} cursorY - Cursor y position on map
 * @property {number} panningX - Panning x velocity
 * @property {number} panningY - Panning y velocity
 * @property {string|null} tool - Active tool name
 */


// export const NodesContext = createContext(null);
// export const LinksContext = createContext(null);
// export const SelectionContext = createContext(null);
export const WorkspaceContext = createContext(null);

function save(mapId, nodes) {
    nodes.forEach(node => {
        if (node.moved) {
            updateNode(mapId, node.id, node);
            node.moved = false;
        }
    });
}

/**
 * @param {WorkspaceState} state 
 * @param {{type: string,payload: object}} action 
 */
function workspaceReducer(state, action) {
    const { type, payload } = action;
    switch (type) {
        case 'clear_focus':
            state.focus = null;
            break;
        case 'set_focus':
            state.focus = payload.ids;
            break;
        case 'move_cursor':
            [state.cursorX, state.cursorY] = [payload.x, payload.y];
            break;
        case 'clear_tool':
            state.tool = null;
            break;
        case 'set_tool':
            state.tool = payload.tool;
            break;
        case 'pan':
            const { x, y } = payload;
            if (typeof x !== 'undefined') state.panningX = x;
            if (typeof y !== 'undefined') state.panningY = y;
            break;
        default:
            throw new Error(`Unknown workspaceReduce action: ${type}`);
    }
}

function Workspace({ mapId }) {
    const [nodes, setNodes] = useState([]);
    const [links, setLinks] = useState([]);
    const [selection, setSelection] = useState(new Selections());
    const [workspace, dispatchWorkspace] = useImmerReducer(workspaceReducer, {
        id: mapId,
        focus: null,
        cursorX: 0,
        cursorY: 0,
        panningX: 0,
        panningY: 0,
        tool: null
    });


    ///Retrieve nodes and links
    useEffect(() => {
        getNodes(mapId)
            .then(nodeData => {
                setNodes(nodeData.map((nd, index) => ({ ...nd })))
            });

        getLinks(mapId)
            .then(links => setLinks(links));
    }, [mapId]);

    //#region Autosave
    const handleAutoSave = useCallback(() => save(mapId, nodes), [mapId, nodes]);

    ///Autosave Effect
    useEffect(() => {
        const interval = setInterval(handleAutoSave, 5000);
        return () => clearInterval(interval);
    });
    //#endregion

    // /** @param {Selections} newSelection */
    // const handleSelect = (newSelection) => {
    //     setSelection(newSelection.clone());
    // };

    // /** @param {import('../../js/nodemaps').Node} node */
    // const handleUpdate = (node) => {
    //     const original = nodes.find(n => n.id === node.id);
    //     //If the update was to the name or description send an update immediately.
    //     if (node.name !== original.name || node.description !== original.description) {
    //         updateNode(mapId, node.id, node)
    //             .then(nodeData => {
    //                 setNodes(nodes.filter(n => n.id !== node.id).concat([{ ...nodeData, x: node.x, y: node.y }]));
    //             })
    //     }
    //     //If the update was just a move, mark the node as moved. (The update will be sent on the next autosave)
    //     else {
    //         node.moved = true;
    //         setNodes(nodes.filter(n => n.id !== node.id).concat([node]));
    //     }
    // };

    // const handleAdd = (x = 500, y = 500) => {
    //     createNode(mapId)
    //         .then(nodeData => {
    //             const node = { ...nodeData, x, y };
    //             setNodes([...nodes, node]);
    //             handleSelect(selection.set(node.id));
    //         });
    // };

    // const handleDelete = () => {
    //     const ids = [...selection.ids];
    //     //Send delete requests
    //     ids.forEach(id => deleteNode(mapId, id));
    //     //Remove deleted nodes, and dependant links
    //     setNodes(nodes.filter(node => !selection.contains(node.id)));
    //     setLinks(links.filter(link => !selection.contains(link.node_a_id) && !selection.contains(link.node_b_id)));
    //     //Clear selection and focus
    //     handleSelect(selection.clear());
    //     dispatchWorkspace({ type: 'clear_focus' });
    // };

    // const handleLink = (node_a_id, node_b_id) => {
    //     createLink(null, node_a_id, node_b_id)
    //         .then(link => setLinks([...links, link]))
    // };

    // const handleUnlink = (link_id) => {
    //     deleteLink(null, link_id).then(res => { getLinks(mapId).then(links => setLinks(links)); });
    // };

    return (
        <main className="workspace">
            <WorkspaceContext.Provider value={{ workspace, dispatchWorkspace }}>
                <WorkspaceProviders mapId={mapId} nodes={nodes} setNodes={setNodes} links={links} setLinks={setLinks} selection={selection} setSelection={setSelection}>
                    {/* <Hotkeys> */}
                    <PanelGroup className="workspace-panels" autoSaveId="workspacePanels" direction="horizontal">
                        <Panel className="workspace-panels__panel" defaultSize={20} minSize={15}>
                            <Sidebar />
                        </Panel>
                        <PanelResizeHandle className="workspace-panels__resize-handle" />
                        <Panel className="workspace-panels__panel" minSize={30}>

                            <Map />
                            <Tools />
                        </Panel>
                        <PanelResizeHandle className="workspace-panels__resize-handle" />
                        <Panel className="workspace-panels__panel" defaultSize={20} minSize={18}>
                            <Inspector />
                        </Panel>
                    </PanelGroup>
                    {/* </Hotkeys> */}
                </WorkspaceProviders>
            </WorkspaceContext.Provider>
            {/* <NodesContext.Provider value={nodes}>
                <LinksContext.Provider value={links}>
                    <SelectionContext.Provider value={{ selection, setSelection: handleSelect }}>
                        <WorkspaceContext.Provider value={{ workspace, dispatchWorkspace }}>
                            <Hotkeys onAdd={handleAdd} onDelete={handleDelete} onLink={handleLink} onUnlink={handleUnlink}>
                                <PanelGroup className="workspace-panels" autoSaveId="workspacePanels" direction="horizontal">
                                    <Panel className="workspace-panels__panel" defaultSize={20} minSize={15}>
                                        <Sidebar onSelect={handleSelect} onUnlink={handleUnlink} />
                                    </Panel>
                                    <PanelResizeHandle className="workspace-panels__resize-handle" />
                                    <Panel className="workspace-panels__panel" minSize={30}>

                                        <Map onSelect={handleSelect} onUpdate={handleUpdate} onAdd={handleAdd} onDelete={handleDelete} onLink={handleLink} onUnlink={handleUnlink} />
                                        <Tools onAdd={handleAdd} onDelete={handleDelete} onLink={handleLink} onUnlink={handleUnlink} />
                                    </Panel>
                                    <PanelResizeHandle className="workspace-panels__resize-handle" />
                                    <Panel className="workspace-panels__panel" defaultSize={20} minSize={18}>
                                        <Inspector onSelect={handleSelect} onUpdate={handleUpdate} />
                                    </Panel>
                                </PanelGroup>

                            </Hotkeys>
                        </WorkspaceContext.Provider>
                    </SelectionContext.Provider>
                </LinksContext.Provider>
            </NodesContext.Provider> */}
        </main>
    );
}



export default Workspace;
export { NodesContext, LinksContext, SelectionContext };