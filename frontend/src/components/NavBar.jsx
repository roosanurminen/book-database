import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './NavBar.css';
import { useState } from 'react';


const NavBar = () => {
    const { setAuthState } = useAuth();
    const navigate = useNavigate();

    const [menuOpen, setMenuOpen] = useState(false);
    const [hamburgerClose, setHamburgerClose] = useState(false);


    const hamburgerClick = () => {
        setMenuOpen(!menuOpen);
        setHamburgerClose(!hamburgerClose);
    }

    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/logout', {}, {
                withCredentials: true,
            });
            console.log('handleLogout log', response);
            setAuthState({
                isAuthenticated: false,
                user: null
            });
            navigate('/login');
        } catch (error) {
            console.log('handleLogout err', error);
        }
    };

    const closeMenu = async (e) => {
        setMenuOpen(!menuOpen);
        setHamburgerClose(!hamburgerClose);
    }


    return (
        <nav className='nav'>
            <div className='nav-left'>
                <Link to='/'>Kirjahyllyni</Link>
            </div>
            
            <div className='desktop-nav-right'>
                <Link to='/add-new-book'>Uusi kirja</Link>
                <Link to='/add-missing-book'>Puuttuva kirja</Link>
                <Link to='/profile'>Profiili</Link>
                <button onClick={handleLogout}>Kirjaudu ulos</button>
            </div>
            
            {/*{!hamburgerClose && (
                <div className='hamburger-btn' onClick={hamburgerClick}>
                    <div className='burger' />
                    <div className='burger' />
                    <div className='burger' />
                </div>
            )}

            {hamburgerClose && (
                <button className='hamburger-btn' onClick={closeMenu}>X</button>
            )}*/}

            <div className={`hamburger-btn ${menuOpen ? 'open' : ''}`} onClick={hamburgerClick}>
                <div className='burger' />
                <div className='burger' />
                <div className='burger' />
            </div>



            {menuOpen && (
                <div className='mobile-menu'>
                    <div className='menu-links'>
                        <Link to='/add-new-book'>Uusi kirja</Link>
                        <Link to='/add-missing-book'>Puuttuva kirja</Link>
                        <Link to='/profile'>Profiili</Link>
                        <button onClick={handleLogout}>Kirjaudu ulos</button>
                    </div>
                </div>
            )}
        </nav>
    )
};

export default NavBar;