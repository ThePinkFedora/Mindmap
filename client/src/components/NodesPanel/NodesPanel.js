import { useContext } from 'react';
import './NodesPanel.scss';
import {NodesContext, SelectionContext} from '../Workspace/Workspace';

function NodesPanel({onSelect}){
    const nodes = useContext(NodesContext);
    const selection = useContext(SelectionContext);

    const handleSelect = (event,nodeId) => {
        event.preventDefault();
        onSelect(event.ctrlKey ? selection.toggle(nodeId) : selection.set(nodeId));
    };

    return (
        <section className="nodes-panel">
            <header className="nodes-panel__header">
                <input className="nodes-panel__search" type="text" name="search" placeholder='Search nodes...'/>
            </header>
            <ul className="node-list">
                {nodes && nodes.map(node => (
                    <li className={`node-list__item ${selection.contains(node.id) ? "node-list__item--selected" : ""}`} key={node.id} onClick={(event) => handleSelect(event,node.id)}>{node.name}</li>
                ))}
            </ul>
        </section>
    );
}
export default NodesPanel;