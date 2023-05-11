import { useContext } from 'react';
import './LinksPanel.scss';
import { LinksContext, NodesContext, SelectionContext, WorkspaceContext } from '../Workspace/Workspace';
import { Links, Selections } from '../../js/nodemaps';

/**
 * @param {object} props
 * @param {(selection:Selections)=>{}} props.onSelect
 * @returns 
 */
function LinksPanel({ onSelect,onUnlink }) {
    /**@type {object[]} */
    const links = useContext(LinksContext);
    /**@type {Selections} */
    const {selection,setSelection} = useContext(SelectionContext);
    /**@type {object[]} */
    const nodes = useContext(NodesContext);
    const {workspace,setWorkspace} = useContext(WorkspaceContext);

    /**
     * @param {Event} event 
     */
    const handleSelect = (event, linkId) => {
        event.preventDefault();
        const link = links.find(link => link.id === linkId);
        const nodeIds = [link.node_a_id, link.node_b_id];
        if (event.ctrlKey) {
            if (selectedLinks.includes(link)) {
                onSelect(selection.remove(nodeIds));
            } else {
                onSelect(selection.add(nodeIds));
            }
        } else {
            onSelect(selection.set(nodeIds));
        }

        setWorkspace({...workspace,focus:[...selection.ids]});
    };

    /**
     * @param {Event} event 
     * @param {string} linkId 
     */
    const handleRemove = (event,linkId) => {
        event.stopPropagation();
        onUnlink(linkId);
    }

    const selectedLinks = links.filter(l => selection.contains(l.node_a_id) && selection.contains(l.node_b_id));

    return (
        <section className="links-panel">
            <header className="links-panel__header">
                <input className="links-panel__search" type="text" name="search" placeholder='Search links...' />
            </header>
            <ul className="links-list">
                {links && links.map(link => (
                    <li
                        className={`links-list__item ${selectedLinks.includes(link) ? "links-list__item--selected" : ""}`}
                        key={link.id} 
                        onClick={(event) => handleSelect(event, link.id)}
                    >
                        {Links.createLinkName(link, nodes)}
                        <button className="links-list__remove-button" onClick={(event)=>handleRemove(event,link.id)}>

                        </button>
                    </li>
                ))}
            </ul>
        </section>
    );
}
export default LinksPanel;