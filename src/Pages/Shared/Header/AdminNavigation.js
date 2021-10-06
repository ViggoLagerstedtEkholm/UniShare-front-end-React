import {Link} from "react-router-dom";
import {UserContext} from "../Context/UserContext";
import {useContext} from "react";

export const AdminNavigation = () => {
    const {user} = useContext(UserContext);

    return (
        <>
            {user !== null ? <div>
                {
                    user['privilege'] === "Admin" ?
                    <div id="adminHeader">
                        <Link className="admin-text" to="/admin"><b>Administer website content</b></Link>
                    </div> : null
                }
            </div> : null
            }
        </>
    );
}