import {FriendRemove, GetFriends} from "../Shared/Friends/FriendsFunctions";
import userImage from '../../images/user.png'
import {useContext, useEffect, useState} from "react";
import {UserContext} from "../Shared/Context/UserContext";

export function FriendList({ID}) {
    const {user} = useContext(UserContext);
    const [update, setUpdate] = useState(null);
    const [friends, setFriends] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(async () => {
        await GetFriends(ID).then(response => {
            console.log(response.data);
            setFriends(response.data);
            setIsLoaded(true);
        });
    }, [update]);

    function renderFriends() {
        if(friends.length === 0){
            return (
                <h4>No added friends!</h4>
            );
        }

        return friends.map(function (data) {
            const username = data['userDisplayName'];
            const userID = data['usersID'];
            console.log(userID);

            let image = 'data:image/jpeg;base64,' + data['userImage'];
            if (data['userImage'] === "" || data['userImage'] === null) {
                image = userImage;
            }

            const onUnfriend = () => {
                FriendRemove(userID).then(() => setUpdate(update + 1));
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

                        {
                            user !== null ? <>
                                {
                                    ID === user['userID'] ?
                                        <div className="column friend-columns">
                                            <button className="button-style-2" type="submit" onClick={onUnfriend}>Unfriend
                                            </button>
                                        </div> : null
                                }
                            </>: null
                        }

                    </div>
                </div>
            )
        });
    }

    return (
        <div>
            {isLoaded ?
                <div>
                    {renderFriends()}
                </div> : <h4>Loading friends...</h4>
            }
        </div>
    );
}