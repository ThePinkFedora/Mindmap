import { useContext, useEffect, useState } from 'react';
import './Map.scss';
import { TransformWrapper, TransformComponent, useTransformContext } from "react-zoom-pan-pinch";
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
    const pageRef = useRef(null);
    const mouseRef = useRef({ x: 0, y: 0 });
    const transformRef = useRef(null);

    //Focus effect
    useEffect(() => {
        if (workspace.focus) {
            const node = nodes.find(node => node.id === workspace.focus);
            const rect = pageRef.current.parentElement.parentElement.getBoundingClientRect();

            transformRef.current.setTransform(-node.x + rect.width / 2, -node.y + rect.height / 2, 1, 300, "easeOut");
        }
    }, [workspace.focus]);

    /**
     * @param {import('react').MouseEvent} event 
     * @param {*} nodeId 
     */
    const handleNodeGrab = (event, nodeId) => {
        event.stopPropagation();
        onSelect(event.ctrlKey ? selection.toggle(nodeId) : selection.set(nodeId));
        setDraggingID(nodeId);
    }

    /**
     * @param {import('react').MouseEvent} event 
     */
    const handleBackgroundClick = (event) => {
        onSelect(selection.set(null));
        if (workspace.focus) {
            setWorkspace({ ...workspace, focus: null });
        }
    };

    /**
     * @param {import('react').MouseEvent} event 
     */
    const handleMouseMove = (event) => {
        const rect = pageRef.current.getBoundingClientRect();
        mouseRef.current = { x: event.clientX - rect.x - nodeSize / 2, y: event.clientY - rect.y - nodeSize / 2 };
        setWorkspace({...workspace,cursorX: mouseRef.current.x,cursorY: mouseRef.current.y});
        if (event.buttons === 1) {
            if (draggingID) {
                event.stopPropagation();

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

    const lines = (links !== null && nodes != null) ? Lines.createLines(nodeSize, links, nodes) : [];

    return (
        <section className="map"  >
            <TransformWrapper ref={transformRef} panning={{ disabled: draggingID !== null }}>
                <TransformComponent wrapperStyle={{ width: "100%", height: "100%", }}  >
                    <div
                        className="map__sheet"
                        ref={pageRef} tabIndex="0"
                        onClick={handleBackgroundClick}
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
                    </div>
                </TransformComponent>
            </TransformWrapper>
        </section >
    );
}
export default Map;