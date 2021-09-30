import '../../../css/header.css';
import React, {useContext, useEffect} from "react";
import Navigation from "./Navigation";
import {Link} from "react-router-dom";
import {UserContext} from "../Context/UserContext";

function Header() {
    const {user} = useContext(UserContext);

    return (
        <>
            <nav>
                <Navigation/>
                <Link className="logo" to="/"><b>UniShare</b></Link>
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
                    <li>
                        <Link to="/request">Request course</Link>
                    </li>
                    <li>
                        <Link to="/forum/add/new">Add forum</Link>
                    </li>
                </ul>
            </div>

            {user !== null ? <>
                {
                    user['privilege'] === "Admin" ?
                        <div id="adminHeader">
                            <Link  className="admin-text" to="/admin"><b>Administer website content</b></Link>
                        </div> : null
                }
            </>: null
            }

        </>
    );
}

export default Header;
