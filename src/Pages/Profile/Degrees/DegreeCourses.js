import {useContext} from "react";
import {UserContext} from "../../Shared/Context/UserContext";
import {ProfileContext} from "../../Shared/Context/ProfileContext";
import {Link} from "react-router-dom";
import {RemoveCourseFromDegree} from "../../Service/DegreeService";
import {CanSeeEdits} from "../../Service/UserService";
import courseImage from '../../../images/CourseDefault.png';

export const DegreeCourse = (course) => {
    const {user} = useContext(UserContext);
    const {profileID} = useContext(ProfileContext);

    return course.course.map(function (data) {
        const courseID = data['id'];
        const credits = data['credits'];
        const name = data['name'];
        const university = data['university'];

        return (
            <div id={"course - " + courseID} className="course-profile">
                <div className="content-card-body">
                    <div className="card-info">
                        <div className="content-card-image">
                            <img src={courseImage} alt="USER IMAGE"/>
                        </div>

                        <div className="content-card-info responsive-text">
                            <p><b>Name: </b>{name}</p>
                            <p><b>Credits: </b>{credits}</p>
                            <p><b>University: </b>{university}</p>
                        </div>

                        <div className="content-card-info-buttons">
                            <div className='degree-courses-buttons'>

                            <Link style={{ textDecoration: 'none' }} className="button-style-1" to={"/courses/" + courseID}>Go to course page</Link>

                            {
                                CanSeeEdits(profileID, user) ?
                                    <button className="button-style-2" type="submit" onClick={() =>{
                                        RemoveCourseFromDegree(courseID).then(() => document.getElementById("course - " + courseID).remove());
                                    }}> Remove course from degree
                                    </button>
                                : null
                            }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    });
}