import { useContext, useState } from 'react';
import './Tools.scss';
import { LinksContext/*, NodesContext*/, SelectionContext, WorkspaceContext } from '../Workspace/Workspace';
import addIcon from '../../assets/images/add.svg';
import removeIcon from '../../assets/images/remove.svg';
import linkIcon from '../../assets/images/link.svg';
import unlinkIcon from '../../assets/images/unlink.svg';
import { ToolNames } from '../../js/tools';

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
    const { selection } = useContext(SelectionContext);
    /** @type {{workspace: import('../Workspace/Workspace').WorkspaceState, dispatchWorkspace: React.Dispatch<{type: string;payload: any;}>}} */
    const { workspace, dispatchWorkspace } = useContext(WorkspaceContext);
    const [tooltip, setTooltip] = useState(null);

    /** @param {Event} event */
    const handleAdd = (event) => {
        //Prevent focus
        event.stopPropagation();
        event.preventDefault();

        ///Toggle or set tool to Add
        if (workspace.tool === ToolNames.Add) {
            dispatchWorkspace({ type: 'clear_tool' });
        } else {
            dispatchWorkspace({ type: 'set_tool', payload: { tool: ToolNames.Add } });
        }
    };

    /** @param {Event} event */
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

    /**
     * @param {Event} event 
     * @param {string|null} tool - The tool being hovered, if any
     */
    const handleHover = (event, tool) => {
        switch (tool) {
            case ToolNames.Add:
                setTooltip('Add');
                break;
            case 'remove':
                setTooltip('Delete (Requires Selection)');
                break;
            case 'link':
                setTooltip('Link (Select 2 Nodes)');
                break;
            case 'unlink':
                setTooltip('Unlink (Select 2 Nodes)');
                break;
            default:
                setTooltip(null);
                break;
        }
    };

    const tooltipMessage = workspace.tool === ToolNames.Add ? "Click to add a node" : tooltip;

    return (
        <div className={`tools`}>
            <div className="tools__window" onMouseLeave={(e) => handleHover(e, null)}>
                <div className="tools__header">
                    <h1 className="tools__title">Tools</h1>
                </div>
                <div className="tools__content">
                    <ul className="tools__list">
                        <li className="tools__item"
                            onMouseEnter={(e) => handleHover(e, 'add')}
                        >
                            <button className={`tools__button ${workspace.tool === ToolNames.Add ? "tools__button--active" : ""}`} tabIndex="-1" onMouseDown={handleAdd} >
                                <img className="tools__icon" src={addIcon} alt="add" /> Add Node
                            </button>
                        </li>
                        <li className="tools__item"
                            onMouseEnter={(e) => handleHover(e, 'remove')}
                        >
                            <button className='tools__button' onMouseDown={handleDelete} disabled={!selection.length}>
                                <img className="tools__icon" src={removeIcon} alt="remove" /> Delete Node
                            </button>
                        </li>
                        <li className="tools__item"
                            onMouseEnter={(e) => handleHover(e, 'link')}
                        >
                            <button className='tools__button' onMouseDown={handleLink} disabled={selection.length !== 2}>
                                <img className="tools__icon" src={linkIcon} alt="link" /> Link Nodes

                            </button>
                        </li>
                        <li className="tools__item"
                            onMouseEnter={(e) => handleHover(e, 'unlink')}
                        >
                            <button className='tools__button' onMouseDown={handleUnlink} disabled={selection.length !== 2}>
                                <img className="tools__icon" src={unlinkIcon} alt="unlink" /> Unlink Nodes
                            </button>
                        </li>
                    </ul>
                </div>
                {tooltipMessage &&
                    <div className="tools__tooltip tools__tooltip--visible">
                        {tooltipMessage}
                    </div>
                }
            </div>
        </div>
    );
}

// function Tooltip({ message }) {
//     return (
//         <div className='tooltip'>
//             <span className="tooltip__message">{message}</span>
//         </div>
//     )
// }

export default Tools;