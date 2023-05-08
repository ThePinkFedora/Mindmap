import { useContext, useEffect, useState } from 'react';
import './Inspector.scss';
import { NodesContext, SelectionContext } from '../Workspace/Workspace';
import { Selections, Fields } from '../../js/nodemaps';
import InspectorItem from '../InspectorItem/InspectorItem';
import { createField, getFields,updateField } from '../../js/api';


/**
 * @param {object} props
 * @param {*} props.onUpdate
 */
function Inspector({ onUpdate }) {
    const nodes = useContext(NodesContext);
    /**@type {Selections} */
    const selections = useContext(SelectionContext);
    const selectedNodes = selections.ids.map(id => nodes.find(node => node.id === id));

    const [fields, setFields] = useState(null);

    useEffect(() => {
        if (fields === null && selections.length) {
            getFields(1, selections.ids[0])
                .then(fields => {
                    setFields(fields);
                });
        }
    }, [fields,selections.length]);

    useEffect(()=>{
        setFields(null);
    },[selections]);

    const handleChange = ({name,value},field_id) => {
        if(field_id === "name"){
            const node = selectedNodes[0];
            // node.name = value;
            onUpdate({...node,name:value});
        }else if (field_id === "description") {
            const node = selectedNodes[0];
            // node.description = value;
            onUpdate({...node,description:value});
        }else{
            updateField(1,selections.ids[0],field_id,{name,value})
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

    return (
        <section className="inspector">
            <header className="inspector__header">
                <h1 className="inspector__title">{selectedNodes.length === 0
                    ? "Inspector"
                    : selectedNodes.length === 1 ? <input type="text" name="name" className="inspector__title-field" value={selectedNodes[0].name} onChange={(event)=>handleChange({name:event.target.name,value:event.target.value},"name")} />
                        : `${selectedNodes.length} Nodes`}</h1>
            </header>
            <div className="inspector__content">
                <ul className="inspector__field-list">
                    {selectedNodes.length === 1 && <>
                        <li className="inspector__field-item">
                            <InspectorItem type="text" name="Description" value={selectedNodes[0].description} disableRename={true} onChange={changeData=>handleChange(changeData,"description")} />
                        </li>
                        {fields && fields.map(field => (
                            <li key={field.id} className="inspector__field-item">
                                <InspectorItem type={field.type} name={field.name} value={field.value} onChange={changeData=>handleChange(changeData,field.id)} />
                            </li>
                        ))}
                    </>}
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