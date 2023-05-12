import { Link } from 'react-router-dom';
import './NavMaps.scss';

//TEMP
const maps = [
    {
        id: 1,
        name: "CSS",
        description: "CSS"
    }
];

function Navmaps({ setActiveMenu, close }) {



    return (
        <section className="nav-maps">
            <div className="nav-maps__row">
                <h3 className="nav-maps__row-heading">Current Mindmap</h3>
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
        </section>
    );
}
export default Navmaps;