import axios from "axios";
import querystring from "querystring";
import {useContext} from "react";
import {UserContext} from "../../Shared/Context/UserContext";
import {ProfileContext} from "../../Shared/Context/ProfileContext";
import {API} from "../../Shared/Constants";
import courseImage from '../../../images/books.png';

export const DegreeCourse = (course) => {
    const {user} = useContext(UserContext);
    const {profileID} = useContext(ProfileContext);

    console.log("Course: ", course.course);

    return course.course.map(function (data) {
        const courseID = data['courseID'];
        const credits = data['credits'];
        const degreeID = data['degreeID'];
        const name = data['name'];
        const university = data['university'];

        let canSeeProfileEdits = false;
        if(user !== null){
            const currentLoggedIn = user['userID'];
            if (currentLoggedIn === profileID) {
                canSeeProfileEdits = true;
            }
        }

        const onDelete = async (e) => {
            e.preventDefault();

            const params = {
                courseID: courseID,
                degreeID: degreeID
            }

            await axios.post(API + "/profile/delete/course", querystring.stringify(params), { withCredentials: true }).then(response => {
                console.log(response);
                    document.getElementById(courseID).remove();
                }
            )
            .catch((error) => {
                console.log(error);
                alert('Error!');
            });
        }

        return (
            <div id={courseID} className="course-profile">
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
                                <form action={"/courses/" + courseID}>
                                    <button className="button-style-1" type="submit">
                                        Go to course page
                                    </button>
                                </form>

                                {
                                    canSeeProfileEdits ?
                                        <form onSubmit={onDelete}>
                                            <button className="button-style-2" type="submit">
                                                Remove course from degree
                                            </button>
                                        </form>
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