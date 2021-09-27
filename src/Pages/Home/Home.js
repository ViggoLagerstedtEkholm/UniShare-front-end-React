import {useEffect, useState} from "react";
import axios from "axios";
import {TopRankedCourse} from './TopCourses';
import {TopTrendingDiscussion} from './TopForums';
import {ShowcaseUser} from './ShowcaseUser';

function Home() {
    const [profile, setProfile] = useState(null);
    const [topRanked, setTopRanked] = useState(null);
    const [trendingDiscussions, setTrendingDiscussions] = useState(null);

    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(async () => {
        fetchData();
    }, [isLoaded])

    const fetchData = () => {
        const profile = axios.get("/api/getCurrentUser");
        const courses = axios.get("/api/getTOP10Courses");
        const forums = axios.get("/api/getTOP10Forums");


        Promise.all([profile, courses, forums]).then(function (values) {
            console.log(values);

            if (localStorage.getItem('USER') != null) {
                if (values[0] && values[1] && values[2]) {
                    setProfile(values[0]['data']);
                    setTopRanked(values[1]['data']['TOP_RANKED_COURSES']);
                    setTrendingDiscussions(values[2]['data']['TOP_VIEWED_FORUMS']);
                    setIsLoaded(true);
                }
            } else {
                if (values[1] && values[2]) {
                    setTopRanked(values[1]['data']['TOP_RANKED_COURSES']);
                    setTrendingDiscussions(values[2]['data']['TOP_VIEWED_FORUMS']);
                    setIsLoaded(true);
                }
            }
        });
    }

    return (
        <div className="container">
            {isLoaded ?
                <div className="content-container">
                    <div className="startpage-flex-item">
                        {(profile ? <div>
                                        <h1>Your profile</h1> <ShowcaseUser data={profile} />
                                        <hr/>
                                    </div> : null)}


                        <h1>Top ranked courses</h1>
                        <div className="display-result-box">
                            {(topRanked ? <TopRankedCourse data={topRanked} /> : <h1>No records!</h1>)}
                        </div>

                        <h1>Trending discussions</h1>
                        <div className="display-result-box">
                            {(trendingDiscussions ? <TopTrendingDiscussion data={trendingDiscussions} /> : <h1>No records!</h1>)}
                        </div>
                    </div>
            </div>
                : <h4>Loading home page...</h4>
            }
        </div>
    );
}

export default Home;
