import { useContext, useEffect, useState } from 'react';
import './Inspector.scss';
import { LinksContext, NodesContext, SelectionContext, WorkspaceContext } from '../Workspace/Workspace';
import { Links } from '../../js/nodemaps';
import InspectorItem from '../InspectorItem/InspectorItem';
import { deleteField, getFields, updateField } from '../../js/api';
import LinkList from '../LinkList/LinkList';
import linkIcon from '../../assets/images/link.svg';
import InspectorHeader from './InspectorHeader';
import AddField from './AddField';
import { findAndReplace } from '../../js/utils';


/**
 * @param {object} props
 */
function Inspector() {
    const { nodes, updateNode } = useContext(NodesContext);
    /** @type {{selection:import('../../js/nodemaps').Selections}} */
    const { selection, setSelection } = useContext(SelectionContext);
    const { links, onUnlink } = useContext(LinksContext);
    /** @type {{workspace: import('../Workspace/Workspace').WorkspaceState, dispatchWorkspace: React.Dispatch<{type: string;payload: any;}>}} */
    const { workspace, dispatchWorkspace } = useContext(WorkspaceContext);
    const [fields, setFields] = useState(null);

    const selectedNodes = selection.ids.map(id => nodes.find(node => node.id === id));

    useEffect(() => {
        if (fields === null && selection.length) {
            getFields(workspace.id, selection.ids[0])
                .then(fields => {
                    setFields(fields);
                });
        }
    }, [fields, selection, workspace.id]);

    useEffect(() => {
        setFields(null);
    }, [selection]);

    const handleChange = ({ name, value }, field_id) => {
        if (field_id === "name") {
            const node = selectedNodes[0];
            updateNode({ ...node, name: value });
        } else if (field_id === "description") {
            const node = selectedNodes[0];
            updateNode({ ...node, description: value });
        } else {
            updateField(workspace.id, selection.ids[0], field_id, { name, value })
                .then(field => {
                    setFields(fields => findAndReplace([...fields], field, f => f.id === field.id));
                });
        }
    };

    const handleDelete = (field_id) => {
        deleteField(workspace.id, selectedNodes[0].id, field_id)
            .then(res => setFields(fields.filter(field => field.id !== field_id)));
    };

    const handleLinkClick = (link_id) => {
        const link = links.find(link => link.id === link_id);
        const linkNodes = Links.findNodes(link, nodes);
        const otherNode = linkNodes.find(n => !selection.contains(n.id));
        setSelection(selection.set(otherNode.id));
        dispatchWorkspace({ type: 'set_focus', payload: { ids: [otherNode.id] } });
    };

    const handleLinkDelete = (link_id) => {
        onUnlink(link_id);
    };

    return (
        <section className="inspector">
            <InspectorHeader selectedNodes={selectedNodes} onChange={handleChange} />
            <div className="inspector__content">
                <ul className="inspector__field-list">
                    {selectedNodes.length === 1 && <>
                        <li className="inspector__field-item">
                            <InspectorItem
                                type="text"
                                name="Description"
                                value={selectedNodes[0].description}
                                disableRename={true}
                                onChange={changeData => handleChange(changeData, "description")}
                            />
                        </li>
                        {fields && fields.map(field => (
                            <li key={field.id} className="inspector__field-item">
                                <InspectorItem
                                    type={field.type}
                                    name={field.name}
                                    value={field.value}
                                    onChange={changeData => handleChange(changeData, field.id)}
                                    onDelete={() => handleDelete(field.id)}
                                />
                            </li>
                        ))}
                    </>}
                    {selectedNodes.length === 1 &&
                        <li>
                            <div className="inspector-links">
                                <div className="inspector-links__header">
                                    <img className="inspector-links__icon" src={linkIcon} alt="link" />
                                    <h2 className="inspector-links__title">Links</h2>
                                </div>
                                <div className="inspector-links__content">
                                    <LinkList nodeId={selectedNodes[0].id} onClick={handleLinkClick} onRemove={handleLinkDelete} />
                                </div>
                            </div>

                        </li>
                    }
                </ul>

            </div>
            <div className="inspector__footer">

                {selectedNodes.length === 1 && <AddField selectedNodes={selectedNodes} setFields={setFields} />}
            </div>
        </section>
    );
}



export default Inspector;