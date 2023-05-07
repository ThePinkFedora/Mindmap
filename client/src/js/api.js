
const fieldsData = [
    {
        id: 1,
        node_id: 1,
        type: "text",
        name: "Usage",
        value: "CSS Layout"
    },
    {
        id: 2,
        node_id: 1,
        type: "checklist",
        name: "TODO",
        value: "Text element value"
    },
    {
        id: 3,
        node_id: 1,
        type: "attachment",
        name: "MDN Resource",
        value: "https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox"
    },
];

export async function getFields(map_id,node_id){
    await new Promise((resolve,reject) => setTimeout(resolve,500));
    return fieldsData;
}

export async function addField(map_id,node_id,type){
    await new Promise((resolve,reject) => setTimeout(resolve,500));
    const field = {
        id: fieldsData.length+1,
        node_id: node_id,
        type: type,
        name: "",
        value: ""
    };

    fieldsData.push(field);
    return field;
}

export async function updateField(map_id,node_id,field_id,{name,value}){
    await new Promise((resolve,reject) => setTimeout(resolve,500));
    let field = fieldsData.find(f => f.id === field_id);
    field.name=name;
    field.value=value;
    return field;
}