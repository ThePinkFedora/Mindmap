import { createContext, useContext, useState } from 'react';
import Inspector from '../Inspector/Inspector';
import Map from '../Map/Map';
import Sidebar from '../Sidebar/Sidebar';
import './Workspace.scss';

const NodesContext = createContext(null);

const nodesData = [
    {
        id: 1,
        map_id: 1,
        name: "Flexbox",
        description: `Flexbox is a one-dimensional layout method for arranging items in rows or columns. Items flex (expand) to fill additional space or shrink to fit into smaller spaces. This article explains all the fundamentals.`,
        x: 100,
        y: 100
    },
    {
        id: 2,
        map_id: 1,
        name: "justify-content",
        description: `The CSS justify-content property defines how the browser distributes space between and around content items along the main-axis of a flex container, and the inline axis of a grid container.`,
        x: 200,
        y: 100
    },
    {
        id: 3,
        map_id: 1,
        name: "align-items",
        description: `The CSS align-items property sets the align-self value on all direct children as a group. In Flexbox, it controls the alignment of items on the Cross Axis. In Grid Layout, it controls the alignment of items on the Block Axis within their grid area.`,
        x: 300,
        y: 100
    },
];

function Workspace() {
    const [nodes, setNodes] = useState(null);

    useState(() => {
        setNodes(nodesData);
    }, []);


    return (
        <main className="workspace">
            <NodesContext.Provider value={nodes}>
                <Sidebar />
                <Map />
                <Inspector />
            </NodesContext.Provider>
        </main>
    );
}
export default Workspace;