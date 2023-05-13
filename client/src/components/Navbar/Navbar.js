import './Navbar.scss';
import logo from '../../assets/logos/MM_logo_white_shadow.png';
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import NavDropdown from './NavDropdownButton';
import NavMaps from './NavMaps';
import CreateMap from '../CreateMap/CreateMap';
import { getMaps } from '../../js/api';
function Navbar() {
    const [activeMenu, setActiveMenu] = useState(null);
    const [maps, setMaps] = useState(null);

    useEffect(() => {
        getMaps().then(maps => {
            setMaps(maps);
        });
    }, []);

    const handleMenuToggle = (name, state) => {
        if (state) {
            setActiveMenu(name);
        } else if (activeMenu === name) {
            setActiveMenu(null);
        }
    };

    return (
        <header className="navbar">
            <nav className="navbar__nav">
                <NavLink to="/" className="navbar__nav-item">
                    <img className="navbar__logo" src={logo} alt="logo" /><h1 className="navbar__title">Mindmap</h1>
                </NavLink>
                <NavDropdown name="Maps" isOpen={activeMenu === "Maps"} onToggle={handleMenuToggle} />

                {activeMenu === "Maps" &&
                    <div className="nav-menu">
                        <NavMaps maps={maps} setActiveMenu={setActiveMenu} close={() => handleMenuToggle("Maps", false)} />
                    </div>
                }
                {activeMenu === "Create-Map" &&
                    <div className="nav-menu">
                        <CreateMap close={() => handleMenuToggle("Create-Map", false)} />
                    </div>
                }

            </nav>
        </header>
    );
}



export default Navbar;