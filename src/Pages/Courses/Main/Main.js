import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {CourseContext} from "../../Shared/Context/CourseContext";
import {Graph} from '../../Shared/Graph/Graph';
import {Statistics} from "./Statistics";
import {Rating} from "./Rating";
import {Description} from "./Description";
import {UserContext} from "../../Shared/Context/UserContext";

export const Main = () => {
    const [courseStatistics, setCourseStatistics] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [message, setMessage] = useState('');
    const [data, setData] = useState(null);
    const {courseID} = useContext(CourseContext);
    const {user} = useContext(UserContext);

    let canSeeLoggedInFeatures = true;
    if(user == null){
        canSeeLoggedInFeatures = false;
    }

    const labels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    useEffect(async () => {
        await fetchData();
    }, [])

    async function fetchData() {
        try {
            const response = await axios.get("/course/statistics", {
                params: {
                    courseID: courseID
                }
            })

            const graphData = await axios.get("/course/getGraphData",{
                params: {
                    courseID: courseID
                }
            });

            setCourseStatistics(response.data);
            let count = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            let data = graphData['data']['data']['ratings'];
            for (let i = 0; i < data.length; i++) {
                count[data[i][0] - 1] = data[i][1];
            }
            setData(count);
            setIsLoaded(true);
        } catch (error) {
            setMessage("Could not fetch course data.");
        }
    }

    return (
        <div className="user-content">
            <div className="course-container">
                {message ? <h1>{message}</h1> : null}
                {isLoaded ?
                    <div>
                        <Statistics courseStatistics={courseStatistics}/>

                        {
                            canSeeLoggedInFeatures ? <Rating/> : null
                        }
                        <Description/>

                        <div className="graph-box">
                            <p>Ratings chart (1 - 10)</p>

                            <Graph data={data} labels={labels}/>
                        </div>
                    </div>
                    : <h1>Loading...</h1>}
            </div>
        </div>
    );
}