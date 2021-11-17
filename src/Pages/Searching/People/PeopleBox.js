import {getHighlightedText} from "../../Shared/HighLightText";
import {NoResults} from "../../Shared/Search/NoResults";
import {Link} from "react-router-dom";
import {AcceptReceivedRequest, CancelSentRequest, SendRequest, UnFriend} from "../../Service/FriendService";
import {UserContext} from "../../Shared/Context/UserContext";
import {useContext} from "react";
import DefaultImage from "../../../images/ProfileDefault.png";

export const PeopleBox = ({results, doUpdate, filter}) => {
    const searchWord = filter['Search'] ?? "";
    const users = results['users'];
    const {user} = useContext(UserContext);

    if (users.length === 0) {
        return (<NoResults/>)
    }

    return users.map(function (data, index) {
        const firstname = data['firstname'];
        const lastname = data['lastname'];
        const username = data['username'];
        const visits = data['visits'];

        const dateJoined = new Date(data['joined']);
        const daysJoined = dateJoined.toDateString();
        const timeJoined = dateJoined.toTimeString();
        const joined = daysJoined + ", " + timeJoined;

        const lastSeenDate = new Date(data['lastSeenDate']);
        const daysSeen = lastSeenDate.toDateString();
        const timeSeen = lastSeenDate.toTimeString();
        const lastSeen = daysSeen + ", " + timeSeen;

        let image = data['image'];
        const usersID = data['id'];
        const isSent = data['isSent'];
        const isReceived = data['isReceived'];
        const isFriend = data['isFriend'];

        if (!image) {
            image = DefaultImage;
        } else {
            image = 'data:image/jpeg;base64,' + image;
        }

        return (
            <div key={index} id={usersID} className="content-card-body">
                <div className="card-info">
                    <div className="content-card-image">
                        <img src={image} alt="USER"/>
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
                        <p><b>Last online:</b> {getHighlightedText(lastSeen, searchWord)}</p>
                        <p><b>Joined:</b> {getHighlightedText(joined, searchWord)}</p>
                    </div>

                    <div className="content-card-info-buttons">
                        {user ? <div>
                            { isSent ? <button className="button-style-5" onClick={ () =>{
                                CancelSentRequest(usersID).then(() => doUpdate());
                            }}>Cancel request</button> : null }

                            { isReceived ? <button className="button-style-3" onClick={() =>{
                                AcceptReceivedRequest(usersID).then(doUpdate());
                            }}>Accept request</button> : null }

                            { isFriend ? <button className="button-style-2" onClick={() =>{
                                UnFriend(usersID).then(() => doUpdate());
                            }}>Unfriend</button> : null }

                            { !isSent && !isReceived && !isFriend && usersID !== user.Id ? <button className="button-style-1" onClick={() =>{
                                SendRequest(usersID).then(() => doUpdate());
                            }}>Send request</button> : null }
                        </div> : null}

                        <Link className="button-style-4" to={"/profile/" + username}>Profile</Link>
                    </div>
                </div>
            </div>
        )
    });
}
