import { useCallback, useContext, useEffect } from "react";
import { LinksContext, SelectionContext, WorkspaceContext } from "./Workspace";

function Hotkeys({ children, onAdd, onDelete, onLink, onUnlink }) {
    const { workspace, setWorkspace } = useContext(WorkspaceContext);
    const links = useContext(LinksContext);
    const { selection } = useContext(SelectionContext);

    // const onAddCallback = useCallback(onAdd, []);
    // const onDeleteCallback = useCallback(onDelete, []);
    // const onLinkCallback = useCallback(onLink, []);
    // const onUnlinkCallback = useCallback(onUnlink, []);

    const handleUserKeyPress = useCallback((event) => {
        //If this active element is any kind of input, just return
        if (document.activeElement && ['input', 'select', 'button', 'textarea'].indexOf(document.activeElement.tagName.toLowerCase()) !== -1) {
            return false;
        }

        switch (event.key) {
            //Delete
            case "x":
            case "Delete":
                onDelete();
                break;
            //New
            case "n":
                onAdd(workspace.cursorX, workspace.cursorY);
                break;
            //Link
            case "l":
                if (selection.length === 2) {
                    onLink(selection.ids[0], selection.ids[1]);
                }
                break;
            //Unlink
            case "u":
                if (selection.length === 2) {
                    const link = links.find(link => selection.contains(link.node_a_id) && selection.contains(link.node_b_id));
                    onUnlink(link.id);
                }
                break;
            default:
                break;
            //Center focus
            case " ":
                if (selection.length) {
                    setWorkspace({ ...workspace, focus: selection.ids[0] });
                }
                break;
            case "w": setWorkspace({ ...workspace, panningY: -1 }); break;
            case "a": setWorkspace({ ...workspace, panningX: -1 }); break;
            case "s": setWorkspace({ ...workspace, panningY: 1 }); break;
            case "d": setWorkspace({ ...workspace, panningX: 1 }); break;
            case "Escape":
                if (workspace.tool) {
                    setWorkspace({ ...workspace, tool: null });
                }
                break;
        }
    }, [links, onAdd, onDelete, onLink, onUnlink, selection, workspace, setWorkspace]);

    const handleUserKeyRelease = useCallback((event) => {
        //If this active element is any kind of input, just return
        if (document.activeElement && ['input', 'select', 'button', 'textarea'].indexOf(document.activeElement.tagName.toLowerCase()) !== -1) {
            return false;
        }
        switch (event.key) {
            case "w": setWorkspace({ ...workspace, panningY: 0 }); break;
            case "a": setWorkspace({ ...workspace, panningX: 0 }); break;
            case "s": setWorkspace({ ...workspace, panningY: 0 }); break;
            case "d": setWorkspace({ ...workspace, panningX: 0 }); break;
            default: break;
        }
    }, [workspace, setWorkspace]);



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