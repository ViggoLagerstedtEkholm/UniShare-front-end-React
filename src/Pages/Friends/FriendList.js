import userImage from '../../images/ProfileDefault.png';
import {useContext, useEffect, useState} from "react";
import {UserContext} from "../Shared/Context/UserContext";
import {GetFriends, UnFriend} from "../Service/FriendService";
import {Loading} from "../Shared/State/Loading";
import {Link} from "react-router-dom";

export function FriendList({ID}) {
    const {user} = useContext(UserContext);
    const [friends, setFriends] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect( () => {
        GetFriends(ID).then(response => {
            setFriends(response);
            setIsLoaded(true);
        });
    }, [ID]);

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

        return friends.map(function (data, index) {
            const username = data['username'];
            const userID = data['userId'];

            let image = 'data:image/jpeg;base64,' + data['image'];
            if (!data['image']) {
                image = userImage;
            }

            return (
                <div key={index} className="friend-pending">
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
                            <Link className="button-style-4" to={"/profile/" + username}>Profile</Link>
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