import axios from "axios";
import querystring from "querystring";
import {useContext} from "react";
import {UserContext} from "../../Shared/Context/UserContext";
import {AcceptRequest, FriendRemove, FriendRequestSend, RejectRequest} from "../../Shared/Friends/FriendsFunctions";

export const PeopleBox = ({results, doUpdate}) => {
    console.log(results);
    const {user} = useContext(UserContext);

    const path = results['users'];
    if (path.length === 0) {
        return (<div><h4 className="review">No people results!</h4></div>)
    }

    return path.map(function (data) {
        const firstname = data['userFirstName'];
        const lastname = data['userLastName'];
        const username = data['userDisplayName'];
        const visits = data['visits'];
        let image = data['userImage'];
        const usersID = data['usersID'];
        const lastOnline = data['lastOnline'];
        const currentUserID = user['userID'];

        const isFriend = data['isFriend'];
        const isSent = data['isSent'];
        const isReceived = data['isReceived'];

        if (image === "") {
            image = "/images/user.png";
        } else {
            image = 'data:image/jpeg;base64,' + image;
        }

        function onFriendRemove() {
            FriendRemove(usersID).then(() => doUpdate());
        }

        function onAcceptRequest() {
            AcceptRequest(usersID).then(() => doUpdate());
        }

        function onFriendRequestSend() {
            FriendRequestSend(usersID).then(() => doUpdate());
        }

        function onRejectRequest() {
            RejectRequest(usersID).then(() => doUpdate());
        }

        return (
            <div className="content-card-body">
                <div className="content-user">
                    <div className="content-card-image">
                        <img src={image} alt="USER IMAGE"/>
                    </div>

                    <div className="content-card-info">
                        <h4><b>Personal information</b></h4>
                        <p><b>First name:</b> {firstname}</p>
                        <p><b>Last name:</b> {lastname}</p>
                        <p><b>Username: </b> {username}</p>
                    </div>

                    <div className="content-card-info">
                        <h4><b>Personal information</b></h4>
                        <p><b>Visits:</b> {visits}</p>
                        <p><b>Last online:</b> {lastOnline}</p>
                    </div>

                    <div className="content-card-info-buttons">
                        <form action={'/profile/' + usersID}>
                            <button className="button-style-1" type="submit">Profile</button>
                        </form>

                        {usersID == currentUserID ? null :
                            <div>
                                {
                                    isFriend ? <button id={usersID} className="button-style-2" onClick={onFriendRemove}>Remove friend</button> : null
                                }

                                {
                                    isReceived && !isFriend ? <button id={usersID} className="button-style-3" onClick={onAcceptRequest}>Accept request</button> : null
                                }

                                {
                                    isSent && !isFriend ? <button id={usersID} className="button-style-5" onClick={onRejectRequest}>Remove request</button> : null
                                }

                                {!isFriend && !isReceived && !isSent ?
                                    <button id={usersID} className="button-style-4" onClick={onFriendRequestSend}>
                                        Send friend request
                                    </button> : null
                                }

                            </div>
                        }
                    </div>
                </div>
            </div>
        )
    });
}
