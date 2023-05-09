import { useContext, useEffect, useState } from 'react';
import './Map.scss';
import { TransformWrapper, TransformComponent, useTransformContext, useTransformEffect } from "react-zoom-pan-pinch";
import { LinksContext, NodesContext, SelectionContext, WorkspaceContext } from '../Workspace/Workspace';
import Node from '../Node/Node';
import { Selections, Lines, LineObject } from '../../js/nodemaps';
import { useRef } from 'react';
import Line from '../Line/Line';


const nodeSize = 48;

/**
 * @param {object} props
 * @param {(selections:Selections)=>{}} props.onSelect
 * @returns 
 */
function Map({ onSelect, onUpdate, onAdd, onDelete, onLink, onUnlink }) {
    const nodes = useContext(NodesContext);
    const links = useContext(LinksContext);
    /** @type {Selections} */
    const selection = useContext(SelectionContext);
    const { workspace, setWorkspace } = useContext(WorkspaceContext);
    const [draggingID, setDraggingID] = useState(null);
    const transformWrapperRef = useRef(null);

    //Focus effect
    useEffect(() => {
        if (workspace.focus) {
            const node = nodes.find(node => node.id === workspace.focus);
            const rect = transformWrapperRef.current.instance.wrapperComponent.getBoundingClientRect();

            transformWrapperRef.current.setTransform(-node.x + rect.width / 2, -node.y + rect.height / 2, 1, 300, "easeOut");
        }
    }, [workspace.focus]);

    /**
     * @param {import('react').MouseEvent} event 
     * @param {string} nodeId - The id of the node
     */
    const handleNodeGrab = (event, nodeId) => {
        event.stopPropagation();
        onSelect(event.ctrlKey ? selection.toggle(nodeId) : selection.set(nodeId));
        setDraggingID(nodeId);
    }

    /**
     * @param {import('react').MouseEvent} event 
     * @param {{x: number, y:number}} position - The position of the cursor relative to the sheet
     */
    const handleMouseMove = (event,position) => {
        setWorkspace({ ...workspace, cursorX: position.x, cursorY: position.y });
        if (event.buttons === 1) {
            if (draggingID) {
                event.stopPropagation();
                
                const node = nodes.find(node => node.id === draggingID);
                node.x = position.x;
                node.y = position.y;
                onUpdate(node);
            }
        } else if (draggingID) {
            setDraggingID(null);
        }
    };

    const lines = (links !== null && nodes != null) ? Lines.createLines(nodeSize, links, nodes) : [];

    return (
        <section className="map"  >
            <TransformWrapper ref={transformWrapperRef} panning={{ disabled: draggingID !== null }} minScale={0.25}>
                <TransformComponent wrapperStyle={{ width: "100%", height: "100%", }}  >
                    <Sheet 
                        selection={selection} 
                        onSelect={onSelect} 
                        workspace={workspace} 
                        setWorkspace={setWorkspace}
                        onMouseMove={handleMouseMove}
                    >
                        {lines.map((line, index) => <Line key={index} start={{ x: line.startX, y: line.startY }} end={{ x: line.endX, y: line.endY }} />)}
                        {nodes && nodes.map(node => (
                            <Node
                                key={node.id}
                                node={node}
                                isSelected={selection.contains(node.id)}
                                onGrab={handleNodeGrab}
                            />
                        ))}
                    </Sheet>
                </TransformComponent>
            </TransformWrapper>
        </section >
    );
}

/**
 * @param {object} props
 * 
 */
function Sheet({ children, selection, onSelect, workspace, setWorkspace,onMouseMove }) {
    const sheetRef = useRef(null);
    const transformStateRef = useRef({ previousScale: 1, scale: 1, positionX: 0, positionY: 0 });
    

    useTransformEffect(({ state, instance }) => {
        // console.log(state); // { previousScale: 1, scale: 1, positionX: 0, positionY: 0 }

        transformStateRef.current = state;
        return () => {
            // unmount
        };
    });

    /**
     * @param {import('react').MouseEvent} event 
     */
    const handleBackgroundClick = (event) => {
        //If there's any selection, clear it
        if(selection.length){
            onSelect(selection.set(null));
        }
        //If there's a focus, clear it
        if (workspace.focus) {
            setWorkspace({ ...workspace, focus: null });
        }
    };

    const handleMouseMove = (event) => {
        const rect = sheetRef.current.getBoundingClientRect();
        const scale = transformStateRef.current.scale;

        const position = {
            x: (event.clientX - rect.x - nodeSize / 2) / scale,
            y: (event.clientY - rect.y - nodeSize / 2) / scale
        };
        onMouseMove(event,position);
    };

    return (
        <div
            ref={sheetRef}
            className="map__sheet"
            onClick={handleBackgroundClick}
            onMouseMove={handleMouseMove}
        >
            {children}
        </div>
    );
}


export default Map;