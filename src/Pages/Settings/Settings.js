import {Account} from "./Account";
import {ActiveDegree} from "./ActiveDegree";
import {Privacy} from "./Privacy";
import {Password} from "./Password";

export function Settings() {
    return (
        <div className="container">
            <h2>Settings</h2>
            <hr/>
            <Account/>
            <ActiveDegree/>
            <Password/>
            <Privacy/>
        </div>
    );
}