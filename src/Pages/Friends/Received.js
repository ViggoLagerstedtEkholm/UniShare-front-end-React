import {RejectRequest} from "../Shared/Friends/FriendsFunctions";
import userImage from '../../images/user.png'

export function Received ({received, onUpdate}) {
    console.log(received);

    return received.map(function (data) {
        const username = data['userDisplayName'];
        const userID = data['sender'];

        let image = 'data:image/jpeg;base64,' + data['userImage'];
        if (data['userImage'] === "") {
            image = userImage;
        }

        const rejectRequest = () =>{
            RejectRequest(userID).then(() => onUpdate());
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
                        <form action={"/profile/" +userID}>
                            <button className="button-style-4" type="submit" id="addComment" value="PostBox comment">Profile</button>
                        </form>
                    </div>

                    <div className="column friend-columns">
                        <button className="button-style-2" type="submit" onClick={rejectRequest}>Decline</button>
                    </div>
                </div>
            </div>
        )
    });
}