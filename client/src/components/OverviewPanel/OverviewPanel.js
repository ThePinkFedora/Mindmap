import { useContext, useEffect, useState } from 'react';
import EditableText from '../EditableText/EditableText';
import './OverviewPanel.scss';
import { WorkspaceContext } from '../Workspace/Workspace';
import { getMap, updateMap } from '../../js/api';



function OverviewPanel() {
    const { workspace } = useContext(WorkspaceContext);
    const [map, setMap] = useState(null);

    useEffect(() => {
        getMap(workspace.id)
            .then(map => setMap(map))
    }, [workspace.id]);

    const handleChange = (value, field) => {
        const newMap = { ...map, [field]: value };
        updateMap(map.id, newMap.name, newMap.description)
            .then((map) => setMap(map));
    };

    return (
        <section className="overview-panel">
            {map &&
                <>
                    <div className="overview-panel__header">
                        <EditableText
                            type="line"
                            name="name"
                            value={map.name}
                            onEndEdit={(value) => handleChange(value, "name")}
                            fieldStyle={{ fontSize: "1.5rem", lineHeight: "1", textAlign: "center", marginTop: "-0.3rem", marginBottom: "-0.4rem" }}
                            textStyle={{ fontSize: "1.5rem", lineHeight: "1" }}
                        />
                    </div>
                    <div className="overview-panel__row">
                        <label htmlFor="description" className="overview-panel__label">Description</label>
                        <EditableText name="description" value={map.description} onEndEdit={(value) => handleChange(value, "description")} />
                    </div>
                </>
            }
        </section>
    );
}
export default OverviewPanel;