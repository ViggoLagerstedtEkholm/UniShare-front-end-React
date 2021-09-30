import {useContext} from "react";
import {ProfileContext} from "../../Shared/Context/ProfileContext";
import {UserContext} from "../../Shared/Context/UserContext";
import FileUpload from "../../Shared/Files/FileUpload";
import userImage from '../../../images/user.png';
import {FriendList} from "../../Friends/FriendList";

export const HUD = (attributes) => {
    const {profileID} = useContext(ProfileContext);
    const {user} = useContext(UserContext);

    console.log(attributes);
    const dataArray = attributes['attributes']['data']['data'];

    let image = 'data:image/jpeg;base64,' + dataArray['image'];
    if (dataArray['image'] === "") {
        image = userImage;
    }
    const firstname = dataArray['firstname'];
    const username = dataArray['username'];
    const lastname = dataArray['lastname'];
    const privilege = dataArray['privilege'];
    const description = dataArray['description'];
    const joined = dataArray['joined'];
    const lastOnline = dataArray['lastOnline'];
    const visits = dataArray['visits'];

    let canSeeProfileEdits = false;
    if(user !== null){
        const currentLoggedIn = user['userID'];
        if (currentLoggedIn === profileID) {
            canSeeProfileEdits = true;
        }
    }

    return (
        <div>
            <div className="user-image">
                <img src={image} alt="User"/>
            </div>


            {canSeeProfileEdits ?
                <div>
                    <hr/>

                    <FileUpload URL={"/profile/upload/image"}/>

                    <hr/>

                    <form action="/Settings">
                        <button type="submit" className="button-style-4">Settings</button>
                    </form>
                </div>
                :
                null
            }

            <hr/>

            <div>
                <h3>
                    Display name
                </h3>
            </div>

            <p>
                {username}
            </p>

            <div>
                <h3>
                    First name
                </h3>
            </div>

            <p>
                {firstname}
            </p>

            <div>
                <h3>
                    Last name
                </h3>
            </div>

            <p>
                {lastname}
            </p>

            <div>
                <h3>
                    Last seen
                </h3>
            </div>

            <p>
                {lastOnline}
            </p>

            <div>
                <h3>
                    Joined
                </h3>
            </div>

            <p>
                {joined}
            </p>

            <div>
                <h3>
                    Visits
                </h3>
            </div>

            <p>
                {visits}
            </p>

            <div>
                <h3>
                    Account status
                </h3>
            </div>

            <p>
                {privilege}
            </p>

            <hr/>

            <div>
                <h3>
                    Description
                </h3>
            </div>

            <div className="user-description">
                {description}
            </div>
        </div>
    );
}