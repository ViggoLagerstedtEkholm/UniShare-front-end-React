import {useContext, useEffect, useState} from "react";
import {TopRankedCourse} from './TopCourses';
import {ShowcaseUser} from './ShowcaseUser';
import {UserContext} from "../Shared/Context/UserContext";
import {Loading} from "../Shared/State/Loading";
import {GetStatistics} from "../Service/HomeService";

function Home() {
    const [topRankedCourses, setTopRankedCourses] = useState(null);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalCourses, setTotalCourses] = useState(0);
    const [coursesLoaded, setCoursesLoaded] = useState(false);
    const [statisticsLoaded, setStatisticsLoaded] = useState(false);

    const {user} = useContext(UserContext);

    useEffect(() => {
        GetStatistics().then(response => {
            setTotalUsers(response['people']);
            setTotalCourses(response['courses']);
            setTopRankedCourses(response['topCourses']);
            setStatisticsLoaded(true);
            setCoursesLoaded(true);
        });
    }, [])

    return (
        <div className="container">
            <h1 className="logo">Welcome to UniShare</h1>
            <div className="content-container">
                <div className="startpage-flex-item">
                    {statisticsLoaded ? <div className="row">
                        <div className="column">
                            <div className="home-statistics-header">
                                <h4>Total amount of users</h4>
                                <div className="home-statistics-card">
                                    <h2>{totalUsers}</h2>
                                </div>
                            </div>
                        </div>
                        <div className="column">
                            <div className="home-statistics-header">
                                <h4>Total amount of courses</h4>
                                <div className="home-statistics-card">
                                    <h2>{totalCourses}</h2>
                                </div>
                            </div>
                        </div>
                    </div> : <Loading/>}


                    {user ? <div>
                        <h1>Your profile</h1>
                        <ShowcaseUser/>
                    </div> : null}
                    <hr/>

                    <h1>Top ranked courses</h1>
                    {coursesLoaded ? <div className="display-result-box">
                        {(topRankedCourses.length !== 0 ? <TopRankedCourse data={topRankedCourses}/> :
                            <div className="display-result-box">
                                <h4>No records!</h4>
                            </div>)}
                    </div> : <Loading/>}
                </div>
            </div>
        </div>
    );
}

export default Home;
