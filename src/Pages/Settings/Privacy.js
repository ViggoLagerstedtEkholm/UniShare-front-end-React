import axios from "axios";
import {API} from "../Shared/Constants";
import Collapsible from "react-collapsible";

export function Privacy() {

    async function onDelete(e) {
        e.preventDefault();
        if (window.confirm("Are you sure you want to delete your account?")) {
            axios.post(API + "/settings/delete/account", null, {withCredentials: true}).then(() => {
                window.location.reload();
            }).catch(error => {
                console.log(error);
            });
        }
    }

    return (
        <Collapsible trigger="Delete account">
            <h2>Privacy settings</h2>

            <form onSubmit={onDelete}>
                <button type="submit" className="button-style-2">Delete account</button>
            </form>
        </Collapsible>
    );
}