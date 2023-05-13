import './WorkspacePage.scss';
import { useParams } from 'react-router-dom';
import Workspace from '../../components/Workspace/Workspace';
import { useEffect, useState } from 'react';
import { getMap } from '../../js/api';

function WorkspacePage() {
    const { mapId: mapIdParam } = useParams();
    const [map, setMap] = useState(null);
    const [error, setError] = useState(null);

    const mapId = mapIdParam ?? 1;

    useEffect(() => {
        setMap(null);
        setError(null);
        setTimeout(() => {
            getMap(mapId)
                .then(map => setMap(map))
                .catch(error => setError("Failed to load mind map."));
        }, 1000);
    }, [mapId]);

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
            {map && <Workspace key={mapId} mapId={mapId} />}
        </main>
    );
}
export default WorkspacePage;