import {useContext, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import querystring from "querystring";
import {CourseContext} from "../../Shared/Context/CourseContext";
import {UserContext} from "../../Shared/Context/UserContext";
import {API} from "../../Shared/Constants";

export const Rating = () => {
    const {courseID} = useContext(CourseContext);
    const [currentRating, setCurrentRating] = useState(0);
    const [loading, setIsLoaded] = useState(false);

    const {user} = useContext(UserContext);
    let canRate = false;
    if (user !== null) {
        canRate = true;
    }

    useEffect(() => {
        getRate().then(() => setIsLoaded(true));
    }, [])

    const getRate = async () => {
        const params = {
            params: {
                courseID: courseID
            },
            withCredentials: true
        }

        try {
            if (canRate) {
                await axios.get(API + "/course/get/rate", params).then(response => {
                    console.log(response['data']['data']);
                    setCurrentRating(response['data']['data']['rating']);
                });
            }

        } catch (error) {
            console.log(error);
        }
    }


    const setRate = async (newRating) => {
        const params = {
            courseID: courseID,
            rating: newRating
        }

        const config = {
            headers: {
                'Accept': 'application/json'
            },
            withCredentials: true
        };

        try {
            if (canRate) {
                await axios.post("/course/set/rate", querystring.stringify(params), config);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleNewRating = (e) => {
        const newRating = e.target.value;
        setCurrentRating(newRating);
        setRate(newRating).then(r => document.getElementById('rating'));
    }

    return (
        <div className="course-sections">
            {loading ? <div>
                {canRate ? <div>
                    <div className="course-info">
                        <p>Your rating {currentRating} </p>
                    </div>
                    <p>Enter a rating</p>
                    <select onChange={handleNewRating} id="rating" name="rating" value={currentRating}>
                        <option value="0">0 (Default)</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </select>

                </div> :
                <div>
                    <h4>You need to login to rate! </h4>
                    <Link to={"/login"}> Login </Link>
                </div>
            }
            </div> : <h1>Loading...</h1>
            }
        </div>
    );
}
