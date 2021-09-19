import '../../../css/header.css';

function GuestNavigation() {
    return (
        <div>
            <ul className="nav-links">
                <li><a href="/">Home</a></li>
                <li><a href="/login">Login</a></li>
                <li><a href="/register">Register</a></li>
            </ul>
        </div>
    );
}

export default GuestNavigation;
