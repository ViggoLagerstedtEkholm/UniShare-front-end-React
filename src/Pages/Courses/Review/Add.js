import {useContext, useEffect, useState} from "react";
import {ReviewForm} from "./ReviewForm";
import {CourseContext} from "../../Shared/Context/CourseContext";
import {Loading} from "../../Shared/State/Loading";
import {GetReview} from "../../Service/ReviewService";

export const Add = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [review, setReview] = useState(null);
    const {courseID} = useContext(CourseContext);

    useEffect(() => {
        GetReview(courseID).then(response =>{
            setReview(response);
            setIsLoaded(true);
        }).catch(() =>{
            console.log('No written review.');
        });
    }, []);

    return (
        <div>
            {isLoaded ?
                <ReviewForm review={review} />
                : <Loading/>}
        </div>
);
}
