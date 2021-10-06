import {useContext, useEffect, useMemo, useState} from "react";
import SideHUD from "./HUD/SideHUD";
import {Tab, TabList, TabPanel, Tabs} from 'react-tabs';
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
import {Ratings} from "./Ratings/Ratings";
import {Reviews} from "./Reviews/Reviews";
import NotFound from "../Shared/Error/NotFound";
import {Loading} from "../Shared/State/Loading";

function Profile(props) {
    const [profileID, setProfileID] = useState(props.match.params.profileID);
    const value = useMemo(() => ({profileID, setProfileID}), [profileID, setProfileID]);
    const {user} = useContext(UserContext);

    const [profileExists, setProfileExists] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect( () => {
        checkIfProfileExists().then((response) =>{
            if(response){
                setProfileExists(true);
                console.log(response);
                appendVisitData();
            }
            setIsLoaded(true);
        });
    }, []);

    const checkIfProfileExists = async () => {
        const promise =  axios.get(API + "/profile/get", {
            params: {
                profileID: profileID
            }
        });

        return promise.then((response) => response.data).catch(() => null);
    }

    const appendVisitData =   () => {
        const params = {
            profileID: profileID
        };
        axios.post(API + "/profile/append/visits", querystring.stringify(params), {withCredentials: true}).then(response => {
            console.log(response);
        }).catch(error => {
            console.log(error);
        });
    }

    let canSeeProfileEdits = false;
    if (user !== null) {
        const currentLoggedIn = user['userID'];
        if (currentLoggedIn === profileID) {
            canSeeProfileEdits = true;
        }
    }

    return (
        <div className="container">
            {isLoaded ? <div>
                    {
                        profileExists ?
                            <div>
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
                                                    <Tab>Course Ratings</Tab>
                                                    <Tab>Course Reviews</Tab>
                                                </TabList>

                                                <TabPanel>
                                                    <h3 className="title-bar">
                                                        Projects
                                                    </h3>

                                                    {canSeeProfileEdits ?
                                                        <div>
                                                            <div className="button-box">
                                                                <Link to="/project/add" className="button-style-4">Add new
                                                                    project</Link>
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
                                                    <h3 className="title-bar">
                                                        Degrees
                                                    </h3>

                                                    {canSeeProfileEdits ?
                                                        <div>
                                                            <div className="button-box">
                                                                <Link to="/degree/add" className="button-style-4">Add new
                                                                    degree</Link>
                                                            </div>
                                                            <hr/>
                                                        </div>
                                                        : null
                                                    }

                                                    <ProfileContext.Provider value={value}>
                                                        <ShowcaseDegrees/>
                                                    </ProfileContext.Provider>
                                                </TabPanel>

                                                <TabPanel>
                                                    <h3 className="title-bar">
                                                        Publications
                                                    </h3>

                                                    {canSeeProfileEdits ?
                                                        <div>
                                                            <hr/>

                                                            <h1>~ Coming soon!</h1>

                                                        </div>
                                                        :
                                                        <h1>~ Coming soon!</h1>
                                                    }

                                                </TabPanel>

                                                <TabPanel>
                                                    <h3 className="title-bar">
                                                        Friends
                                                    </h3>
                                                    <FriendList ID={props.match.params.profileID}/>
                                                </TabPanel>

                                                <TabPanel>
                                                    <h3 className="title-bar">
                                                        Ratings
                                                    </h3>
                                                    <ProfileContext.Provider value={value}>
                                                        <Ratings/>
                                                    </ProfileContext.Provider>
                                                </TabPanel>

                                                <TabPanel>
                                                    <h3 className="title-bar">
                                                        Reviews
                                                    </h3>
                                                    <ProfileContext.Provider value={value}>
                                                        <Reviews/>
                                                    </ProfileContext.Provider>
                                                </TabPanel>
                                            </Tabs>
                                        </div>
                                    </div>
                                </div>

                                <hr/>

                                <ProfileContext.Provider value={value}>
                                    <ShowcaseComments/>
                                </ProfileContext.Provider>
                            </div> : <NotFound/>
                    }
                </div> :
                <Loading/>
            }
        </div>
    );
}

export default Profile;
