import {useContext} from "react";
import {ProfileContext} from "../../Shared/Context/ProfileContext";
import {UserContext} from "../../Shared/Context/UserContext";
import FileUpload from "../../Shared/Files/FileUpload";
import userImage from '../../../images/user.png';

import GitHubLogo from './../../../images/GitHub-Mark-Light-32px.png';
import LinkedIn from './../../../images/linkedin.svg';
import {Link} from "react-router-dom";

export const HUD = (attributes) => {
    const {profileID} = useContext(ProfileContext);
    const {user} = useContext(UserContext);

    console.log(attributes);
    const dataArray = attributes['attributes']['data'];

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
    const email = dataArray['email'];
    const linkedIn = dataArray['linkedin'];
    const github = dataArray['github'];

    let canSeeProfileEdits = false;
    if(user !== null){
        const currentLoggedIn = user['userID'];
        if (currentLoggedIn === profileID) {
            canSeeProfileEdits = true;
        }
    }

    const contactMe = () =>{
        window.open('mailto:' + email +'?subject=Hello I would like to contact you.&body=Write your message here.');
    }

    return (
        <div>
            <div className="user-image">
                <img src={image} alt="User"/>
            </div>


            <div className="profile-handles">
                {github ? <a href={github} target="popup"> <div className="profile-handles-icon">
                    <img src={GitHubLogo} alt="GITHUB" className="profile-handle-icon-github"/>
                </div></a>: null}

                {linkedIn ? <a href={linkedIn} target="popup"><div className="profile-handles-icon">
                    <img src={LinkedIn} alt="GITHUB" className="profile-handle-icon-linkedin"/>
                </div></a>: null}
            </div>


            <div>
                <h3>
                    Description
                </h3>

                {description}

                <button className="button-style-1" onClick={contactMe}>Contact me</button>
            </div>


            {canSeeProfileEdits ?

                <div>
                    <hr/>

                    <FileUpload URL={"/profile/upload/image"}/>
                    <hr/>

                    <Link to={"/Settings"} type="submit" className="button-style-4">Settings</Link>

                </div>
                :
                null
            }

            <hr/>

            <div>
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
                        Email
                    </h3>
                </div>

                <p>
                    {email}
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
            </div>

        </div>
    );
}