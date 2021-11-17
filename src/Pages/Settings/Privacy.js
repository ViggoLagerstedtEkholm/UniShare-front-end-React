import Collapsible from "react-collapsible";
import {DeleteUser} from "../Service/AuthenticationService";
import {useContext} from "react";
import {UserContext} from "../Shared/Context/UserContext";
import {useNavigate} from "react-router-dom";

export function Privacy() {
    const {setUser} = useContext(UserContext);
    const navigate = useNavigate();

    async function onDelete(e) {
        e.preventDefault();
        if (window.confirm("Are you sure you want to delete your account?")) {
            DeleteUser().then(() =>{
                localStorage.clear();
                setUser(null);
                navigate('/');
            }).catch(() =>{
                alert('Something went wrong!');
            })
        }
    }

    return (
        <Collapsible trigger="Delete Account">
            <h2>Privacy settings</h2>

            <form onSubmit={onDelete}>
                <button type="submit" className="button-style-2">Delete account</button>
            </form>
        </Collapsible>
    );
}