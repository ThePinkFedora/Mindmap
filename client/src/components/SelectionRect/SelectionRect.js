import { useContext, useRef, useState } from 'react';
import './SelectionRect.scss';
import { Rect, Utils, VectorMath } from '../../js/math';
import { NodesContext, SelectionContext } from '../Workspace/Workspace';

function SelectionRect({ children, scale = 1 }) {
    const [drag, setDrag] = useState(null);
    const ref = useRef(null);
    const { nodes } = useContext(NodesContext);
    const { selection, setSelection } = useContext(SelectionContext);

    /**@param {import('react').MouseEvent} event*/
    const handleMouseDown = (event) => {
        if (event.shiftKey) {
            const { clientX, clientY } = event;
            const localPos = VectorMath.scale(Utils.clientToLocalPosition({ x: clientX, y: clientY }, ref.current), 1 / scale);
            setDrag({
                rect: new Rect({ ...localPos }),
                anchor: localPos
            });
            event.stopPropagation();
        }
    };

    /**@param {import('react').MouseEvent} event*/
    const handleMouseMove = (event) => {

        if (drag) {
            const { anchor } = drag;
            if (event.shiftKey && event.buttons === 1) {
                event.stopPropagation();
                const { clientX, clientY } = event;
                const localPos = VectorMath.scale(Utils.clientToLocalPosition({ x: clientX, y: clientY }, ref.current), 1 / scale);

                const minX = Math.min(localPos.x, anchor.x);
                const minY = Math.min(localPos.y, anchor.y);
                const maxX = Math.max(localPos.x, anchor.x);
                const maxY = Math.max(localPos.y, anchor.y);

                const rect = new Rect({ x: minX, y: minY, width: maxX - minX, height: maxY - minY });

                setDrag({
                    rect: rect,
                    anchor: anchor
                });

                const intersectingNodes = nodes
                    .filter(node => rect.contains(node));

                const intersectingNodeIDs = intersectingNodes.map(node => node.id);

                setSelection(selection.set(intersectingNodeIDs));
            } else {
                setDrag(null);
            }
        }
    };

    const rectStyle = drag ? { left: drag.rect.x + "px", top: drag.rect.y + "px", width: drag.rect.width + "px", height: drag.rect.height + "px" } : {};

    return (
        <div
            className="selection-rect"
            ref={ref}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onClick={(event) => { if (event.shiftKey) event.stopPropagation() }}
            tabIndex="0">
            <div className="selection-rect__rect" style={rectStyle}></div>
            {children}
        </div>
    );
}

export default SelectionRect;