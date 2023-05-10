import './Workspace.scss';
import { createContext, startTransition, useContext, useState } from 'react';
import { createNode, deleteLink, deleteNode, getLinks, getNodes, createLink, updateNode } from '../../js/api';
import { Selections } from '../../js/nodemaps';
import Inspector from '../Inspector/Inspector';
import Map from '../Map/Map';
import Sidebar from '../Sidebar/Sidebar';
import Tools from '../Tools/Tools';
import Hotkeys from './Hotkeys';


export const NodesContext = createContext(null);
export const LinksContext = createContext(null);
export const SelectionContext = createContext(null);
export const WorkspaceContext = createContext(null);


function Workspace() {
    const [nodes, setNodes] = useState(null);
    const [links, setLinks] = useState(null);
    const [workspace, setWorkspace] = useState({
        focus: null,
        cursorX: 0,
        cursorY: 0
    });
    const [selection, setSelection] = useState(new Selections());

    ///Retrieve nodes and links
    useState(() => {
        getNodes(1)
            .then(nodeData => {
                setNodes(nodeData.map((nd, index) => ({ ...nd, x: 375 + index * 175, y: 150 + Math.random() * 400 })))
            });

        retrieveLinks();
    }, []);

    function retrieveLinks() {
        getLinks(1)
            .then(links => setLinks(links));
    }

    /**
     * @param {Selections} newSelection 
     */
    const handleSelect = (newSelection) => {
        // if(!newSelection.equals(selection)){
            setSelection(newSelection.clone());
        // }
    };

    const handleUpdate = (node) => {
        const original = nodes.find(n => n.id === node.id);
        if (node.name !== original.name || node.description !== original.description) {
            updateNode(1, node.id, node)
                .then(nodeData => {
                    setNodes(nodes.filter(n => n.id !== node.id).concat([{ ...nodeData, x: node.x, y: node.y }]));
                })
        } else {
            setNodes(nodes.filter(n => n.id !== node.id).concat([node]));
        }
    };

    const handleAdd = (x = 500, y = 500) => {
        createNode(1)
            .then(nodeData => {
                const node = { ...nodeData, x, y };
                setNodes([...nodes, node]);
                handleSelect(selection.set(node.id));
            });
    };

    const handleDelete = () => {
        const ids = [...selection.ids];
        
        //Send delete requests
        ids.forEach(id => deleteNode(1, id)); 

        //Remove deleted nodes, and dependant links
        setNodes(nodes.filter(node => !selection.contains(node.id)));
        setLinks(links.filter(link => !selection.contains(link.node_a_id) && !selection.contains(link.node_b_id)));

        handleSelect(selection.clear());
    };

    const handleLink = (node_a_id, node_b_id) => {
        createLink(null, node_a_id, node_b_id)
            .then(link => setLinks([...links, link]))
    };

    const handleUnlink = (link_id) => {
        deleteLink(null, link_id).then(res => { retrieveLinks(); });
    };

    return (
        <main className="workspace">
            <NodesContext.Provider value={nodes}>
                <LinksContext.Provider value={links}>
                    <SelectionContext.Provider value={{selection,setSelection:handleSelect}}>
                        <WorkspaceContext.Provider value={{ workspace, setWorkspace }}>
                            <Hotkeys onAdd={handleAdd} onDelete={handleDelete} onLink={handleLink} onUnlink={handleUnlink}>
                                <Sidebar onSelect={handleSelect} onUnlink={handleUnlink} />
                                <Map onSelect={handleSelect} onUpdate={handleUpdate} onAdd={handleAdd} onDelete={handleDelete} onLink={handleLink} onUnlink={handleUnlink} />
                                <Inspector onSelect={handleSelect} onUpdate={handleUpdate} />
                                <Tools onAdd={handleAdd} onDelete={handleDelete} onLink={handleLink} onUnlink={handleUnlink} />
                            </Hotkeys>
                        </WorkspaceContext.Provider>
                    </SelectionContext.Provider>
                </LinksContext.Provider>
            </NodesContext.Provider>
        </main>
    );
}

function MyProviders({ children }) {
    return (
        <>
            {children}
        </>
    );
}



export default Workspace;