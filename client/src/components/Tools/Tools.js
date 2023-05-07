import { useContext } from 'react';
import './Tools.scss';
import { LinksContext, NodesContext, SelectionContext } from '../Workspace/Workspace';
import { Selections } from '../../js/nodemaps';

/**
 * @param {object} props 
 * @param {onAddNode} props 
 * @param {onDeleteNode} props 
 * @param {onLink} props 
 * @param {onUnlink} props
 */
function Tools({ onAdd, onDelete, onLink, onUnlink }) {
    const nodes = useContext(NodesContext);
    const links = useContext(LinksContext);
    /** @type {Selections} */
    const selection = useContext(SelectionContext);

    const handleAdd = (event) => {
        onAdd();
    };

    const handleDelete = (event) => {
        onDelete(selection.ids[0]);
    };

    const handleLink = (event) => {
        onLink(selection.ids[0],selection.ids[1]);
    };

    const handleUnlink = (event) => {
        onUnlink(selection.ids[0],selection.ids[1]);
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
                                Add
                            </button>
                        </li>
                        <li className="tools__item">
                            <button className='tools__button' onClick={handleDelete} disabled={!selection.length}>
                                Delete
                            </button>
                        </li>
                        <li className="tools__item">
                            <button className='tools__button' onClick={handleLink} disabled={selection.length!==2}>
                                Link
                            </button>
                        </li>
                        <li className="tools__item">
                            <button className='tools__button' onClick={handleUnlink} disabled={selection.length!==2}>
                                Unlink
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
export default Tools;