import './WorkspacePage.scss';
import { useParams } from 'react-router-dom';
import Workspace from '../../components/Workspace/Workspace';
import { useEffect, useState } from 'react';
import { getMap } from '../../js/api';

function WorkspacePage() {
    const { workspaceId: workspaceIdParam } = useParams();
    const [map, setMap] = useState(null);
    const [error, setError] = useState(null);

    const workspaceId = workspaceIdParam ?? 1;

    useEffect(() => {
        setMap(null);
        setError(null);
        setTimeout(() => {
            getMap(workspaceId)
                .then(map => setMap(map))
                .catch(error => setError("Failed to load mind map."));
        }, 1000);
    }, [workspaceId]);

    return (
        <main className="workspace-page">
            {
                !map &&
                <div className="workspace-page__loading">
                    {error ?
                        <h2 className="workspace-page__error">{error}</h2>
                        : <>
                            <div className="workspace-page__loading-spinner"></div>
                            <h2 className="workspace-page__loading-message">Loading...</h2>
                        </>
                    }
                </div>
            }
            {map && <Workspace key={workspaceId} workspaceId={workspaceId} />}
        </main>
    );
}
export default WorkspacePage;