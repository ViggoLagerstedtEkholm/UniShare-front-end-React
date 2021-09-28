import axios from "axios";
import {useEffect, useState} from "react";
import {CourseBox} from "../../Searching/Courses/CourseBox";
import {RequestBox} from "./RequestBox";
import {RequestForm} from "./RequestForm";
import {API} from "../../Shared/Constants";

function Request() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [requests, setRequests] = useState(null);

    useEffect(() => {
        const getForum = async () => {
            await axios.get(API + "/request/courses").then(
                response => {
                    console.log(response);
                    setRequests(response);
                }
            )
                .catch((error) => {
                    console.log(error);
                });
        }

        getForum().then(() => setIsLoaded(true));
    }, []);

    return (
        <div className="container">
            <div className="request-course-container">
                <h2>Request to add course</h2>

                <p>
                    Do you have a course that is not currently in the database and want it to be added? Submit this form
                    for
                    admins to review, this process will take 1-2 days maximum.
                </p>

                <h2 className="user-input-form-box">
                    Add course
                </h2>

                <RequestForm/>

                <hr/>

                <h2 className="user-input-form-box">
                    Your pending requests
                </h2>
                <div className="display-result-box">
                    {isLoaded ? <RequestBox results={requests}/> : <h1>Loading...</h1>}
                </div>
            </div>
        </div>
    );
}

export default Request;