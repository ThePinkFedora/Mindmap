import { useContext, useState } from 'react';
import './Tools.scss';
import { LinksContext/*, NodesContext*/, SelectionContext } from '../Workspace/Workspace';
import addIcon from '../../assets/images/add.svg';
import removeIcon from '../../assets/images/remove.svg';
import linkIcon from '../../assets/images/link.svg';
import unlinkIcon from '../../assets/images/unlink.svg';

// import { Selections } from '../../js/nodemaps';

/**
 * @param {object} props 
 * @param {onAddNode} props 
 * @param {onDeleteNode} props 
 * @param {onLink} props 
 * @param {onUnlink} props
 */
function Tools({ onAdd, onDelete, onLink, onUnlink }) {
    const links = useContext(LinksContext);
    /** @type {{selection:import('../../js/nodemaps').Selections}} */
    const {
        selection
    } = useContext(SelectionContext);

    const handleAdd = (event) => {
        onAdd();
    };

    const handleDelete = (event) => {
        onDelete(selection.ids[0]);
    };

    const handleLink = (event) => {
        onLink(selection.ids[0], selection.ids[1]);
    };

    const handleUnlink = (event) => {
        const link = links.find(link => selection.contains(link.node_a_id) && selection.contains(link.node_b_id));
        onUnlink(link.id);
    };

    return (
        <div className="tools">
            <div className="tools__window">
                <div className="tools__header">
                    <h1 className="tools__title">Tools</h1>
                </div>
                <div className="tools__content">
                    <ul className="tools__list">
                        <li className="tools__item">
                            <button className='tools__button' onClick={handleAdd}>
                                <img className="tools__icon" src={addIcon} alt="add" /> Add Node
                            </button>
                        </li>
                        <li className="tools__item">
                            <button className='tools__button' onClick={handleDelete} disabled={!selection.length}>
                                <img className="tools__icon" src={removeIcon} alt="remove" /> Delete Node
                            </button>
                        </li>
                        <li className="tools__item">
                            <button className='tools__button' onClick={handleLink} disabled={selection.length !== 2}>
                                <img className="tools__icon" src={linkIcon} alt="link" /> Link Nodes
                            </button>
                        </li>
                        <li className="tools__item">
                            <button className='tools__button' onClick={handleUnlink} disabled={selection.length !== 2}>
                                <img className="tools__icon" src={unlinkIcon} alt="unlink" /> Unlink Nodes
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
export default Tools;