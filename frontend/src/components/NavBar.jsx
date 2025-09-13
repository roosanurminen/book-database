import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import './NavBar.css';
import { useState } from 'react';
import ConfirmModal from './ConfirmModal';
import { toast } from 'react-toastify';


const NavBar = ( {resetHomePage} ) => {
    const { setAuthState } = useAuth();
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const [hamburgerClose, setHamburgerClose] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const hamburgerClick = () => {
        setMenuOpen(!menuOpen);
        setHamburgerClose(!hamburgerClose);
    }

    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post('/logout')
            setAuthState({
                isAuthenticated: false,
                user: null
            });
            navigate('/login');
        } catch (error) {
            toast.error('Kirjautuminen ulos epäonnistui.', {autoClose: 3000});
        }
    };

    const goHome = () => {
        if (menuOpen) {
            setMenuOpen(false);
            setHamburgerClose(false);
        }

        if (window.location.pathname === '/') {
            resetHomePage && resetHomePage();
        } else {
            navigate('/');
        }
    }

    return (
        <nav className='nav'>
            <div className='nav-left'>
                <span className='go-home' onClick={goHome}>Kirjahyllysi</span>
            </div>
            
            <div className='desktop-nav-right'>
                <Link to='/add-new-book'>Uusi kirja</Link>
                <Link to='/add-missing-book'>Puuttuva kirja</Link>
                <Link to='/profile'>Profiili</Link>
                <button onClick={() => setShowConfirm(true)}>Kirjaudu ulos</button>

                <ConfirmModal
                            open={showConfirm}   
                            title='Kirjaudu ulos'
                            msg='Haluatko varmasti kirjautua ulos?'
                            onConfirm={handleLogout}
                            onCancel={() => setShowConfirm(false)}
                />
            </div>
            
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
                        <button onClick={() => setShowConfirm(true)}>Kirjaudu ulos</button>

                        <ConfirmModal
                            open={showConfirm}   
                            title='Kirjaudu ulos'
                            msg='Haluatko varmasti kirjautua ulos?'
                            onConfirm={handleLogout}
                            onCancel={() => setShowConfirm(false)}
                        />
                    </div>
                </div>
            )}
        </nav>
    )
};

export default NavBar;