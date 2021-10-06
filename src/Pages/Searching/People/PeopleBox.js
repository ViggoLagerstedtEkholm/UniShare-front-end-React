import {useContext} from "react";
import {UserContext} from "../../Shared/Context/UserContext";
import {AcceptRequest, FriendRemove, FriendRequestSend, RejectRequest} from "../../Shared/Friends/FriendsFunctions";
import {enable, suspend} from "../../Service/Admin";
import {Link} from "react-router-dom";
import userImage from '../../../images/user.png';
import {getHighlightedText} from "../../Shared/HighLightText";
import {NoResults} from "../../Shared/Search/NoResults";

export const PeopleBox = ({results, doUpdate, filter}) => {
    const path = results['result'];
    const searchWord = filter['search'] ?? "";
    const {user} = useContext(UserContext);

    if (path.length === 0) {
        return (<NoResults/>)
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
                <div className="card-info">
                    <div className="content-card-image">
                        <img src={image} alt="USER IMAGE"/>
                    </div>

                    <div className="content-card-info responsive-text">
                        <h4><b>Personal information</b></h4>
                        <p><b>First name:</b> {getHighlightedText(firstname, searchWord)}</p>
                        <p><b>Last name:</b> {getHighlightedText(lastname, searchWord)}</p>
                        <p><b>Username: </b> {getHighlightedText(username, searchWord)}</p>
                    </div>

                    <div className="content-card-info responsive-text">
                        <h4><b>Personal information</b></h4>
                        <p><b>Visits:</b> {getHighlightedText(visits, searchWord)}</p>
                        <p><b>Last online:</b> {getHighlightedText(lastOnline, searchWord)}</p>
                        <p><b>Joined:</b> {getHighlightedText(joined, searchWord)}</p>
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
                                <br/>

                                {
                                    isAdmin ?
                                        <button className="button-style-2" onClick={onSuspendUser}>
                                            Suspend
                                            user</button>
                                    : <br/>
                                }
                                <br/>
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
