import './CreateMap.scss';
import { useState } from 'react';
import { createMap } from '../../js/api';
import { useNavigate } from 'react-router-dom';

function CreateMap({ close }) {
    const [values, setValues] = useState({
        name: "",
        description: ""
    });
    const navigate = useNavigate();

    const isValid = values.name.length > 0;

    /** @param {Event} event */
    const handleChange = (event) => {
        const { name, value } = event.target;
        setValues({ ...values, [name]: value });
    }

    /** @param {Event} event */
    const handleSubmit = (event) => {
        event.preventDefault();
        if (isValid) {
            createMap(values.name, values.description)
                .then(map => {
                    navigate(`/workspace/${map.id}`);
                    close();
                });
        }
    };

    return (
        <section className="create-map">
            <header className="create-map__header">
                <h2 className="create-map__title">Create Map</h2>
            </header>

            <form className="create-map__body">
                <div className="create-map__row">
                    <div className="create-map__field">
                        <label htmlFor="name" className="create-map__label create-map__label--required">Name</label>
                        <input type="text" name="name" className="create-map__input" value={values.name} onChange={handleChange} />
                    </div>
                    <div className="create-map__field">
                        <label htmlFor="description" className="create-map__label">Description</label>
                        <textarea name="description" className="create-map__input" value={values.description} onChange={handleChange} />
                    </div>
                </div>
                <div className="create-map__row">
                    <button className="create-map__submit" disabled={!isValid} onClick={handleSubmit}>Create</button>
                </div>
            </form>
        </section>
    );
}
export default CreateMap;