import './Node.scss';

/**
 * @param {object} props
 * @param {boolean} props.isSelected
 * @param {(event:import('react').MouseEvent)=>{}} props.onClick
 * @param {(event:import('react').MouseEvent,nodeId)=>{}} props.onGrab
 */
function Node({ node, isSelected, onClick, onGrab }) {
    const style = {
        left: node.x + "px",
        top: node.y + "px",
    };

    return (
        // <Draggable onStart={e=>e.stopPropagation()} onDrag={onDrag}>
            <div
                className={`node ${isSelected ? "node--selected" : ""}`}
                style={style}
                onClick={onClick}
                onMouseDown={(event) => { if (event.buttons === 1)onGrab(event, node.id) }}
                >
                <div className={`node__inner ${isSelected ? "node__inner--selected" : ""}`}></div>
                <p className="node__label">{node.name}</p>
            </div>
        // </Draggable>
    );
}
export default Node;