import { createContext, useContext, useState } from 'react';
import Inspector from '../Inspector/Inspector';
import Map from '../Map/Map';
import Sidebar from '../Sidebar/Sidebar';
import './Workspace.scss';
import { Selections } from '../../js/nodemaps';
import Tools from '../Tools/Tools';
import { createNode, deleteLink, deleteNode, getLinks, getNodes, createLink, updateNode } from '../../js/api';

export const NodesContext = createContext(null);
export const LinksContext = createContext(null);
export const SelectionContext = createContext(null);
export const WorkspaceContext = createContext(null);


function Workspace() {
    const [nodes, setNodes] = useState(null);
    const [links, setLinks] = useState(null);
    const [workspace, setWorkspace] = useState({
        focus: null
    });
    const [selection, setSelection] = useState(new Selections());


    ///Retrieve nodes and links
    useState(() => {
        getNodes(1)
            .then(nodeData => {
                setNodes(nodeData.map((nd, index) => ({ ...nd, x: 500 + index * 175, y: 150 + Math.random() * 400 })))
            });

        retrieveLinks();
    }, []);

    function retrieveLinks() {
        getLinks(null)
            .then(links => setLinks(links));
    }

    const handleSelect = (selection) => {
        setSelection(selection.clone());
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
        // const newNode = {
        //     id: nodesData.length + 1,
        //     map_id: 1,
        //     name: "",
        //     description: "",
        //     x,
        //     y
        // };
        createNode(1)
            .then(nodeData => {
                const node = { ...nodeData, x, y };
                console.log("New node: ", node);
                setNodes([...nodes, node]);
            });
    };

    const handleDelete = () => {
        const ids = [...selection.ids];
        ids.forEach(id => {
            deleteNode(1, id);
        });
        setNodes(nodes.filter(node => !selection.contains(node.id)));
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
                    <SelectionContext.Provider value={selection}>
                        <WorkspaceContext.Provider value={{ workspace, setWorkspace }}>
                            <Sidebar onSelect={handleSelect} onUnlink={handleUnlink} />
                            <Map onSelect={handleSelect} onUpdate={handleUpdate} onAdd={handleAdd} onDelete={handleDelete} onLink={handleLink} onUnlink={handleUnlink} />
                            <Inspector onSelect={handleSelect} onUpdate={handleUpdate} />
                            <Tools onAdd={handleAdd} onDelete={handleDelete} onLink={handleLink} onUnlink={handleUnlink} />
                        </WorkspaceContext.Provider>
                    </SelectionContext.Provider>
                </LinksContext.Provider>
            </NodesContext.Provider>
        </main>
    );
}
export default Workspace;