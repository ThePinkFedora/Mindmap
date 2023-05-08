import './InspectorItem.scss';
// import textIcon from '../../assets/images/paragraph.svg';
// import checkIcon from '../../assets/images/checkbox2.svg';
// import attachIcon from '../../assets/images/attachment.svg';
import EditableText from '../EditableText/EditableText';
import { Fields } from '../../js/nodemaps';

// const icons = {
//     text: {
//         icon: textIcon,
//         iconAlt: "text"
//     },
//     checklist: {
//         icon: checkIcon,
//         alt: "check"
//     },
//     attachment: {
//         icon: attachIcon,
//         alt: "link"
//     }
// }

/**
 * 
 * @param {object} props
 * @param {string} props.type
 * @param {string} props.name
 * @param {string} props.value
 * @param {(changeData:{name:string, value: string, prevName:string}) => {}} props.onChange
 * @returns 
 */
function InspectorItem({type,name,value,disableRename=false,onChange,onDelete}){

    if(!Fields.icons[type]){
        return <h3>Invalid type {type?.toString() || typeof type}</h3>
    }

    const {icon,iconAlt} = Fields.icons[type];

    const handleNameChange = (newValue)=>{
        onChange({name:newValue,value:value});
    };

    const handleValueChange = (newValue) => {
        onChange({name:name,value:newValue});
    };

   

    return (
        <div className="inspector-item">
            <div className="inspector-item__header">
                <img src={icon} alt={iconAlt} className="inspector-item__icon" />
                {disableRename 
                    ? <h2 className="inspector-item__title">{name}</h2>
                    : <EditableText type="line" name={name+"Name"} value={name} onEndEdit={handleNameChange}/>
                }
                {onDelete && <button className="inspector-item__button" onClick={onDelete}>Delete</button> }
            </div>
            <div className="inspector-item__content">
                {type === "text" 
                    && <EditableText name={name} placeholder={"Add a more detailed description..."} value={value} onEndEdit={handleValueChange}/> 
                    }

            </div>
        </div>
    );
}


export default InspectorItem;