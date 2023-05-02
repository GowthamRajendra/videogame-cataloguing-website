import { Link, useNavigate } from 'react-router-dom';
import '../../styles/Navbar.css';
import { useState } from 'react';
import websiteLogo from '../../assets/logo/logo-no-background.svg';
import { useAuthContext } from '../hooks/useAuthContext';
import { useLogout } from '../hooks/useLogoutHook';

export default function Navbar() {
    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    const { logout } = useLogout();
    const { user } = useAuthContext();

    // uses log out hook to log out user when they click the logout button
    const handleLogout = () => {
        logout();
    }

    // redirect to search page with query
    function handleSearch(e) {
        e.preventDefault();

        navigate({ pathname: '/search', search: `?q=${search}` });
        clearInput();
    }

    function clearInput() {
        setSearch('');
    };

    return (
        <nav id='main-nav' className="navbar is-dark" role="navigation" aria-label="main navigation">
            <div id="navbar-buttons" className="navbar-menu">
                <div className="navbar-start">
                    <Link id='website-logo' to='/'>
                        <img src={websiteLogo} alt="RIGames" />
                    </Link>
                </div>

                <div>
                    <form id="search-bar" className="field has-addons" onSubmit={handleSearch}>
                        <div className="control">
                            <input className="input" type="text" placeholder="Search for games"
                                value={search}
                                onChange={(e) => {
                                    setSearch(e.target.value);
                                }}
                            />
                        </div>
                        <div className="control">
                            <button className="button is-info">
                                <span className='icon'>
                                    <i className="fa-solid fa-magnifying-glass"></i>
                                </span>
                            </button>
                        </div>
                    </form>
                </div>


                <div className="navbar-end">
                    <div className="navbar-item">
                        <div className="buttons">
                            {/* hide/ show buttons based on if logged in */}
                            {!user ?
                                <Link to="/signup" className="button is-info">
                                    Sign up
                                </Link>
                                : <Link to="/profile" className="button is-info">
                                    Profile
                                </Link>
                            }
                            {!user ?
                                <Link to="/login" className="button is-light">
                                    Log in
                                </Link>
                                : <a onClick={handleLogout} className="button is-danger">
                                    Log out
                                </a>
                            }


                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}