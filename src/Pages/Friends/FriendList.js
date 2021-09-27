import {FriendRemove} from "../Shared/Friends/FriendsFunctions";
import userImage from '../../images/user.png'

export function FriendList ({friends, onUpdate}) {
    console.log(friends);
    return friends.map(function (data) {
        const username = data['userDisplayName'];
        const userID = data['usersID'];

        let image = 'data:image/jpeg;base64,' + data['userImage'];
        if (data['userImage'] === "" || data['userImage'] === null) {
            image = userImage;
        }

        const onUnfriend = () =>{
            FriendRemove(userID).then(() => onUpdate());
        }

        return (
            <div>
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
                            <button className="button-style-4" type="submit" onClick={onUnfriend}>Unfriend</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    });
}