import React from "react";
//import Typed from "react-typed";
import { Link } from "react-scroll";
import Typed from "react-typed";
////import "./Header.css";
const Header = () => {
    return (
        <div className="containerBody">
            <div id="home" className="header-wraper" >

            </div>

            <div className="containerAnimated">
                    <div className="containerChildAnimated">
                        <h1 className="navbar-title"> Nailed it !</h1>
                        <Typed
                            className="typed-text"
                            strings={["Life isn't perfect, but your nails can be "]}
                            typeSpeed={300}
                            backSpeed={300}
                            cursorChar="!"
                            loop
                        />
                    </div>
                </div>
        </div>
    )
}

export default Header;