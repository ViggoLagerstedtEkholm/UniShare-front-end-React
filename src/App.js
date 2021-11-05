import './css/style.css';
import './css/collapsible.css';
import './css/tabs.css';

import Home from "./Pages/Home/Home";
import Register from "./Pages/Authentication/Register";
import Login from "./Pages/Authentication/Login";
import Profile from "./Pages/Profile/Profile";
import Header from "./Pages/Shared/Header/Header";
import Courses from "./Pages/Searching/Courses/Courses";
import Course from "./Pages/Courses/Courses";
import Footer from "./Pages/Shared/Header/Footer";
import {Settings} from "./Pages/Settings/Settings";
import People from "./Pages/Searching/People/People";
import Fallback from "./Pages/Shared/Error/Fallback";
import {Add} from "./Pages/Courses/Review/Add";
import {Friend} from "./Pages/Friends/Friend";
import Overview from "./Pages/Admin/Overview";
import {PrivateRoute} from "./Pages/Shared/Route/PrivateRoute";
import {LoggedInRoute} from "./Pages/Shared/Route/LoggedInRoute";
import ScrollToTop from "./Pages/Shared/Route/ScrollToTop";
import NotFound from "../../microlabscasefrontend/src/Components/Error/NotFound";
import ProjectAdd from "./Pages/Profile/Projects/Add";
import CourseUpdate from "./Pages/Courses/Upload/Update";
import ProjectUpdate from "./Pages/Profile/Projects/Update";
import DegreeUpdate from "./Pages/Profile/Degrees/Update";
import DegreeAdd from "./Pages/Profile/Degrees/Add";
import {Requests} from "./Pages/Courses/Upload/Requests";
import {Verify} from "./Pages/Authentication/Verify";

import {useEffect, useMemo, useState} from "react";
import {ErrorBoundary} from 'react-error-boundary'
import {UserContext} from "./Pages/Shared/Context/UserContext";
import jwt from 'jwt-decode'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Loading} from "./Pages/Shared/State/Loading";

function App() {
    const [user, setUser] = useState(null);
    const value = useMemo(() => ({user, setUser}), [user, setUser]);
    const [isLoaded, setIsLoaded] = useState(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        if(localStorage.getItem('token')){
            const storage = JSON.parse(localStorage.getItem('token'));
            const user = jwt(storage.token);
            setUser(user);
            setIsLoaded(true);
        }else{
            setUser(null);
            setIsLoaded(true);
        }
    }, []);

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

                                <Route exact path="/profile/:profileID" component={Profile}/>
                                <Route exact path="/courses/:courseID" component={Course}/>
                                <Route exact path="/search/people" component={People}/>
                                <Route exact path="/search/courses" component={Courses}/>

                                <Route exact path="/verify" component={Verify}/>

                                <LoggedInRoute exact path="/friends" component={Friend}/>

                                <LoggedInRoute exact path="/courses/request/add" component={Requests}/>
                                <LoggedInRoute exact path="/courses/request/update/:courseID" component={CourseUpdate}/>

                                <LoggedInRoute exact path="/project/add" component={ProjectAdd}/>
                                <LoggedInRoute exact path="/project/edit/:projectID" component={ProjectUpdate}/>

                                <LoggedInRoute exact path="/degree/add" component={DegreeAdd}/>
                                <LoggedInRoute exact path="/degree/edit/:degreeID" component={DegreeUpdate}/>

                                <LoggedInRoute exact path="/courses/review/add" component={Add}/>
                                <LoggedInRoute exact path="/settings" component={Settings}/>

                                <PrivateRoute path='/admin' component={Overview} />

                                <Route component={NotFound}/>
                            </Switch>
                        </UserContext.Provider>
                    </ErrorBoundary>
                    <Footer/>
                </Router>
                :
                <Loading/>
            }
        </div>
    );
}

export default App;
