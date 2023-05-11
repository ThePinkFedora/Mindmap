import './Navbar.scss';
import logo from '../../assets/logos/MM_logo_white_shadow.png';
function Navbar(){
    return (
        <header className="navbar">
            <img className="navbar__logo" src={logo} alt="logo"/><h1 className="navbar__title">Mindmap</h1>
        </header>
    );
}
export default Navbar;