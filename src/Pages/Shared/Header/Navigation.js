import UserNavigation from "./UserNavigation";
import GuestNavigation from "./GuestNavigation";

function Navigation() {
    if (localStorage.getItem('USER')) {
        return <UserNavigation/>;
    }
    return <GuestNavigation/>;
}

export default Navigation;