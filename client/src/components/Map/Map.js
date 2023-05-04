import { useContext } from 'react';
import './Map.scss';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { NodesContext, SelectionContext } from '../Workspace/Workspace';
import Node from '../Node/Node';
import { Selections } from '../../js/nodemaps';

/**
 * @param {object} props
 * @param {(selections:Selections)=>{}} props.onSelect
 * @returns 
 */
function Map({onSelect}) {
    const nodes = useContext(NodesContext);
    /** @type {Selections} */
    const selection = useContext(SelectionContext);

    /**
     * @param {import('react').MouseEvent} event 
     * @param {*} nodeId 
     */
    const handleNodeClick = (event,nodeId) => {
        event.stopPropagation();
        onSelect(selection.set(nodeId));
    };

    /**
     * @param {import('react').MouseEvent} event 
     */
    const handleBackgroundClick = (event) => {
        onSelect(selection.set(null));
    };

    /**
     * @param {import('react').MouseEvent} event 
     */
    const handleMouseMove = (event) => {
        if(event.buttons === 1){

        }
    };

    return (
        <section className="map">
            <TransformWrapper>
                <TransformComponent wrapperStyle={{ width: "100%", height: "100%", }}>
                    <div className="map__sheet" onClick={handleBackgroundClick} handleMouseMove={handleMouseMove}>
                        {nodes && nodes.map(node => (
                            <Node node={node} isSelected={selection.contains(node.id)} onClick={(event)=>handleNodeClick(event,node.id)}/>
                        ))}
                    </div>
                </TransformComponent>
            </TransformWrapper>
        </section >
    );
}
export default Map;