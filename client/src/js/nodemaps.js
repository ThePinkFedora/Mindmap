import textIcon from '../assets/images/description.svg';
import checkIcon from '../assets/images/checkbox2.svg';
import attachIcon from '../assets/images/attachment.svg';

function getUniqueValues(array) {
  return Array.from(new Set(array));
}

export class Selections {
  /**@type {string[]} */
  ids = [];

  constructor(ids = [], stateFunc = null) {
    this.ids = ids;
  }
  /**@returns {string|undefined} */
  get selectedNode() {
    return this.ids.length === 1 ? this.ids[0] : undefined;
  }
  /**@param {string|null|undefined} id */
  set selectedNode(id) {
    this.set(id);
  }
  /**@returns {number} */
  get length() {
    return this.ids.length;
  }
  /**
   * @param {string} id 
   * @returns {Selections} - this
  */
  add(id) {
    if(Array.isArray(id)){
      id.forEach(id => this.add(id));
      return this;
    }
    this.ids = getUniqueValues([...this.ids, id]);
    return this;
  }
  /**
   * @param {string} id 
   * @returns {Selections} - this
  */
  remove(id) {
    if(Array.isArray(id)){
      id.forEach(id => this.remove(id));
      return this;
    }
    this.ids = this.ids.filter(idEl => idEl != id);
    return this;
  }
  /**
   * @param {string} id 
   * @returns {Selections} - this
  */
  toggle(id) {
    return this.contains(id) ? this.remove(id) : this.add(id);
  }
  
  /**
   * @param {string} id 
   * @returns {Selections} - this
  */
  set(id) {
    if(Array.isArray(id)){
      this.ids = [...id];
    }else if(!id){
      this.ids = [];
    }else{
      this.ids = [id];
    }

    return this;
  }
  /**
   * @param {NodeObject[]} nodeList  
   * @returns {NodeObject} 
  */
  find(nodeList) {
    if (this.ids.length === 1 && nodeList) {
      return nodeList.find(node => node.id === this.ids[0])
    }
  }
  /**
   * @param {nodeList} nodeList  
   * @returns {NodeObject[]} 
  */
  findAll(nodeList) {
    return nodeList?.filter(node => this.contains(node.id)) ?? [];
  }

  /**
   * @param {string} id 
   * @returns {boolean}
   */
  contains(id) {
    return this.ids.includes(id);
  }

  /** Clears selections */
  clear(){
    this.ids = [];
    return this;
  }
  /**
   * @returns {Selections}
   */
  clone() {
    return new Selections(this.ids, this.stateFunc);
  }
}

export class Fields {
  static icons = {
    text: {
      icon: textIcon,
      iconAlt: "text"
    },
    checklist: {
      icon: checkIcon,
      alt: "check"
    },
    attachment: {
      icon: attachIcon,
      alt: "link"
    }
  }
  static get eachType() {
    return [
      {
        name: "Text",
        type: "text",
        icon: this.icons.text.icon,
        alt: this.icons.text.alt
      },
      {
        name: "Checklist",
        type: "checklist",
        icon: this.icons.checklist.icon,
        alt: this.icons.checklist.alt
      },
      {
        name: "Attachment",
        type: "attachment",
        icon: this.icons.attachment.icon,
        alt: this.icons.attachment.alt
      },

    ];
  }
}

export class Field {
  id;
  type;
  name;
  value;
}

export class Lines {
  static createLines(nodeSize,links,nodes) {
    return links.map(link => {
      const a = nodes.find(node => node.id === link.node_a_id);
      const b = nodes.find(node => node.id === link.node_b_id);
      if(!a || !b){
        console.error("Link is missing node");
        return new LineObject(100,100,200,100);
      }
      return new LineObject(a.x + nodeSize / 2, a.y + nodeSize / 2, b.x + nodeSize / 2, b.y + nodeSize / 2);
    })
  }
}

export class LineObject {
  startX;
  startY;
  endX;
  endX;
  constructor(startX, startY, endX, endY) {
    [this.startX, this.startY, this.endX, this.endY] = [startX, startY, endX, endY];
  }
}

export class Links {
  static createLinkObjectList(links,nodes){
    const getNodeById = (id) => nodes.find(n => n.id===id);
    return links.map(link => 
      new LinkObject(link.id,link.node_a_id,link.node_b_id,getNodeById(link.node_a_id).name,getNodeById(link.node_b_id).name)
    );
  }

  static findNodes(links,nodes){
    return nodes.filter(node => [links.node_a_id,links.node_b_id].includes(node.id));
  }

  static createLinkName(link,nodes){
    return `${nodes.find(node=>node.id===link.node_a_id).name} - ${nodes.find(node=>node.id===link.node_b_id).name}`;
  }
}

export class LinkObject {
  id;
  node_a_id;
  node_b_id;
  node_a_name;
  node_b_name;

  constructor(id,node_a_id,node_b_id,node_a_name,node_b_name){
      this.id=id;
      this.node_a_id=node_a_id;
      this.node_b_id=node_b_id;
      this.node_a_name=node_a_name;
      this.node_b_name=node_b_name;
  }
}