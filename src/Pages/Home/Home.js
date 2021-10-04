import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {TopRankedCourse} from './TopCourses';
import {TopTrendingDiscussion} from './TopForums';
import {ShowcaseUser} from './ShowcaseUser';
import {API} from "../Shared/Constants";
import {UserContext} from "../Shared/Context/UserContext";

function Home() {
    const [topRanked, setTopRanked] = useState(null);
    const [trendingDiscussions, setTrendingDiscussions] = useState(null);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalCourses, setTotalCourses] = useState(0);
    const [totalForums, setTotalForums] = useState(0);

    const [isLoaded, setIsLoaded] = useState(false);

    const {user} = useContext(UserContext);
    useEffect(async () => {
        fetchData().then(() => setIsLoaded(true));
    }, [])

    const fetchData = async () => {
        const options = {
            withCredentials: true
        }

        await axios.get(API + "/getTOP10Courses", options).then(response =>{
            console.log(response);
            setTopRanked(response.data['TOP_RANKED_COURSES']);
        }).catch(error =>{
            console.log(error);
        });

        await axios.get(API + "/getTOP10Forums", options).then(response =>{
            console.log(response);
            setTrendingDiscussions(response.data['TOP_VIEWED_FORUMS']);
        }).catch(error =>{
            console.log(error);
        });

        await axios.get(API + "/getStatistics", options).then(response => {
            const data = response.data;
            setTotalUsers(data['userCount']);
            setTotalCourses(data['courseCount']);
            setTotalForums(data['forumCount']);
        }).catch(error => {
            console.log(error);
        });
    }

    return (
        <div className="container">
            <div>
                <h1 className="logo">Welcome to UniShare</h1>
                {isLoaded ?
                    <div className="content-container">
                        <div className="startpage-flex-item">

                            <div className="row">
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
                                <div className="column">
                                    <div className="home-statistics-header">
                                        <h4>Total amount of forums</h4>
                                        <div className="home-statistics-card">
                                            <h2>{totalForums}</h2>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <h1>Your profile</h1>
                            {user ? <ShowcaseUser ID={user.userID}/> : null}
                            <hr/>

                            <h1>Top ranked courses</h1>
                            <div className="display-result-box">
                                {(topRanked.length !== 0 ? <TopRankedCourse data={topRanked}/> :
                                    <div className="display-result-box">
                                        <h4>No records!</h4>
                                    </div>)}
                            </div>

                            <h1>Trending discussions</h1>
                            <div className="display-result-box">
                                {(trendingDiscussions.length !== 0 ?
                                    <TopTrendingDiscussion data={trendingDiscussions}/> :
                                    <div className="display-result-box">
                                        <h4>No records!</h4>
                                    </div>)}
                            </div>
                        </div>
                    </div>
                    : <h4>Loading home page...</h4>
                }
            </div>

        </div>
    );
}

export default Home;
