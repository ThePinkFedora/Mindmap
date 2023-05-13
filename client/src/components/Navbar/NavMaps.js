import { Link, matchPath, useLocation } from 'react-router-dom';
import './NavMaps.scss';
import { useState, useEffect } from 'react';
import { getMaps } from '../../js/api';

function Navmaps({ setActiveMenu, close }) {
    const [maps, setMaps] = useState(null);

    useEffect(() => {
        getMaps().then(maps => {
            setMaps(maps);
        });
    }, []);

    const { pathname } = useLocation();
    const mapId = matchPath("/workspace/:mapId", pathname)?.params.mapId;
    const map = mapId && maps?.find(map => map.id === mapId);

    return (
        <section className="nav-maps">
            {maps &&
                <>
                    <div className="nav-maps__row">
                        <h3 className="nav-maps__row-heading">Current Mindmap</h3>
                        {map && <Link key={map.id} to={`/workspace/${map.id}`} className="nav-maps__map-link" onClick={close}>
                            <p className="nav-map-title">{map.name}</p>
                        </Link>}
                    </div>
                    <div className="nav-maps__row">
                        <h3 className="nav-maps__row-heading">Your Mindmaps</h3>
                        {maps.map(map => <Link key={map.id} to={`/workspace/${map.id}`} className="nav-maps__map-link" onClick={close}>
                            <p className="nav-map-title">{map.name}</p>
                        </Link>)
                        }
                    </div>
                    <div className="nav-maps__row">
                        <button className="nav-maps__create-button" onClick={() => setActiveMenu("Create-Map")}>Create</button>
                    </div>
                </>
            }
        </section>
    );
}
export default Navmaps;