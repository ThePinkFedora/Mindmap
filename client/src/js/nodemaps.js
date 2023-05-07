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
    this.ids = getUniqueValues([...this.ids, id]);
    return this;
  }
  /**
   * @param {string} id 
   * @returns {Selections} - this
  */
  remove(id) {
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
    this.ids = id ? [id] : [];
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
        type: "checllist",
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