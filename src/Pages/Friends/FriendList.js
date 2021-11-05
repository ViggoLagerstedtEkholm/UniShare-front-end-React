import userImage from '../../images/ProfileDefault.png';
import {useContext, useEffect, useState} from "react";
import {UserContext} from "../Shared/Context/UserContext";
import {GetFriends, UnFriend} from "../Service/FriendService";
import {Loading} from "../Shared/State/Loading";

export function FriendList({ID}) {
    const {user} = useContext(UserContext);
    const [friends, setFriends] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(async () => {
        GetFriends(ID).then(response => {
            setFriends(response);
            setIsLoaded(true);
        });
    }, []);

    return (
        <div>
            {isLoaded ?
                <div>
                    {renderFriends()}
                </div> : <Loading/>
            }
        </div>
    );

    function renderFriends() {
        if (friends.length === 0) {
            return (
                <h4>No added friends!</h4>
            );
        }

        return friends.map(function (data) {
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
                            <form action={"/profile/" + username}>
                                <button className="button-style-4" type="submit" id="addComment"
                                        value="PostBox comment">Profile
                                </button>
                            </form>
                        </div>
                        {
                            user !== null ? <>
                                {
                                    ID === user.Id ?
                                        <div className="column friend-columns">
                                            <button className="button-style-2" type="submit" onClick={() => {
                                                UnFriend(userID).then(() => window.location.reload());
                                            }
                                            }>Unfriend
                                            </button>
                                        </div> : null
                                }
                            </> : null
                        }
                    </div>
                </div>
            )
        });
    }
}