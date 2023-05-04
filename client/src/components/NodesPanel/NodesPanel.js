import { useContext } from 'react';
import './NodesPanel.scss';
import {NodesContext} from '../Workspace/Workspace';

function NodesPanel(){
    const nodes = useContext(NodesContext);

    return (
        <section className="nodes-panel">
            <header className="nodes-panel__header">
                <input className="nodes-panel__search" type="text" name="search" placeholder='Search nodes...'/>
            </header>
            <ul className="node-list">
                {nodes && nodes.map(node => (
                    <li className="node-list__item" key={node.id}>{node.name}</li>
                ))}
            </ul>
        </section>
    );
}
export default NodesPanel;