import '../../../css/header.css';
import {Link} from "react-router-dom";

function GuestNavigation() {
    return (
        <ul className="nav-links">
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/login">Login</Link>
            </li>
            <li>
                <Link to="/register">Register</Link>
            </li>
        </ul>
    );
}

export default GuestNavigation;
