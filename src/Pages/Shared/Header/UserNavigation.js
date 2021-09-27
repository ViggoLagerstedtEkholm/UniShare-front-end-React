import '../../../css/header.css';
import {Link} from "react-router-dom";
import {logout} from "../../Service/AuthService";

function UserNavigation() {
    const onLogout = () =>{
        logout().then(() => {});
    }

    return (
        <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/friends">Friends</Link></li>
            <li><Link to={'/profile/' + JSON.parse(localStorage.getItem('USER'))['userID']}>Profile</Link></li>
            <li><a href="/" onClick={onLogout}>logout</a></li>
        </ul>
    );
}

export default UserNavigation;
