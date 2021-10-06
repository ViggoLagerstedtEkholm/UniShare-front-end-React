import './App.css';
import './css/style.css';
import './css/collapsible.css';
import './css/tabs.css';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from "./Pages/Home/Home";
import Register from "./Pages/Authentication/Register";
import Login from "./Pages/Authentication/Login";
import Profile from "./Pages/Profile/Profile";
import Header from "./Pages/Shared/Header/Header";
import Courses from "./Pages/Searching/Courses/Courses";
import Course from "./Pages/Courses/Courses";
import Forums from "./Pages/Searching/Forums/Forums";
import Footer from "./Pages/Shared/Header/Footer";
import {useEffect, useMemo, useState} from "react";
import {UserContext} from "./Pages/Shared/Context/UserContext";
import {Settings} from "./Pages/Settings/Settings";
import People from "./Pages/Searching/People/People";
import {AddForum} from "./Pages/Forums/AddForum.js";
import {PostBox} from "./Pages/Forums/Post/PostBox";
import {ErrorBoundary} from 'react-error-boundary'
import Fallback from "./Pages/Shared/Error/Fallback";
import axios from "axios";
import {DisplayForum} from "./Pages/Forums/DisplayForum";
import {PostAdd} from "./Pages/Forums/Post/PostAdd";
import {AddReview} from "./Pages/Courses/Review/AddReview";
import {Friend} from "./Pages/Friends/Friend";
import Overview from "./Pages/Admin/Overview";
import {PrivateRoute} from "./Pages/Shared/Route/PrivateRoute";
import {API} from "./Pages/Shared/Constants";
import {LoggedInRoute} from "./Pages/Shared/Route/LoggedInRoute";
import {Verify} from "./Pages/Authentication/Verify";
import DegreeUploadHandler from "./Pages/Profile/Degrees/DegreeUploadHandler";
import ScrollToTop from "./Pages/Shared/Route/ScrollToTop";
import ProjectUploadHandler from "./Pages/Profile/Projects/ProjectUploadHandler";
import NotFound from "./Pages/Shared/Error/NotFound";
import {CourseUploadHandler} from "./Pages/Courses/Upload/CourseUploadHandler";

function App() {
    const [user, setUser] = useState(null);
    const value = useMemo(() => ({user, setUser}), [user, setUser]);
    const [isLoaded, setIsLoaded] = useState(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        checkIfLoggedIn().then(response => {
            if (response) {
                const user = localStorage.getItem('USER');
                const initialValue = JSON.parse(user);
                setUser(initialValue);
            } else {
                setUser(null);
                localStorage.clear();
            }
            setIsLoaded(true);
        })
    }, [isLoaded]);

    const checkIfLoggedIn = async () => {
        let isLoggedIn = false;
        const options = {
            withCredentials: true
        }

        await axios.get(API + "/isLoggedIn", options)
            .then(
                response => {
                    isLoggedIn = response['data']['data']['LoggedIn'];
                }
            )
            .catch((error) => {
                console.log(error);
            });

        return isLoggedIn;
    }

    return (
        <div>
            {isLoaded ?
                <Router>
                    <ErrorBoundary FallbackComponent={Fallback}>
                        <UserContext.Provider value={value}>
                            <Header/>
                            <ScrollToTop />
                            <Switch>
                                <Route exact path="/" component={Home}/>
                                <Route exact path="/login" component={Login}/>
                                <Route exact path="/register" component={Register}/>
                                <Route exact path="/verify/:email/:hash" component={Verify}/>

                                <Route exact path="/profile/:profileID" component={Profile}/>
                                <Route exact path="/courses/:courseID" component={Course}/>
                                <Route exact path="/search/people" component={People}/>
                                <Route exact path="/search/courses" component={Courses}/>
                                <Route exact path="/search/forums" component={Forums}/>

                                <Route exact path="/forum/:forumID" component={DisplayForum}/>
                                <LoggedInRoute exact path="/forum/add/new" component={AddForum}/>
                                <LoggedInRoute exact path="/forum/post/:forumID" component={PostBox}/>
                                <LoggedInRoute exact path="/forum/post/:forumID/add" component={PostAdd}/>
                                <LoggedInRoute exact path="/friends" component={Friend}/>

                                <LoggedInRoute exact path="/courses/request/add" component={CourseUploadHandler}/>
                                <LoggedInRoute exact path="/courses/request/update/:courseID" component={CourseUploadHandler}/>

                                <LoggedInRoute exact path="/project/add" component={ProjectUploadHandler}/>
                                <LoggedInRoute exact path="/project/edit/:projectID" component={ProjectUploadHandler}/>

                                <LoggedInRoute exact path="/degree/add" component={DegreeUploadHandler}/>
                                <LoggedInRoute exact path="/degree/edit/:degreeID" component={DegreeUploadHandler}/>

                                <LoggedInRoute exact path="/courses/review/add" component={AddReview}/>
                                <LoggedInRoute exact path="/settings" component={Settings}/>

                                <PrivateRoute path='/admin' component={Overview} />

                                <Route component={NotFound}/>
                            </Switch>
                        </UserContext.Provider>
                    </ErrorBoundary>
                    <Footer/>
                </Router>
                :
                null
            }
        </div>
    );
}

export default App;
