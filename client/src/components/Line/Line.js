import './Line.scss';

/**
 * @param {object} props
 * @param {{x:number,y:number}} props.start
 * @param {{x:number,y:number}} props.end
 */
function Line({start,end}) {

    const scaleFactor = 16;

    const sx = start.x/scaleFactor;
    const sy = start.y/scaleFactor;
    const ex = end.x/scaleFactor;
    const ey = end.y/scaleFactor;


    return (
        <svg className="line" width={1000*scaleFactor} height={1000*scaleFactor} viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
            <path d={`
                M ${[sx,sy]}
                L ${[ex,ey]}
    `} />
        </svg>
    );
}
export default Line;