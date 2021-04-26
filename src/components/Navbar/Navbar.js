
import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

import { toast } from "react-toastify";
import { AuthContext } from '../../context/AuthContext';
import './style.css'
export const Navbar = () => {
    const { userData, token, logout } = useContext(AuthContext);

    const handlerLogout = () => {
        logout()
        toast.success("Logout Success")
        // window.location.reload()
    }
    return (
        <React.Fragment>
            <nav className="navbar navbar-expand-lg fixed-top">
                <div className="container">
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item active">
                                <Link  to="/" className="nav-link"> <span className="cool-link">Home</span></Link>
                            </li>
                            {
                                userData && userData?.role === 2 ?
                                    <li className="nav-item">
                                        <Link  to="/profile" className="nav-link">  <span className="cool-link">Profile</span></Link>
                                    </li> : null

                            }
                            <li className="nav-item">
                                <Link  to="/feature" className="nav-link"> <span className="cool-link">Feature</span></Link>
                            </li>

                            <li className="nav-item">
                                <Link  to="/portfolio" className="nav-link"><span className="cool-link">About Us</span></Link>
                            </li>

                            <li className="nav-item">
                                <Link  to="/contacts" className="nav-link"><span className="cool-link">Contact</span></Link>
                            </li>
                            {
                                !token ? (
                                    <React.Fragment>
                                        <li className="nav-item">
                                            <Link  to="/register" className="nav-link">
                                                <span className="cool-link">
                                                    Register
                                                    </span>
                                            </Link>
                                        </li>

                                        <li className="nav-item">
                                            <Link  to="/login" className="nav-link">
                                                <span className="cool-link">
                                                    Login
                                                </span>
                                            </Link>
                                        </li>
                                    </React.Fragment>
                                ) : <li className="nav-item" onClick={handlerLogout}>
                                   <a  className="nav-link">
                                        <span className="cool-link">
                                            Logout
                                    </span>
                                    </a>
                                </li>
                            }
                        </ul>
                    </div>
                </div>
            </nav>

        </React.Fragment>
    )
}

export default Navbar;