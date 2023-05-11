import { useCallback, useContext, useEffect } from "react";
import { LinksContext, SelectionContext, WorkspaceContext } from "./Workspace";

function Hotkeys({ children, onAdd, onDelete, onLink, onUnlink }) {
    const { workspace } = useContext(WorkspaceContext);
    const links = useContext(LinksContext);
    const {selection} = useContext(SelectionContext);

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
            case "x": 
            case "Delete": 
                onDelete(); 
                break;
            
            case "n":
                onAdd(workspace.cursorX, workspace.cursorY);
                break;
            case "l":
                if (selection.length === 2) {
                    onLink(selection.ids[0], selection.ids[1]);
                }
                break;
            case "u":
                if (selection.length === 2) {
                    const link = links.find(link => selection.contains(link.node_a_id) && selection.contains(link.node_b_id));
                    onUnlink(link.id);
                }
                break;
            default:
                break;

        }
    },[links,onAdd,onDelete,onLink,onUnlink,selection,workspace]);



    useEffect(() => {
        document.addEventListener('keydown', handleUserKeyPress);

        return () => document.removeEventListener('keydown', handleUserKeyPress);
    }, [handleUserKeyPress]);

    return (
        <>
            {children}
        </>
    );
}
export default Hotkeys;