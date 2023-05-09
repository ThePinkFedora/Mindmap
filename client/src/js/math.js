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
}