import { useContext, useState } from 'react';
import './Map.scss';
import { TransformWrapper, TransformComponent, useTransformContext } from "react-zoom-pan-pinch";
import { LinksContext, NodesContext, SelectionContext } from '../Workspace/Workspace';
import Node from '../Node/Node';
import { Selections, Lines,LineObject } from '../../js/nodemaps';
import { useRef } from 'react';
import Line from '../Line/Line';

const nodeSize = 48;

/**
 * @param {object} props
 * @param {(selections:Selections)=>{}} props.onSelect
 * @returns 
 */
function Map({ onSelect, onUpdate,onAdd,onDelete,onLink,onUnlink }) {
    const nodes = useContext(NodesContext);
    const links = useContext(LinksContext);
    /** @type {Selections} */
    const selection = useContext(SelectionContext);
    const [draggingID, setDraggingID] = useState(null);
    const pageRef = useRef(null);
    const mouseRef = useRef({x:0,y:0});



    /**
     * @param {import('react').MouseEvent} event 
     * @param {*} nodeId 
     */
    const handleNodeClick = (event, nodeId) => {
        event.stopPropagation();
        onSelect(event.ctrlKey ? selection.toggle(nodeId): selection.set(nodeId));
        
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
        mouseRef.current = {x:event.clientX,y:event.clientY};
        if (event.buttons === 1) {
            if (draggingID) {
                // event.preventDefault();
                event.stopPropagation();
                // console.log(event);

                const node = nodes.find(node => node.id === draggingID);
                const { clientX, clientY } = event;

                const rect = pageRef.current.getBoundingClientRect();

                node.x = clientX - rect.x - nodeSize / 2;
                node.y = clientY - rect.y - nodeSize / 2;
                onUpdate(node);
            }
        } else if (draggingID) {
            setDraggingID(null);
        }
    };

    const handleNodeDrag = (event, nodeId) => {};

    /**
     * @param {KeyboardEvent} event 
     */
    const handleKeyDown = (event) => {
        // console.log("HandleKeyDown",event.key);
        switch(event.key){
            case "x": onDelete(); break;
            case "n": 
                const rect = pageRef.current.getBoundingClientRect();
                const x = mouseRef.current.x - rect.x - nodeSize / 2;
                const y = mouseRef.current.y - rect.y - nodeSize / 2;
                onAdd(x,y); 
                console.log("n");
                break;
            case "l": 
                if(selection.length===2){
                    const linkNodes = selection.findAll(nodes);
                    onLink(linkNodes[0],linkNodes[1]);
                }
                break;
            case "u": 
                if(selection.length===2){
                    const link = links.find(link => selection.contains(link.node_a_id) && selection.contains(link.node_b_id));
                    onUnlink(link.id);
                }
                break;
            
        }
    };

    const lines = (links !== null && nodes!=null) ? Lines.createLines(nodeSize,links,nodes) : [];



    return (
        <section className="map"  >
            <TransformWrapper panning={{ disabled: draggingID !== null }}>
                <TransformComponent wrapperStyle={{ width: "100%", height: "100%", }}  >
                    <div className="map__sheet" ref={pageRef} tabIndex="0" onClick={handleBackgroundClick} onMouseMove={handleMouseMove} onKeyDown={handleKeyDown}>
                        {lines.map((line,index) => <Line key={index} start={{ x: line.startX, y: line.startY }} end={{ x: line.endX, y: line.endY }} />)}
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