import './App.css';
import './css/style.css';
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
import Settings from "./Pages/Settings/Settings";
import People from "./Pages/Searching/People/People";
import AddProject from "./Pages/Profile/Projects/Add";
import {AddForum} from "./Pages/Forums/AddForum.js";
import {PostBox} from "./Pages/Forums/Post/PostBox";
import AddDegree from "./Pages/Profile/Degrees/Add";
import EditDegree from "./Pages/Profile/Degrees/Edit";
import Edit from "./Pages/Profile/Projects/Edit";
import {ErrorBoundary} from 'react-error-boundary'
import NotFound from "./Pages/Shared/Error/NotFound";
import Fallback from "./Pages/Shared/Error/Fallback";
import axios from "axios";
import {DisplayForum} from "./Pages/Forums/DisplayForum";
import {PostAdd} from "./Pages/Forums/Post/PostAdd";
import {AddReview} from "./Pages/Courses/Review/AddReview";
import {Friend} from "./Pages/Friends/Friend";
import Request from "./Pages/Courses/Request/Request";
import Overview from "./Pages/Admin/Overview";
import {Update} from "./Pages/Courses/Update/Update";
import {PrivateRoute} from "./Pages/Shared/Route/PrivateRoute";
import {API} from "./Pages/Shared/Constants";

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
                    console.log(response['data']['data']['LoggedIn']);
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

                            <Switch>
                                <Route exact path="/" component={Home}/>
                                <Route exact path="/login" component={Login}/>
                                <Route exact path="/register" component={Register}/>
                                <Route exact path="/profile/:profileID" component={Profile}/>
                                <Route exact path="/project/add" component={AddProject}/>
                                <Route exact path="/project/edit/:projectID" component={Edit}/>
                                <Route exact path="/degree/add" component={AddDegree}/>
                                <Route exact path="/degree/edit/:degreeID" component={EditDegree}/>
                                <Route exact path="/courses/:courseID/update" component={Update}/>
                                <Route exact path="/courses/:courseID" component={Course}/>
                                <Route exact path="/courses/review/add" component={AddReview}/>
                                <Route exact path="/settings" component={Settings}/>
                                <Route exact path="/search/people" component={People}/>
                                <Route exact path="/search/courses" component={Courses}/>
                                <Route exact path="/search/forums" component={Forums}/>
                                <Route exact path="/forum/add" component={AddForum}/>
                                <Route exact path="/forum/:forumID" component={DisplayForum}/>
                                <Route exact path="/forum/post/:forumID" component={PostBox}/>
                                <Route exact path="/forum/post/:forumID/add" component={PostAdd}/>
                                <Route exact path="/friends" component={Friend}/>
                                <Route exact path="/request" component={Request}/>

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
