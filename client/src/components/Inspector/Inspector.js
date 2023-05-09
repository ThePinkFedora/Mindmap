import { useContext, useEffect, useState } from 'react';
import './Inspector.scss';
import { LinksContext, NodesContext, SelectionContext, WorkspaceContext } from '../Workspace/Workspace';
import { Selections, Fields, Links } from '../../js/nodemaps';
import InspectorItem from '../InspectorItem/InspectorItem';
import { createField, deleteField, getFields, updateField } from '../../js/api';
import LinkList from '../LinkList/LinkList';
import linkIcon from '../../assets/images/link.svg';


/**
 * @param {object} props
 * @param {*} props.onUpdate
 */
function Inspector({ onSelect,onUpdate }) {
    const nodes = useContext(NodesContext);
    /**@type {Selections} */
    const selections = useContext(SelectionContext);
    const links = useContext(LinksContext);
    const {workspace,setWorkspace} = useContext(WorkspaceContext);
    const selectedNodes = selections.ids.map(id => nodes.find(node => node.id === id));

    const [fields, setFields] = useState(null);

    useEffect(() => {
        if (fields === null && selections.length) {
            getFields(1, selections.ids[0])
                .then(fields => {
                    setFields(fields);
                });
        }
    }, [fields, selections.length]);

    useEffect(() => {
        setFields(null);
    }, [selections]);

    const handleChange = ({ name, value }, field_id) => {
        if (field_id === "name") {
            const node = selectedNodes[0];
            // node.name = value;
            onUpdate({ ...node, name: value });
        } else if (field_id === "description") {
            const node = selectedNodes[0];
            // node.description = value;
            onUpdate({ ...node, description: value });
        } else {
            updateField(1, selections.ids[0], field_id, { name, value })
                .then(field => {
                    setFields(null);
                });
        }
    };

    const handleAddField = (type) => {
        createField(null, selectedNodes[0].id, type)
            .then(field => {
                setFields(null); ///Force fields to reload
            });
    };

    const handleDelete = (field_id) => {
        deleteField(1, selectedNodes[0].id, field_id)
            .then(res => setFields(fields.filter(field => field.id !== field_id)));
    };

    const handleLinkClick = (link_id) => {
        const link = links.find(link => link.id === link_id);
        const linkNodes = Links.findNodes(link,nodes);
        const otherNode = linkNodes.find(n => !selections.contains(n.id));
        onSelect(selections.set(otherNode.id));
        setWorkspace({...workspace,focus:otherNode.id});

        console.log({link,linkNodes,otherNode});
    };

    const handleLinkDelete = (link_id) => {

    };

    return (
        <section className="inspector">
            <header className="inspector__header">
                <h1 className="inspector__title">{selectedNodes.length === 0
                    ? "Inspector"
                    : selectedNodes.length === 1 ? <input type="text" name="name" className="inspector__title-field" value={selectedNodes[0].name} onChange={(event) => handleChange({ name: event.target.name, value: event.target.value }, "name")} />
                        : `${selectedNodes.length} Nodes`}</h1>
            </header>
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
                    {selectedNodes.length===1 && 
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
                {selectedNodes.length === 1 && <AddField onAddField={handleAddField} />}
            </div>
        </section>
    );
}

/**
 * @param {object} props 
 * @param {(type:string=>{})} props.onAddField 
 */
function AddField({ onAddField }) {
    return (
        <div className="add-field">
            <h2 className="add-field__title">Add Field</h2>
            <div className="add-field__list">
                {Fields.eachType.map(typeData =>
                    <button key={typeData.type} className="add-field__button" onClick={() => onAddField(typeData.type)}>
                        <img className="add-field__icon" src={typeData.icon} alt={typeData.alt} />
                        {typeData.name}
                    </button>
                )}

            </div>

        </div>
    );
}

export default Inspector;