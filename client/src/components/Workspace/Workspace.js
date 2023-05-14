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

    return (
        <main className="workspace">
            <WorkspaceContext.Provider value={{ workspace, dispatchWorkspace }}>
                <WorkspaceProviders mapId={mapId} nodes={nodes} setNodes={setNodes} links={links} setLinks={setLinks} selection={selection} setSelection={setSelection}>
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
                </WorkspaceProviders>
            </WorkspaceContext.Provider>
        </main>
    );
}

export default Workspace;
export { NodesContext, LinksContext, SelectionContext };