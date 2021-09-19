import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {CourseContext} from "../../Shared/Context/CourseContext";

export const Statistics = () => {
    const [courseStatistics, setCourseStatistics] = useState(0);
    const {courseID} = useContext(CourseContext);

    useEffect(async () => {
        await fetchData();
    }, [courseStatistics])

    async function fetchData() {
        try {
            const response = await axios.get("/course/statistics", {
                params: {
                    courseID: courseID
                }
            })

            setCourseStatistics(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="course-sections-statistics">
            <div className="course-info">
                <div className="score">
                    Score ( {courseStatistics['score']} )
                </div>
                <p>Total amount of votes: {courseStatistics['total_votes']}</p>
            </div>

            <br/>

            <div className="course-info">
                <p>Overall popularity rating: #{courseStatistics['POPULARITY_RANK']}</p>
                <p>Overall ranking rating: #{courseStatistics['RATING_RANK']}</p>
            </div>

            <div className="course-info">
                <p>Amount of reviews ( {courseStatistics['review_count']})</p>
            </div>
            <hr/>
        </div>
    );
}
