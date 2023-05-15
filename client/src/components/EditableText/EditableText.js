import './EditableText.scss';
import { useEffect, useRef, useState } from 'react';
import editIcon from '../../assets/images/edit.svg';

/**
 * 
 * @param {object} props
 * @param {string} props.type - line (one-line), paragraph (multi-line)
 * @param {string} props.name
 * @param {string} props.value
 * @param {string} props.placeholder
 * @param {(string)=>{}} props.onChange
 * @param {(string)=>{}} props.onEndEdit
 * @param {(Event=>{})} props.onChange
 */
function EditableText({ type = "textarea", name, value, placeholder, onChange, onEndEdit, fieldStyle = {}, textStyle = {} }) {
    const [editing, setEditing] = useState(false);
    const [currentValue, setCurrentValue] = useState(value);
    const fieldRef = useRef(null);

    //#region Finish Editing
    //This handles completing any pending edit when the component is unmounted
    const finishEditRef = useRef(null);
    finishEditRef.current = () => {
        if (editing) {
            onEndEdit(currentValue);
            setEditing(false);
        }
    };
    useEffect(() => {
        return () => finishEditRef.current();
    }, [])
    //#endregion

    useEffect(() => {
        setCurrentValue(value);
    }, [value])

    //Whenever the editing state changes to true, focus the field
    useEffect(() => {
        if (editing) {
            fieldRef.current.focus();
        }
    }, [editing])

    /**
     * @param {Event} event 
     */
    const handleClick = (event) => {
        event.stopPropagation();
        event.preventDefault();
        setEditing(true);
        if (type === 'line') {
            fieldRef.current.setSelectionRange(0, fieldRef.current.value.length);
        }
    };

    /**
     * @param {Event} event 
     */
    const handleFocus = (event) => {
        event.stopPropagation();
        setEditing(true);

    };

    /**
     * @param {Event} event 
     */
    const handleBlur = (event) => {
        event.stopPropagation();
        setEditing(false);
        onEndEdit(currentValue);
    };

    const handleChange = (event) => {
        let { value } = event.target;
        if (type === "line") {
            value = value.replace("\n", "");
        }
        setCurrentValue(value);
        onChange?.(value);
    };

    const handleKey = (event) => {
        if (editing && type === 'line' && event.key === 'Enter') {
            fieldRef.current.blur();
        }
    };

    return (
        <div className={`editable-text`}>
            <textarea
                className={`editable-text__textarea ${(!editing && value) ? "editable-text__textarea--hidden" : ""} editable-text__textarea--${type}`}
                name={name}
                value={currentValue}
                placeholder={placeholder}
                ref={fieldRef}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChange={handleChange}
                onKeyDown={handleKey}
                style={fieldStyle}
            ></textarea>

            {(!editing && ["textarea", "line"].includes(type))
                && <p
                    className={`editable-text__text ${type === "line" ? "editable-text__text--line" : ""}`}
                    onClick={handleClick}
                    style={textStyle}
                >
                    {currentValue}
                </p>
            }

            {(!editing && type === "link") &&
                <>
                    <a className={`editable-text__text editable-text__text--link`} href={currentValue}>{currentValue}</a>
                    {currentValue && <img className="editable-text__icon" src={editIcon} alt="edit" onClick={handleClick} />}
                </>
            }

        </div>
    );
}
export default EditableText;