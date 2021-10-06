import UserNavigation from "./UserNavigation";
import GuestNavigation from "./GuestNavigation";
import {Link} from "react-router-dom";

function TopNavigation() {
    if (localStorage.getItem('USER')) {
        return (
            <div className="top-nav">
                <UserNavigation/>
                <Link className="logo" to="/"><b>UniShare</b></Link>
            </div>);
    }
    return (
        <div className="top-nav">
            <GuestNavigation/>
            <Link className="logo" to="/"><b>UniShare</b></Link>
        </div>);
}

export default TopNavigation;