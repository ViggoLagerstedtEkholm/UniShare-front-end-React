import {AcceptRequest, GetFriends, GetPendingReceived, RejectRequest} from "../Shared/Friends/FriendsFunctions";
import userImage from '../../images/user.png'
import {useEffect, useState} from "react";

export function Received({doUpdate}) {
    const [pending, setPendingReceived] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(async () => {
        await GetPendingReceived().then(response => {
            setPendingReceived(response.data);
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
            const username = data['userDisplayName'];
            const userID = data['sender'];

            let image = 'data:image/jpeg;base64,' + data['userImage'];
            if (data['userImage'] === "") {
                image = userImage;
            }

            const rejectRequest = () => {
                RejectRequest(userID).then(() => window.location.reload());
            }

            const acceptRequest = () => {
                AcceptRequest(userID).then(() => window.location.reload());
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
                            <form action={"/profile/" + userID}>
                                <button className="button-style-4" type="submit" id="addComment"
                                        value="PostBox comment">Profile
                                </button>
                            </form>
                        </div>

                        <div className="column friend-columns">
                            <button className="button-style-2" type="submit" onClick={rejectRequest}>Decline</button>
                        </div>
                        <div className="column friend-columns">
                            <button className="button-style-3" type="submit" onClick={acceptRequest}>Accept</button>
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
                </div> : <h4>Loading received requests...</h4>
            }
        </div>
    );
}