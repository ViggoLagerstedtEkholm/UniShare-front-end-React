import {useContext, useEffect, useMemo, useState} from "react";
import SideHUD from "./HUD/SideHUD";
import {Tab, TabList, TabPanel, Tabs} from 'react-tabs';
import ShowcaseComments from "./Comments/ShowcaseComments";
import {ProfileContext} from "../Shared/Context/ProfileContext";
import {UserContext} from "../Shared/Context/UserContext";
import {Link, useParams} from "react-router-dom";
import {FriendList} from "../Friends/FriendList";
import {Ratings} from "./Ratings/Ratings";
import {Reviews} from "./Reviews/Reviews";
import NotFound from "../Shared/Error/NotFound";
import {Loading} from "../Shared/State/Loading";
import {ProjectBox} from "./Projects/ProjectBox";
import {DegreesBox} from "./Degrees/DegreesBox";
import {AppendVisit, CanSeeEdits, FetchUser} from "../Service/UserService";

function Profile() {
    const {ID} = useParams();
    const [profileID, setProfileID] = useState(ID);
    const value = useMemo(() => ({profileID, setProfileID}), [profileID, setProfileID]);
    const {user} = useContext(UserContext);

    const [profileExists, setProfileExists] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect( () => {
        FetchUser(profileID).then((response) =>{
            if(response){
                setProfileExists(true);
                AppendVisit(profileID).then(() => null);
            }
            setIsLoaded(true);
        });
    }, [profileID]);

    return (
        <div className="container">
            <ProfileContext.Provider value={value}>
            {isLoaded ? <div>
            {
            profileExists ?
                <div>
                    <div className="content-container">
                        <div className="fixed">
                            <SideHUD/>
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

                                        {CanSeeEdits(profileID, user) ?
                                            <div>
                                                <div className="button-box">
                                                    <Link to="/project/add" className="button-style-4">Add new
                                                        project</Link>
                                                </div>

                                                <hr/>

                                            </div>
                                            : null
                                        }
                                        <ProjectBox/>
                                    </TabPanel>
                                    <TabPanel>
                                        <h3 className="title-bar">
                                            Degrees
                                        </h3>
                                        {CanSeeEdits(profileID, user) ?
                                            <div>
                                                <div className="button-box">
                                                    <Link to="/degree/add" className="button-style-4">Add new
                                                        degree</Link>
                                                </div>
                                                <hr/>
                                            </div>
                                            : null
                                        }
                                        <DegreesBox/>
                                    </TabPanel>
                                    <TabPanel>
                                        <h3 className="title-bar">
                                            Publications
                                        </h3>

                                        {CanSeeEdits(profileID, user) ?
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
                                        <FriendList ID={ID}/>
                                    </TabPanel>
                                    <TabPanel>
                                        <h3 className="title-bar">
                                            Ratings
                                        </h3>

                                        <Ratings/>
                                    </TabPanel>
                                    <TabPanel>
                                        <h3 className="title-bar">
                                            Reviews
                                        </h3>
                                        <Reviews/>
                                    </TabPanel>
                                </Tabs>
                            </div>
                        </div>
                    </div>
                    <hr/>
                    <ShowcaseComments/>
                </div> : <NotFound/>
            }
        </div> :
        <Loading/>
    }
            </ProfileContext.Provider>
        </div>
    );
}

export default Profile;
