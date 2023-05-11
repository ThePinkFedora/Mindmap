export class Vector2{
    x=0;
    y=0;
    constructor({x,y} = {x:0,y:0}){
        this.x=x;
        this.y=y;
    }
}

export class VectorMath{
    /**
     * @param {Vector2[]} vectors 
     */
    static average(vectors){
        const sum = vectors.reduce((acc,cur) => ({x:acc.x+cur.x,y:acc.y+cur.y}),{x:0,y:0});
        return new Vector2({x: sum.x/vectors.length,y:sum.y/vectors.length});
    }

    /**
     * @param {Vector2} v2 
     */
    static scale(v2,scale){
        return new Vector2({x:v2.x*scale,y:v2.y*scale});
    }
}


export class Rect{
    x=0;
    y=0;
    width=0;
    height=0;

    constructor({x=0,y=0,width=0,height=0}){
        this.x=x;
        this.y=y;
        this.width=width;
        this.height=height;
    }

    get min(){
        return {x:this.x,y:this.y};
    }
    set min({x,y}){
        [this.x,this.y] = [x,y];
    }

    get max(){
        return {x:this.x+this.width,y:this.y+this.height}
    }
    set max({x,y}){
        this.width = x-this.x;
        this.height = y-this.y;
    }

    /**
     * Returns true if the given vector is within the Rect area
     * @param {Vector2} v2 
     */
    contains(v2){
        return v2.x >= this.x && v2.y >= this.y && v2.x <= this.max.x && v2.y <= this.max.y;
    }
}


export class Utils{
    /**
     * @param {Vector2} clientPos
     * @param {HTMLElement} element
     */
    static clientToLocalPosition(clientPos,element){
        const elementRect = element.getBoundingClientRect();
        return new Vector2({x:clientPos.x-elementRect.x,y:clientPos.y-elementRect.y});
    }
}