import './LinkList.scss';
import removeIcon from '../../assets/images/remove.svg';
import { useContext } from 'react';
import { LinksContext, NodesContext } from '../Workspace/Workspace';
import { Links } from '../../js/nodemaps';

/**
 * 
 * @param {object} props
 * @param {object[]} props.node
 * @param {object[]} props.onRemove
 */
function LinkList({ nodeId, onClick, onRemove }) {
    const { links } = useContext(LinksContext) ?? [];
    const { nodes } = useContext(NodesContext);

    const filtered = nodeId ? links.filter(l => l.node_a_id === nodeId || l.node_b_id === nodeId) : links;

    const linkObjects = Links.createLinkObjectList(filtered, nodes);

    return (
        <div className="link-list">
            <ul className="link-list__list">
                {linkObjects.map(linkObject => <LinkItem key={linkObject.id} linkObject={linkObject} forId={nodeId} onClick={() => onClick(linkObject.id)} onRemove={() => onRemove(linkObject.id)} />)}
            </ul>
        </div>
    );
}

/**
 * 
 * @param {object} props
 * @param {object} props.link
 * @param {()=>{}} props.onRemove
 */
function LinkItem({ linkObject, forId, onClick, onRemove }) {
    const text = forId ?
        (linkObject.node_a_id === forId ? linkObject.node_b_name : linkObject.node_a_name)
        : `${linkObject.node_a_name} - ${linkObject.node_b_name}`;

    return (
        <div className="link-item">
            <button className="link-item__button" onClick={onClick}>{text}</button>
            <button className="link-item__remove-button" onClick={onRemove}><img className="link-item__icon" src={removeIcon} alt="remove" /></button>
        </div>
    );
}

export default LinkList;