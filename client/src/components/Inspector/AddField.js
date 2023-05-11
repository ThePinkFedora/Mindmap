import './AddField.scss';
import { Fields } from '../../js/nodemaps';
import { createField } from '../../js/api';

/**
 * @param {object} props 
 * @param {(type:string=>{})} props.onAddField 
 */
function AddField({ selectedNodes, setFields }) {
    const handleAddField = (type) => {
        createField(null, selectedNodes[0].id, type)
            .then(field => {
                setFields(fields => [...fields,field]); 
            });
    };

    return (
        <div className="add-field">
            <h2 className="add-field__title">Add Field</h2>
            <div className="add-field__list">
                {Fields.eachType.map(typeData =>
                    <button key={typeData.type} className="add-field__button" onClick={() => handleAddField(typeData.type)}>
                        <img className="add-field__icon" src={typeData.icon} alt={typeData.alt} />
                        {typeData.name}
                    </button>
                )}

            </div>

        </div>
    );
}
export default AddField;