import '../../../css/header.css';
import React, {useEffect} from "react";
import Navigation from "./Navigation";
import {Link} from "react-router-dom";

function Header() {
    return (
        <div>
            <nav>
                <div className="logo">
                    <h4>UniShare</h4>
                </div>

                <Navigation/>

            </nav>

            <div id="header2">
                <ul className="nav-links">
                    <li>
                        <Link to="/search/people">People</Link>
                    </li>
                    <li>
                        <Link to="/search/courses">Courses</Link>
                    </li>
                    <li>
                        <Link to="/search/forums">Forums</Link>
                    </li>
                </ul>
            </div>
            <div id="adminHeader">
                <ul className="nav-links">
                    <li>
                        <a href='/UniShare/admin'>Administer website content</a>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Header;
