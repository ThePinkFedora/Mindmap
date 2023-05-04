import './Node.scss';

function Node({node,isSelected,onClick}){
    const style = {
        left: node.x + "px",
        top: node.y + "px",
    };

    return (
        <div className={`node ${isSelected ? "node--selected" : ""}`} style={style} onClick={onClick}>
            <div className={`node__inner ${isSelected ? "node__inner--selected" : ""}`}></div>
            <p className="node__label">{node.name}</p>
        </div>
    );
}
export default Node;