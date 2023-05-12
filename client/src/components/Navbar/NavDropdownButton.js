import './NavDropdownButton.scss';
import { useState } from 'react';
import arrowIcon from '../../assets/images/arrow-down.svg';

function NavDropdown({ name, isOpen, onToggle }) {
    // const [isOpen, setIsOpen] = useState(false);

    const handleClick = (event) => {
        // setIsOpen(!isOpen);
        onToggle(name, !isOpen);
    };
    return (
        <button className={`nav-dropdown-button ${isOpen ? "nav-dropdown-button--open" : ""}`} onClick={handleClick}>{name} <img className="nav-dropdown-button__arrow-icon" src={arrowIcon} alt="dropdown" /> </button>
    );
}
export default NavDropdown;