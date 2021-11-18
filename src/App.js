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
import NotFound from "../../unishare/src/Pages/Shared/Error/NotFound";
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
import {Loading} from "./Pages/Shared/State/Loading";
import {HashRouter, Route, Routes} from "react-router-dom";

function App() {
    const [user, setUser] = useState(null);
    const value = useMemo(() => ({user, setUser}), [user, setUser]);
    const [isLoaded, setIsLoaded] = useState(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        if (localStorage.getItem('token')) {
            const storage = JSON.parse(localStorage.getItem('token'));
            const user = jwt(storage.token);
            setUser(user);
            setIsLoaded(true);
        } else {
            setUser(null);
            setIsLoaded(true);
        }
    }, []);

    return (
        <HashRouter>
            {isLoaded ?
                <UserContext.Provider value={value}>
                    <ErrorBoundary FallbackComponent={Fallback}>
                        <Header/>
                        <Routes>
                            <Route path="/" element={<Home/>}/>
                            <Route path="/login" element={<Login/>}/>
                            <Route path="/register" element={<Register/>}/>

                            <Route exact path="/profile/:ID" element={<Profile/>}/>
                            <Route path="/courses/:ID" element={<Course/>}/>
                            <Route path="/search/people" element={<People/>}/>
                            <Route path="/search/courses" element={<Courses/>}/>

                            <Route path="/verify" element={<Verify/>}/>

                            <Route path="/friends" element={<Friend/>}/>

                            <Route path="/courses/request/add" element={<Requests/>}/>
                            <Route path="/courses/request/update/:ID" element={<CourseUpdate/>}/>

                            <Route path="/project/add" element={<ProjectAdd/>}/>
                            <Route path="/project/edit/:ID" element={<ProjectUpdate/>}/>

                            <Route path="/degree/add" element={<DegreeAdd/>}/>
                            <Route path="/degree/edit/:ID" element={<DegreeUpdate/>}/>

                            <Route path="/courses/review/add" element={<Add/>}/>
                            <Route path="/settings" element={<Settings/>}/>

                            <Route path='/admin' element={<Overview/>}/>

                            <Route component={NotFound}/>
                        </Routes>
                    </ErrorBoundary>
                    <Footer/>
                </UserContext.Provider>
                : <Loading/>}
        </HashRouter>
    );
}

export default App;
