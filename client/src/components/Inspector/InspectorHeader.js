import './InspectorHeader.scss';
import EditableText from "../EditableText/EditableText";

/** 
 * @param {object} props
 * @param {object[]} props.selectedNodes
 */
function InspectorHeader({selectedNodes,onChange}) {
    return (
        <header className="inspector-header">
            <h1 className="inspector-header__title">{
                selectedNodes.length === 0
                    ? "Inspector"
                    : selectedNodes.length === 1 ?
                        <EditableText
                            type="line"
                            name="name"
                            value={selectedNodes[0].name}
                            onEndEdit={(value) => onChange({ name: "name", value }, "name")}
                            fieldStyle={{ fontSize: "1.5rem", lineHeight: "1", textAlign: "center", marginTop: "-0.3rem", marginBottom: "-0.4rem" }}
                            textStyle={{ fontSize: "1.5rem", lineHeight: "1" }}
                        />
                        : `${selectedNodes.length} Nodes`}
            </h1>
        </header>
    );
}
export default InspectorHeader;