import {FriendList} from "./FriendList";
import {Sent} from "./Sent";
import {useContext} from "react";
import {UserContext} from "../Shared/Context/UserContext";
import {Received} from "./Received";
import NotFound from "../Shared/Error/NotFound";

export function Friend() {
    const {user} = useContext(UserContext);

    return (
         <div className="container">
             {user ?
                <div className="row">
                    <div className="column friend-columns">
                        <h1>Received</h1>
                        <hr/>

                        <Received/>

                    </div>
                    <div className="column friend-columns">
                        <h1>Friends</h1>
                        <hr/>

                        <FriendList ID={user.Username}/>

                    </div>
                    <div className="column friend-columns">
                        <h1>Sent</h1>
                        <hr/>

                        <Sent/>

                    </div>
                </div>
                 : <NotFound/>}
            </div>


    );
}