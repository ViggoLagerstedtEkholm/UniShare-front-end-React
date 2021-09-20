import '../../../css/header.css';
import {Link} from "react-router-dom";

function UserNavigation() {
    return (
        <div>
            <ul className="nav-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/friends">Friends</Link></li>
                <li><Link to={'/profile/' + JSON.parse(localStorage.getItem('USER'))['userID']}>Profile</Link></li>
                <li><Link to="/logout">Logout</Link></li>
            </ul>
        </div>
    );
}

export default UserNavigation;
