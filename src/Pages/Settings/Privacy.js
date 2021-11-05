import Collapsible from "react-collapsible";
import {DeleteUser} from "../Service/AuthenticationService";
import { useHistory } from "react-router-dom";
import {useContext} from "react";
import {UserContext} from "../Shared/Context/UserContext";

export function Privacy() {
    let history = useHistory();

    const {setUser} = useContext(UserContext);

    async function onDelete(e) {
        e.preventDefault();
        if (window.confirm("Are you sure you want to delete your account?")) {
            DeleteUser().then(() =>{
                localStorage.clear();
                history.push("/");
                setUser(null);
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