function getUniqueValues(array){
  return Array.from(new Set(array));
}

export class Selections {
    /**@type {string[]} */
    ids=[];
  
    constructor(ids=[],stateFunc=null){
      this.ids=ids;
    }
    /**@returns {string|undefined} */
    get selectedNode(){
      return this.ids.length === 1 ? this.ids[0] : undefined;
    }
    /**@param {string|null|undefined} id */
    set selectedNode(id){
      this.set(id);
    }
    /**@returns {number} */
    get length(){
      return this.ids.length;
    }
    /**
     * @param {string} id 
     * @returns {Selections} - this
    */
    add(id){
      this.ids = getUniqueValues([...this.ids,id]);
      return this;
    }
    /**
     * @param {string} id 
     * @returns {Selections} - this
    */
    remove(id){
      this.ids = this.ids.filter(idEl => idEl!=id);
      return this;
    }
    /**
     * @param {string} id 
     * @returns {Selections} - this
    */
    toggle(id){
      return this.contains(id) ? this.remove(id) : this.add(id);
    }
    /**
     * @param {string} id 
     * @returns {Selections} - this
    */
    set(id){
      this.ids = id ? [id] : [];
      return this;
    }
    /**
     * @param {NodeObject[]} nodeList  
     * @returns {NodeObject} 
    */
    find(nodeList){
      if(this.ids.length===1 && nodeList){
        return nodeList.find(node => node.id===this.ids[0])
      }
    }
    /**
     * @param {nodeList} nodeList  
     * @returns {NodeObject[]} 
    */
    findAll(nodeList){
      return nodeList?.filter(node => this.contains(node.id)) ?? [];
    }
    
    /**
     * @param {string} id 
     * @returns {boolean}
     */
    contains(id){
      return this.ids.includes(id);
    }
    /**
     * @returns {Selections}
     */
    clone(){
      return new Selections(this.ids,this.stateFunc);
    }
  }