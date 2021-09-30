import {useContext, useEffect, useMemo, useState} from "react";
import SideHUD from "./HUD/SideHUD";
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import ShowcaseProjects from "./Projects/ShowcaseProjects";
import ShowcaseComments from "./Comments/ShowcaseComments";
import ShowcaseDegrees from "./Degrees/ShowcaseDegrees";
import {ProfileContext} from "../Shared/Context/ProfileContext";
import {UserContext} from "../Shared/Context/UserContext";
import {Link} from "react-router-dom";
import axios from "axios";
import querystring from "querystring";
import {API} from "../Shared/Constants";
import {FriendList} from "../Friends/FriendList";

function Profile(props) {
    const [profileID, setProfileID] = useState(props.match.params.profileID);
    const value = useMemo(() => ({profileID, setProfileID}), [profileID, setProfileID]);
    const {user} = useContext(UserContext);

    useEffect(async () => {
        const params = {
            profileID: profileID
        }

        await axios.post(API + "/profile/append/visits", querystring.stringify(params), { withCredentials: true }).then(response =>{
            console.log(response);
        }).catch(error => {
            console.log(error);
        });
    },[]);

    let canSeeProfileEdits = false;
    if(user !== null){
        const currentLoggedIn = user['userID'];
        if (currentLoggedIn === profileID) {
            canSeeProfileEdits = true;
        }
    }

    return (
        <div className="container">
            <div className="content-container">
                <div className="fixed">
                    <ProfileContext.Provider value={value}>
                        <SideHUD/>
                    </ProfileContext.Provider>
                </div>

                <div className="flex-item">
                    <div className="user-content">
                        <Tabs>
                            <TabList>
                                <Tab>Projects</Tab>
                                <Tab>Degrees</Tab>
                                <Tab>Publications</Tab>
                                <Tab>Friends</Tab>
                            </TabList>

                            <TabPanel>
                                <h3 className="user-input-form-box">
                                    Projects
                                </h3>

                                {canSeeProfileEdits ?
                                    <div>
                                        <div className="button-box">
                                            <Link to="/project/add" className="button-style-4">Add new project</Link>
                                        </div>

                                        <hr/>

                                    </div>
                                    : null
                                }
                                <ProfileContext.Provider value={value}>
                                    <ShowcaseProjects/>
                                </ProfileContext.Provider>
                            </TabPanel>

                            <TabPanel>
                                <h3 className="user-input-form-box">
                                    Degrees
                                </h3>

                                {canSeeProfileEdits ?
                                    <div>
                                        <div className="button-box">
                                            <Link to="/degree/add" className="button-style-4">Add new degree</Link>
                                        </div>
                                        <hr/>
                                    </div>
                                    :null
                                }

                                <ProfileContext.Provider value={value}>
                                    <ShowcaseDegrees/>
                                </ProfileContext.Provider>
                            </TabPanel>

                            <TabPanel>
                                <h3 className="user-input-form-box">
                                    Publications
                                </h3>

                                {canSeeProfileEdits ?
                                    <div>
                                        <div className="button-box">
                                            <Link to="/degree/add" className="button-style-4">Add publication</Link>
                                        </div>
                                        <hr/>

                                        <h1>~ Coming soon!</h1>

                                    </div>
                                    :
                                    <h1>~ Coming soon!</h1>
                                }

                            </TabPanel>

                            <TabPanel>
                                <FriendList ID={props.match.params.profileID}/>
                            </TabPanel>
                        </Tabs>
                    </div>
                </div>
            </div>

            <hr/>

            <ProfileContext.Provider value={value}>
                <ShowcaseComments />
            </ProfileContext.Provider>
        </div>
    );
}

export default Profile;
