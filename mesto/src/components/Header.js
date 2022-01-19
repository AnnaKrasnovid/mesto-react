import LogoVector from '../image/LogoVector.svg';

function Header () {
    return (
        <header className="header">
            <img className="logo" src={LogoVector} alt="Логотип" />
        </header>
)}

export default Header;