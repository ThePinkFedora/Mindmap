import './Node.scss';

const nodeSize = 48;

/**
 * @param {object} props
 * @param {boolean} props.isSelected
 * @param {(event:import('react').MouseEvent)=>{}} props.onClick
 * @param {(event:import('react').MouseEvent,nodeId)=>{}} props.onGrab
 * @param {boolean} isPreview
 */
function Node({ node, isSelected, onGrab, onRelease, isPreview = false }) {
    const style = {
        left: (node.x - nodeSize / 2) + "px",
        top: (node.y - nodeSize / 2) + "px",
    };

    return (
        <div id={`node_${node.id}`}
            className={`node ${isSelected ? "node--selected" : ""} ${isPreview ? "node--preview" : ""}`}
            style={style}
            onClick={(event) => { event.stopPropagation() }}
            onMouseDown={(event) => { if (event.buttons === 1) { onGrab?.(event, node.id) } }}
            onMouseUp={(event) => { if (event.button === 0) { onRelease?.(event, node.id) } }}
        >
            <div className={`node__inner ${isSelected ? "node__inner--selected" : ""}`}></div>
            <p className="node__label">{node.name}</p>
        </div>
    );
}
export default Node;