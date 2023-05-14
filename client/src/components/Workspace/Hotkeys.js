import { useCallback, useContext, useEffect } from 'react';
import { LinksContext, SelectionContext } from './WorkspaceProviders';
import { WorkspaceContext } from './Workspace';

function Hotkeys({ children, onAdd, onDelete, onLink, onUnlink }) {
    const { workspace, dispatchWorkspace } = useContext(WorkspaceContext);
    const { links } = useContext(LinksContext);
    const { selection } = useContext(SelectionContext);

    /** @param {KeyboardEvent} event */
    const handleUserKeyPress = useCallback((event) => {
        //If this active element is any kind of input, just return
        if (document.activeElement && ['input', 'select', 'button', 'textarea'].indexOf(document.activeElement.tagName.toLowerCase()) !== -1) {
            return false;
        }

        switch (event.key) {
            //Delete
            case 'x':
            case 'Delete':
                onDelete();
                break;
            //New
            case 'n':
            case 'N':
                onAdd(workspace.cursorX, workspace.cursorY, event.shiftKey && selection.length === 1);
                break;
            //Link
            case 'l':
                if (selection.length === 2) {
                    onLink(selection.ids[0], selection.ids[1]);
                }
                break;
            //Unlink
            case 'u':
                if (selection.length === 2) {
                    const link = links.find(link => selection.contains(link.node_a_id) && selection.contains(link.node_b_id));
                    onUnlink(link.id);
                }
                break;
            //Center focus
            case ' ':
                if (selection.length) {
                    dispatchWorkspace({ type: 'set_focus', payload: { ids: selection.ids } });
                }
                break;
            //Panning
            case 'w': dispatchWorkspace({ type: 'pan', payload: { y: -1 } }); break;
            case 'a': dispatchWorkspace({ type: 'pan', payload: { x: -1 } }); break;
            case 's': dispatchWorkspace({ type: 'pan', payload: { y: 1 } }); break;
            case 'd': dispatchWorkspace({ type: 'pan', payload: { x: 1 } }); break;
            //Cancel
            case 'Escape': dispatchWorkspace({ type: 'clear_tool' }); break;
            default:
                console.log(`Key: `, event.key);
                break;
        }
    }, [links, onAdd, onDelete, onLink, onUnlink, selection, workspace.cursorX, workspace.cursorY, dispatchWorkspace]);

    const handleUserKeyRelease = useCallback((event) => {
        //If this active element is any kind of input, just return
        if (document.activeElement && ['input', 'select', 'button', 'textarea'].indexOf(document.activeElement.tagName.toLowerCase()) !== -1) {
            return false;
        }
        switch (event.key) {
            case 'w': dispatchWorkspace({ type: 'pan', payload: { y: 0 } }); break;
            case 'a': dispatchWorkspace({ type: 'pan', payload: { x: 0 } }); break;
            case 's': dispatchWorkspace({ type: 'pan', payload: { y: 0 } }); break;
            case 'd': dispatchWorkspace({ type: 'pan', payload: { x: 0 } }); break;
            default: break;
        }
    }, [dispatchWorkspace]);

    useEffect(() => {
        document.addEventListener('keydown', handleUserKeyPress);
        document.addEventListener('keyup', handleUserKeyRelease);
        return () => {
            document.removeEventListener('keydown', handleUserKeyPress);
            document.removeEventListener('keyup', handleUserKeyRelease);
        }
    }, [handleUserKeyPress, handleUserKeyRelease]);

    return (
        <>
            {children}
        </>
    );
}
export default Hotkeys;