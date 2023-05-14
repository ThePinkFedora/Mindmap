import { useContext } from 'react';
import './LinksPanel.scss';
import { LinksContext, NodesContext, SelectionContext, WorkspaceContext } from '../Workspace/Workspace';
import { Links } from '../../js/nodemaps';

/**
 * @param {object} props
 */
function LinksPanel() {
    /**@type {object[]} */
    const { links, onUnlink } = useContext(LinksContext);
    /** @type {{selection:import('../../js/nodemaps').Selections}} */
    const { selection, setSelection } = useContext(SelectionContext);
    /**@type {object[]} */
    const { nodes } = useContext(NodesContext);
    const { dispatchWorkspace } = useContext(WorkspaceContext);

    /**
     * @param {Event} event 
     */
    const handleSelect = (event, linkId) => {
        event.preventDefault();
        const link = links.find(link => link.id === linkId);
        const nodeIds = [link.node_a_id, link.node_b_id];
        if (event.ctrlKey) {
            if (selectedLinks.includes(link)) {
                setSelection(selection.remove(nodeIds));
            } else {
                setSelection(selection.add(nodeIds));
            }
        } else {
            setSelection(selection.set(nodeIds));
        }
        dispatchWorkspace({ type: 'set_focus', payload: { ids: selection.ids } });
    };

    /**
     * @param {Event} event 
     * @param {string} linkId 
     */
    const handleRemove = (event, linkId) => {
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
                        <button className="links-list__remove-button" onClick={(event) => handleRemove(event, link.id)}>

                        </button>
                    </li>
                ))}
            </ul>
        </section>
    );
}
export default LinksPanel;