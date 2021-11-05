import {useContext, useEffect, useState} from "react";
import {CourseContext} from "../../Shared/Context/CourseContext";
import {Loading} from "../../Shared/State/Loading";
import {GetStatistics} from "../../Service/CourseService";

export const Statistics = () => {
    const [courseStatistics, setCourseStatistics] = useState(0);
    const {courseID} = useContext(CourseContext);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(async () => {
        GetStatistics(courseID).then(response => {
            setCourseStatistics(response);
            setIsLoaded(true);
        }).catch(() =>{
            setIsLoaded(true);
        });
    }, [])

    return (
        <div className="course-sections-statistics course-shadow">
            <div className="course-info">
                {isLoaded ?
                <>
                    <div className="score">
                        Score ( {courseStatistics['rating'] ?? ' - '} )
                    </div>
                    <p>Total amount of votes: {courseStatistics['count']}</p>
                </>
                 : <Loading/>}

            </div>
        </div>
    );
}
