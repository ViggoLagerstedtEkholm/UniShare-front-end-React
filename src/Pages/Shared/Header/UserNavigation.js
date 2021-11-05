import '../../../css/header.css';
import {Link} from "react-router-dom";
import {useContext} from "react";
import {UserContext} from "../Context/UserContext";

function UserNavigation() {
    const {user} = useContext(UserContext);

    const onLogout = () =>{
        localStorage.clear();
        window.location.refresh();
    }

    return (
        <ul className="nav-links">
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/friends">Friends</Link>
            </li>
            <li>
                <a href={'/profile/' + user['Username']}>Profile</a>
            </li>
            <li>
                <a href="/" onClick={onLogout}>Logout</a>
            </li>
        </ul>
    );
}

export default UserNavigation;
