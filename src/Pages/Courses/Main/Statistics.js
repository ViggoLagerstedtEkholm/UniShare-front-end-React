import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {CourseContext} from "../../Shared/Context/CourseContext";
import {API} from "../../Shared/Constants";

export const Statistics = () => {
    const [courseStatistics, setCourseStatistics] = useState(0);
    const {courseID} = useContext(CourseContext);

    useEffect(async () => {
        await getCourseStatistics();
    }, [])

    const getCourseStatistics = async () => {
        try {
            const response = await axios.get(API + "/course/statistics", {
                params: {
                    courseID: courseID
                }
            })

            setCourseStatistics(response.data);
            console.log("Data: ", response.data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="course-sections-statistics course-shadow">
            <div className="course-info">
                <div className="score">
                    Score ( {courseStatistics['score'] ?? ' - '} )
                </div>
                <p>Total amount of votes: {courseStatistics['total_votes']}</p>
            </div>

            <div className="course-info">
                <p>Overall popularity rating: #{courseStatistics['POPULARITY_RANK']}</p>
                <p>Overall ranking rating: #{courseStatistics['RATING_RANK']}</p>
            </div>

            <div className="course-info">
                <p>Amount of reviews ( {courseStatistics['review_count']} )</p>
            </div>
        </div>
    );
}
