import {useContext, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {CourseContext} from "../../Shared/Context/CourseContext";
import {UserContext} from "../../Shared/Context/UserContext";
import {Loading} from "../../Shared/State/Loading";
import {GetRating, SetRating} from "../../Service/CourseService";

export const Rating = () => {
    const [currentRating, setCurrentRating] = useState(0);
    const [loading, setIsLoaded] = useState(false);
    const {user} = useContext(UserContext);
    const {courseID} = useContext(CourseContext);

    useEffect(() => {
        GetRating(courseID).then((response) => {
            setCurrentRating(response);
            setIsLoaded(true)
        }).catch(() =>{
            setIsLoaded(true)
        });
    }, [])

    const setRate = (e) => {
        const newRating = e.target.value;
        setCurrentRating(newRating);
        SetRating(courseID, newRating).then((response) =>{
            console.log(response);
        });
    }

    return (
        <div className="course-sections course-shadow">
            {loading ? <div>
                {user ? <div>
                    <div className="course-info">
                        <p>Your rating {currentRating} </p>
                    </div>
                    <p>Enter a rating</p>
                    <select onChange={setRate} id="rating" name="rating" value={currentRating}>
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
            </div> : <Loading/>
            }
        </div>
    );
}
