import axios from "axios";
import {useContext, useEffect, useState} from "react";
import {AddReviewForm} from "./AddReviewForm";
import {CourseContext} from "../../Shared/Context/CourseContext";

export const AddReview = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [review, setReview] = useState(null);
    const {courseID} = useContext(CourseContext);

    useEffect(() => {
        const getExistingReview = async () => {
            console.log(courseID);
          await axios.get("/review/get", {
              params: {
                  courseID: courseID
              }
          }).then(response =>{
            console.log(response);
            setReview(response);
          }).catch(error =>{
              console.log(error);
          })
        }

        getExistingReview().then(() => setIsLoaded(true));
    }, []);

    return (
        <div className="request-course-container">
            {isLoaded ?
                <AddReviewForm review={review} />
                : <h1>Loading...</h1>}
        </div>
);
}
