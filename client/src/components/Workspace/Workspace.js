import { createContext, useContext, useState } from 'react';
import Inspector from '../Inspector/Inspector';
import Map from '../Map/Map';
import Sidebar from '../Sidebar/Sidebar';
import './Workspace.scss';
import { Selections } from '../../js/nodemaps';
import Tools from '../Tools/Tools';
import { deleteLink, getLinks, postLink } from '../../js/api';

export const NodesContext = createContext(null);
export const LinksContext = createContext(null);
export const SelectionContext = createContext(null);


const nodesData = [
    {
        id: 1,
        map_id: 1,
        name: "Flexbox",
        description: `Flexbox is a one-dimensional layout method for arranging items in rows or columns. Items flex (expand) to fill additional space or shrink to fit into smaller spaces. This article explains all the fundamentals.`,
        x: 300,
        y: 200
    },
    {
        id: 2,
        map_id: 1,
        name: "justify-content",
        description: `The CSS justify-content property defines how the browser distributes space between and around content items along the main-axis of a flex container, and the inline axis of a grid container.`,
        x: 550,
        y: 200
    },
    {
        id: 3,
        map_id: 1,
        name: "align-items",
        description: `The CSS align-items property sets the align-self value on all direct children as a group. In Flexbox, it controls the alignment of items on the Cross Axis. In Grid Layout, it controls the alignment of items on the Block Axis within their grid area.`,
        x: 700,
        y: 300
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

function Workspace() {
    const [nodes, setNodes] = useState(null);
    const [links, setLinks] = useState(null);
    const [selection, setSelection] = useState(new Selections());


    useState(() => {
        setNodes(nodesData);
    }, []);

    useState(() => {
        if (links === null) {
            getLinks(null)
                .then(links => setLinks(links));
        }
    }, [links]);

    const handleSelect = (selection) => {
        setSelection(selection.clone());
    };

    const handleUpdate = (node) => {
        setNodes(nodes.filter(n => n.id !== node.id).concat([node]));
    };

    const handleAdd = () => {
        const newNode = {
            id: nodesData.length+1,
            map_id: 1,
            name: "",
            description: "",
            x: 500,
            y: 500
        };
        setNodes([...nodes,newNode]);
    };

    const handleDelete = () => {
        setNodes(nodes.filter(node => !selection.contains(node.id)));
        handleSelect(selection.clear());
    };

    const handleLink = (node_a_id, node_b_id) => {
        postLink(null, node_a_id, node_b_id)
            .then(link => setLinks([...links, link]))
    };

    const handleUnlink = (link_id) => {
        deleteLink(null, link_id).then(res => { setLinks(null) });
    };


    return (
        <main className="workspace">
            <NodesContext.Provider value={nodes}>
                <LinksContext.Provider value={links}>
                    <SelectionContext.Provider value={selection}>
                        <Sidebar onSelect={handleSelect} />
                        <Map onSelect={handleSelect} onUpdate={handleUpdate} />
                        <Inspector onUpdate={handleUpdate} />
                        <Tools onAdd={handleAdd} onDelete={handleDelete} onLink={handleLink} onUnlink={handleUnlink} />
                    </SelectionContext.Provider>
                </LinksContext.Provider>
            </NodesContext.Provider>
        </main>
    );
}
export default Workspace;