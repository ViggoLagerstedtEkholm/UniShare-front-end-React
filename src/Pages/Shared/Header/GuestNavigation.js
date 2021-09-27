import '../../../css/header.css';

function GuestNavigation() {
    return (
        <ul className="nav-links">
            <li><a href="/">Home</a></li>
            <li><a href="/login">Login</a></li>
            <li><a href="/register">Register</a></li>
        </ul>
    );
}

export default GuestNavigation;
