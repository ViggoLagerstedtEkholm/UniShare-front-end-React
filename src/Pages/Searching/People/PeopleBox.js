import {useContext} from "react";
import {UserContext} from "../../Shared/Context/UserContext";
import {AcceptRequest, FriendRemove, FriendRequestSend, RejectRequest} from "../../Shared/Friends/FriendsFunctions";
import {enable, suspend} from "../../Service/Admin";
import {Link} from "react-router-dom";
import userImage from '../../../images/user.png';

export const PeopleBox = ({results, doUpdate}) => {
    console.log(results);
    const {user} = useContext(UserContext);

    const path = results['users'];
    if (path.length === 0) {
        return (<div><h4 className="review">No people results!</h4></div>)
    }

    let canSeeLoggedInFeatures = true;
    if (user == null) {
        canSeeLoggedInFeatures = false;
    }

    let isAdmin = false;
    if (user != null) {
        if (user.privilege === 'Admin') {
            isAdmin = true;
        }
    }

    return path.map(function (data) {
        console.log(data);
        const firstname = data['userFirstName'];
        const lastname = data['userLastName'];
        const username = data['userDisplayName'];
        const visits = data['visits'];
        const joined = data['joined'];
        let image = data['userImage'];
        const usersID = data['usersID'];
        const lastOnline = data['lastOnline'];
        const isSuspended = data['isSuspended'];

        const currentUserID = user != null ? user['userID'] : null;
        const isFriend = user != null ? data['isFriend'] : null;
        const isSent = user != null ? data['isSent'] : null;
        const isReceived = user != null ? data['isReceived'] : null;
        console.log(data);

        if (image === "") {
            image = userImage;
        } else {
            image = 'data:image/jpeg;base64,' + image;
        }

        function onSuspendUser() {
            suspend(usersID).then(() => window.location.reload());
        }

        function onEnableUser() {
            enable(usersID).then(() => window.location.reload());
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
            <div id={usersID} className="content-card-body">
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
                        <p><b>Joined:</b> {joined}</p>
                    </div>

                    {
                        isSuspended === 1 ? <div className="content-card-info-buttons">
                                                <p className="warning"><b>Suspended</b></p>
                                                <button id={usersID} className="button-style-3" onClick={onEnableUser}>Enable user
                                                </button>
                                            </div>
                            :
                            <div className="content-card-info-buttons">

                                <Link to={'/profile/' + usersID} className="button-style-1" type="submit">Profile</Link>

                                {
                                    isAdmin ?
                                        <button className="button-style-2" onClick={onSuspendUser}>
                                            Suspend
                                        user</button> : null
                                }

                                {
                                    canSeeLoggedInFeatures ?
                                        <>
                                            {usersID == currentUserID ? null :
                                                <>
                                                    {
                                                        isFriend ? <button id={usersID} className="button-style-2"
                                                                           onClick={onFriendRemove}>Remove
                                                            friend</button> : null
                                                    }

                                                    {
                                                        isReceived && !isFriend ?
                                                            <button id={usersID} className="button-style-3"
                                                                    onClick={onAcceptRequest}>Accept
                                                                request</button> : null
                                                    }

                                                    {
                                                        isSent && !isFriend ?
                                                            <button id={usersID} className="button-style-5"
                                                                    onClick={onRejectRequest}>Remove
                                                                request</button> : null
                                                    }

                                                    {!isFriend && !isReceived && !isSent ?
                                                        <button className="button-style-4"
                                                                onClick={onFriendRequestSend}>
                                                            Send friend request
                                                        </button> : null
                                                    }

                                                </>
                                            }
                                        </> : null
                                }
                            </div>
                    }
                </div>
            </div>
        )
    });
}
