import axios from "axios";
import {useContext, useEffect, useState} from "react";
import {AddReviewForm} from "./AddReviewForm";
import {CourseContext} from "../../Shared/Context/CourseContext";
import {API} from "../../Shared/Constants";
import {Loading} from "../../Shared/State/Loading";

export const AddReview = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [review, setReview] = useState(null);
    const {courseID} = useContext(CourseContext);

    useEffect(() => {
        const getExistingReview = async () => {
            console.log(courseID);
          await axios.get(API + "/review/get", {
              params: {
                  courseID: courseID
              },
              withCredentials: true
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
        <div>
            {isLoaded ?
                <AddReviewForm review={review} />
                : <Loading/>}
        </div>
);
}
