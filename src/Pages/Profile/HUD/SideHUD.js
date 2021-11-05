import {useContext, useEffect, useState} from "react";
import {ProfileContext} from "../../Shared/Context/ProfileContext";
import {Loading} from "../../Shared/State/Loading";
import GitHubLogo from "../../../images/GitHub-Mark-Light-32px.png";
import LinkedIn from "../../../images/linkedin.svg";
import FileUpload from "../../Shared/Files/FileUpload";
import {Link} from "react-router-dom";
import {UserContext} from "../../Shared/Context/UserContext";
import {CanSeeEdits, FetchImage, FetchProfile} from "../../Service/UserService";
import DefaultImage from "../../../images/ProfileDefault.png";

function SideHUD() {
    const [HUDInfo, setHUDInfo] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    const [image, setImage] = useState(false);
    const [imageIsLoaded, setImageIsLoaded] = useState(false);
    const [lastSeen, setLastSeen] = useState();
    const [joined, setJoined] = useState();

    const {user} = useContext(UserContext);
    const {profileID} = useContext(ProfileContext);

    useEffect(async () => {
        FetchProfile(profileID).then(response => {
            setHUDInfo(response);
            setIsLoaded(true);

            const lastOnlineDateTime = new Date(response['lastOnline']).toDateString() + " , " + new Date(response['lastOnline']).toTimeString();
            const joinedDateTime = new Date(response['joined']).toDateString() + " , " + new Date(response['joined']).toTimeString();

            setLastSeen(lastOnlineDateTime);
            setJoined(joinedDateTime);
        });

        FetchImage(profileID).then(response => {
            if(response.data){
                setImage(`data:image/jpeg;base64,${response.data}`);
            }else{
                setImage(DefaultImage);
            }
            setImageIsLoaded(true);
        });
    }, [])

    const contactMe = () =>{
        window.open('mailto:' + HUDInfo['email'] +'?subject=Hello I would like to contact you.&body=Write your message here.');
    }

    return (
        <div className="profile-side-information">
            {isLoaded ?
                <div>
                    <div className="user-image">
                        {
                            imageIsLoaded ? <img src={image} alt="User"/> : <Loading/>
                        }
                    </div>

                    {
                        HUDInfo['gitHub'] || HUDInfo['linkedIn'] ?
                            <div className="profile-handles">
                                {HUDInfo['gitHub'] ? <a href={HUDInfo['gitHub']} target="popup">
                                    <div className="profile-handles-icon">
                                        <img src={GitHubLogo} alt="GITHUB" className="profile-handle-icon-github"/>
                                    </div>
                                </a> : null}

                                {HUDInfo['linkedIn'] ? <a href={HUDInfo['linkedIn']} target="popup">
                                    <div className="profile-handles-icon">
                                        <img src={LinkedIn} alt="GITHUB" className="profile-handle-icon-linkedin"/>
                                    </div>
                                </a> : null}
                            </div> : null

                    }

                    <div>
                        <h3>
                            Description
                        </h3>

                        {HUDInfo['description'] ? HUDInfo['description'] : <h3>Not set!</h3>}

                        <hr/>
                        <button className="button-style-1" onClick={contactMe}>Contact me</button>
                    </div>


                    {CanSeeEdits(profileID, user) ?

                        <div>
                            <hr/>

                            <FileUpload URL={"/api/Profile/image/upload"}/>

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
                            {HUDInfo['username']}
                        </p>

                        <div>
                            <h3>
                                Email
                            </h3>
                        </div>

                        <p>
                            {HUDInfo['email']}
                        </p>

                        <div>
                            <h3>
                                First name
                            </h3>
                        </div>

                        <p>
                            {HUDInfo['firstname']}
                        </p>

                        <div>
                            <h3>
                                Last name
                            </h3>
                        </div>

                        <p>
                            {HUDInfo['lastname']}
                        </p>

                        <div>
                            <h3>
                                Last seen
                            </h3>
                        </div>

                        <p>
                            {lastSeen}
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
                            {HUDInfo['visits']}
                        </p>

                        <div>
                            <h3>
                                Age
                            </h3>
                        </div>

                        <p>
                            {HUDInfo['age']}
                        </p>
                    </div>

                </div> : <Loading/>}
        </div>
    );
}

export default SideHUD;
