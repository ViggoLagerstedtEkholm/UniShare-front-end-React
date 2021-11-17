import userImage from '../../images/ProfileDefault.png';
import {useEffect, useState} from "react";
import {Loading} from "../Shared/State/Loading";
import {AcceptReceivedRequest, GetPendingReceived} from "../Service/FriendService";
import {Link} from "react-router-dom";

export function Received() {
    const [pending, setPendingReceived] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect( () => {
        GetPendingReceived().then(response => {
            setPendingReceived(response);
            setIsLoaded(true);
        });
    }, []);

    function renderReceived() {
        if(pending.length === 0){
            return (
                <h4>
                    No received requests!
                </h4>
            );
        }

        return pending.map(function (data) {
            const username = data['username'];
            const userID = data['userId'];

            let image = 'data:image/jpeg;base64,' + data['image'];
            if (!data['image']) {
                image = userImage;
            }

            return (
                <div className="friend-pending">
                    <div className="row">
                        <div className="content-card-image">
                            <img src={image} alt="User"/>
                        </div>
                        <div className="column friend-columns">
                            <p>Username: {username}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="column friend-columns">
                            <Link className="button-style-4" to={"/profile/" + username}>Profiles</Link>
                        </div>

                        <div className="column friend-columns">
                            <button className="button-style-2" type="submit" onClick={() =>{}}>Decline</button>
                        </div>
                        <div className="column friend-columns">
                            <button className="button-style-3" type="submit" onClick={() => {
                                AcceptReceivedRequest(userID).then(() => window.location.reload());
                            }}>Accept</button>
                        </div>
                    </div>
                </div>
            )
        });
    }

    return (
        <div>
            {isLoaded ?
                <div>
                    {renderReceived()}
                </div> : <Loading/>
            }
        </div>
    );
}