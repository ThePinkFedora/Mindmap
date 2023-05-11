import { useContext, useEffect, useState } from 'react';
import './Map.scss';
import { TransformWrapper, TransformComponent, useTransformEffect } from "react-zoom-pan-pinch";
import { LinksContext, NodesContext, SelectionContext, WorkspaceContext } from '../Workspace/Workspace';
import Node from '../Node/Node';
import {  Lines } from '../../js/nodemaps';
import { useRef } from 'react';
import Line from '../Line/Line';
import { Vector2, VectorMath } from '../../js/math';
import SelectionRect from '../SelectionRect/SelectionRect';

/**
 * @param {object} props
 * @param {(selections:Selections)=>{}} props.onSelect
 * @returns 
 */
function Map({ onUpdate }) {
    const nodes = useContext(NodesContext);
    const links = useContext(LinksContext);
    /** @type {{selection:import('../../js/nodemaps').Selections}} */ 
    const {selection,setSelection} = useContext(SelectionContext);
    const { workspace, setWorkspace } = useContext(WorkspaceContext);
    const [draggingID, setDraggingID] = useState(null);
    const transformWrapperRef = useRef(null);
    const panningIntervalRef = useRef(null);

    //Focus effect
    useEffect(() => {
        if (workspace.focus) {
            const focusNodes =
                Array.isArray(workspace.focus)
                    ? nodes.filter(node => workspace.focus.includes(node.id))
                    : [nodes.find(node => node.id === workspace.focus)];


            const focusAverage = VectorMath.average(focusNodes);

            const rect = transformWrapperRef.current.instance.wrapperComponent.getBoundingClientRect();
            transformWrapperRef.current.setTransform(-focusAverage.x + rect.width / 2, -focusAverage.y + rect.height / 2, 1, 300, "easeOut");
        
        }
    }, [nodes,workspace.focus]);

    //Panning effect
    useEffect(() => {
        if (workspace.panningX || workspace.panningY) {
            function pan(){
                const wrapper = transformWrapperRef.current;
                const { positionX, positionY } = wrapper.instance.transformState;
                wrapper.setTransform(positionX + workspace.panningX * -50, positionY + workspace.panningY * -50, wrapper.instance.transformState.scale, 125, "linear");
            }
            panningIntervalRef.current = setInterval(pan, 100);
            pan();
        }

        return () => clearInterval(panningIntervalRef.current);
    }, [workspace.panningX, workspace.panningY]);

    /**
     * @param {import('react').MouseEvent} event 
     * @param {string} nodeId - The id of the node
     */
    const handleNodeGrab = (event, nodeId) => {
        event.stopPropagation();
        // setSelection(event.ctrlKey ? selection.toggle(nodeId) : selection.set(nodeId));
        setDraggingID(nodeId);
    }

    const handleNodeRelease = (event, nodeId) => {
        event.stopPropagation();
        setSelection(
            event.ctrlKey ?
                selection.toggle(nodeId) :
                event.shiftKey ?
                    selection.add(nodeId) :
                    selection.set(nodeId));
    }


    /**
     * @param {import('react').MouseEvent} event 
     * @param {{x: number, y:number}} position - The position of the cursor relative to the sheet
     */
    const handleMouseMove = (event, position) => {
        setWorkspace({ ...workspace, cursorX: position.x, cursorY: position.y });
        if (event.buttons === 1) {
            if (draggingID) {
                event.stopPropagation();

                const node = nodes.find(node => node.id === draggingID);
                const offset = new Vector2({ x: position.x - node.x, y: position.y - node.y });

                const moveNoves = selection.contains(node.id) ? selection.findAll(nodes) : [node];

                moveNoves.forEach(node => {
                    node.x += offset.x;
                    node.y += offset.y;
                    onUpdate(node);
                });
            }
        } else if (draggingID) {
            setDraggingID(null);
        }
    };

    const lines = (links !== null && nodes != null) ? Lines.createLines(links, nodes) : [];

    return (
        <section className="map"  >
            <TransformWrapper ref={transformWrapperRef} panning={{ disabled: draggingID !== null }} minScale={0.25} limitToBounds={false}>
                <TransformComponent wrapperStyle={{ width: "100%", height: "100%", }}  >
                    <Sheet
                        selection={selection}
                        onSelect={setSelection}
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
                                onRelease={handleNodeRelease}
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
 * @param {Selection} props.selection
 */
function Sheet({ children, selection, onSelect, workspace, setWorkspace, onMouseMove }) {
    const sheetRef = useRef(null);
    const transformStateRef = useRef({ previousScale: 1, scale: 1, positionX: 0, positionY: 0 });


    useTransformEffect(({ state, instance }) => {
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
        if (selection.length) {
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
            x: (event.clientX - rect.x) / scale,
            y: (event.clientY - rect.y) / scale
        };
        onMouseMove(event, position);
    };

    return (
        <div
            ref={sheetRef}
            className="map__sheet"
            onClick={handleBackgroundClick}
            onMouseMove={handleMouseMove}
        >
            <SelectionRect scale={transformStateRef.current.scale}>
                {children}
            </SelectionRect>
        </div>
    );
}


export default Map;