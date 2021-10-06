import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {CourseContext} from "../../Shared/Context/CourseContext";
import {Graph} from '../../Shared/Graph/Graph';
import {Statistics} from "./Statistics";
import {Rating} from "./Rating";
import {Description} from "./Description";
import {UserContext} from "../../Shared/Context/UserContext";
import {API} from "../../Shared/Constants";
import {Loading} from "../../Shared/State/Loading";

export const Main = () => {
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
            const graphData = await axios.get(API + "/course/getGraphData",{
                params: {
                    courseID: courseID
                }
            });

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
                        <Statistics/>

                        {
                            canSeeLoggedInFeatures ? <Rating/> : null
                        }
                        <Description/>

                        <div className="graph-box course-info course-shadow">
                            <p>Ratings chart</p>
                            <Graph data={data} labels={labels}/>
                        </div>
                    </div>
                    : <Loading/>}
            </div>
        </div>
    );
}