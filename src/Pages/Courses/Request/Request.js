import axios from "axios";
import {useEffect, useState} from "react";
import {RequestBox} from "./RequestBox";
import {RequestForm} from "./RequestForm";
import {API} from "../../Shared/Constants";
import { useHistory } from "react-router-dom";

function Request() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [requests, setRequests] = useState(null);
    let history = useHistory();

    useEffect(() => {
        const getForum = async () => {
            await axios.get(API + "/request/courses", {withCredentials: true}).then(
                response => {
                    setRequests(response);
                }
            )
            .catch((error) => {
                if (error.response) {
                    if(error.response.status === 403){
                        history.push("/login");
                    }
                }
            });
        }

        getForum().then(() => setIsLoaded(true));
    }, []);

    return (
        <div className="container">
            <h2>Request to add course</h2>
            <h3>
                Do you have a course that is not currently in the database and want it to be added? Submit this form
                for
                admins to review, this process will take 1-2 days maximum.
            </h3>
            <hr/>

            <RequestForm/>

            <hr/>

            <h2 className="user-input-form-box">
                Your pending requests
            </h2>
            <div className="display-result-box">
                {isLoaded ? <RequestBox results={requests}/> : <h1>Loading...</h1>}
            </div>
        </div>
    );
}

export default Request;