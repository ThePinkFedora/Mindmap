import { useContext, useState } from 'react';
import './Map.scss';
import { TransformWrapper, TransformComponent,useTransformContext } from "react-zoom-pan-pinch";
import { NodesContext, SelectionContext } from '../Workspace/Workspace';
import Node from '../Node/Node';
import { Selections } from '../../js/nodemaps';
import { useRef } from 'react';

const nodeSize = 48;

/**
 * @param {object} props
 * @param {(selections:Selections)=>{}} props.onSelect
 * @returns 
 */
function Map({ onSelect, onUpdate }) {
    const nodes = useContext(NodesContext);
    /** @type {Selections} */
    const selection = useContext(SelectionContext);
    const [draggingID, setDraggingID] = useState(null);
    const pageRef = useRef(null);
    const transformWrapperRef = useRef(null);
    
    

    /**
     * @param {import('react').MouseEvent} event 
     * @param {*} nodeId 
     */
    const handleNodeClick = (event, nodeId) => {
        event.stopPropagation();
        onSelect(selection.set(nodeId));
    };

    /**
     * @param {import('react').MouseEvent} event 
     * @param {*} nodeId 
     */
    const handleNodeGrab = (event, nodeId) => {
        event.stopPropagation();
        setDraggingID(nodeId);
    }

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
        if (event.buttons === 1) {
            if (draggingID) {
                // event.preventDefault();
                event.stopPropagation();
                console.log(event);

                const node = nodes.find(node => node.id === draggingID);
                const { clientX, clientY } = event;

                const rect = pageRef.current.getBoundingClientRect();
                
                node.x = clientX - rect.x - nodeSize/2;
                node.y = clientY - rect.y - nodeSize/2;
                onUpdate(node);
            }
        } else if (draggingID) {
            setDraggingID(null);
        }
    };

    const handleNodeDrag = (event, nodeId) => {
        // event.stopPropagation();
        // console.log(event);

        // const node = nodes.find(node => node.id === nodeId);
        // const { clientX, clientY } = event;
        // const { offsetLeft, offsetTop } = pageRef.current;
        // const { clientLeft, clientTop } = pageRef.current;
        // const rect = pageRef.current.getBoundingClientRect();
        // console.log(rect);
        
        // console.log("NewPos: ", { x: clientX - rect.x, y: clientY -rect.y });
        // console.log("OldPos: ", { x: node.x, y: node.y });

        // node.x = clientX - rect.x;
        // node.y = clientY - rect.y;
        // onUpdate(node);
    };

    // console.log(transformWrapperRef.current);

    

    // console.log({ draggingID });

    return (
        <section className="map" >
            <TransformWrapper panning={{ disabled: draggingID !== null }}>
                <TransformComponent ref={transformWrapperRef} wrapperStyle={{ width: "100%", height: "100%", }}>
                    <div className="map__sheet" ref={pageRef} onClick={handleBackgroundClick} onMouseMove={handleMouseMove} >
                        {nodes && nodes.map(node => (
                            <Node
                                key={node.id}
                                node={node}
                                isSelected={selection.contains(node.id)}
                                onClick={(event) => handleNodeClick(event, node.id)}
                                onGrab={handleNodeGrab}
                                onDrag={(event) => handleNodeDrag(event, node.id)}
                            />
                        ))}
                    </div>
                </TransformComponent>
            </TransformWrapper>
        </section >
    );
}
export default Map;