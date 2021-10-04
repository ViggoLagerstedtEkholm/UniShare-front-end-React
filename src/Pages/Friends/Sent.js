import {GetPendingReceived, GetPendingSent, RejectRequest} from "../Shared/Friends/FriendsFunctions";
import userImage from '../../images/user.png'
import {useEffect, useState} from "react";

export function Sent () {
    const [update, setUpdate] = useState(null);
    const [sent, setSent] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(async () => {
        await GetPendingSent().then(response => {
            setSent(response.data);
            setIsLoaded(true);
        });
    }, [update]);

    function renderSent() {

        if(sent.length === 0){
            return (
              <h4>
                  No sent requests!
              </h4>
            );
        }

        return sent.map(function (data) {
            const username = data['userDisplayName'];
            const receiverID = data['receiver'];

            let image = 'data:image/jpeg;base64,' + data['userImage'];
            if (data['userImage'] === "") {
                image = userImage;
            }

            const onRemoveRequest = () => {
                RejectRequest(receiverID).then(() => setUpdate(update +1));
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
                            <form action={"/profile/" + receiverID}>
                                <button className="button-style-4" type="submit" id="addComment"
                                        value="PostBox comment">Profile
                                </button>
                            </form>
                        </div>

                        <div className="column friend-columns">
                            <button className="button-style-2" onClick={onRemoveRequest}>Remove</button>
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
                    {renderSent()}
                </div> : <h4>Loading sent requests...</h4>
            }
        </div>
    );
}