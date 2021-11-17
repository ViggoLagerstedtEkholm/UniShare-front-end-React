import '../../../css/header.css';
import {Link} from "react-router-dom";
import {useContext} from "react";
import {UserContext} from "../Context/UserContext";

function UserNavigation() {
    const {user} = useContext(UserContext);

    const onLogout = () =>{
        localStorage.clear();
        window.location.reload();
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
                <Link to={'/profile/' + user['Username']}>Profiles</Link>
            </li>
            <li>
                <Link to={"/"} onClick={() => {
                    localStorage.clear();
                    window.location.reload();
                }}>Logout</Link>
            </li>
        </ul>
    );
}

export default UserNavigation;
