import {Link} from "react-router-dom";
import {getHighlightedText} from "../../Shared/HighLightText";
import {NoResults} from "../../Shared/Search/NoResults";
import DefaultImage from "../../../images/CourseDefault.png";
import {useContext} from "react";
import {UserContext} from "../../Shared/Context/UserContext";
import {ToggleCourseToDegree} from "../../Service/CourseService";

export const CourseBox = ({results, filter}) => {
    const path = results['courses'];
    let searchWord = filter['Search'] ?? "";

    const {user} = useContext(UserContext);

    if(path.length === 0){
        return (<NoResults/>)
    }

    return path.map(function (data, index) {
        const name = data['name'];
        const credits = data['credits'];
        const university = data['university'];
        const country = data['country'];
        const rating = data['rating'] === 0 ? 'Not set!' : data['rating'];
        const city = data['city'];

        const addedDate = new Date(data['added']);
        const daysSeen = addedDate.toDateString();
        const timeSeen = addedDate.toTimeString();
        const added = daysSeen + ", " + timeSeen;

        const courseID = data['id'];
        const code = data['code'];
        const link = data['link'];
        const inActiveDegree = data['inActiveDegree'];

        const toggleToActiveDegree = async (e) => {
            e.preventDefault();
            ToggleCourseToDegree(courseID).then(wasInserted => {
                if (wasInserted) {
                    document.getElementById(courseID).innerText = "REMOVE from degree";
                    document.getElementById(courseID).classList.remove("button-style-3");
                    document.getElementById(courseID).classList.add("button-style-2");
                }
                if (!wasInserted) {
                    document.getElementById(courseID).innerText = "ADD to degree";
                    document.getElementById(courseID).classList.remove("button-style-2");
                    document.getElementById(courseID).classList.add("button-style-3");
                }
            }).catch(() =>{
                if (window.confirm("You do not have an active degree, do you want to add a new degree?")) {

                }
            });
        }

        return (
            <div key={index} className="content-card-body">
                <div className="card-info">
                    <div className="content-card-image">
                        <img src={DefaultImage} alt="USER"/>
                    </div>

                    <div className="content-card-info responsive-text">
                        <h4><b>Course information</b></h4>
                        <p><b>Name:</b> {getHighlightedText(name, searchWord)}</p>
                        <p><b>Credits:</b> {getHighlightedText(credits, searchWord)}</p>
                        <p><b>University: </b> {getHighlightedText(university, searchWord)}</p>
                        <p><b>Code: </b> {getHighlightedText(code, searchWord)}</p>

                    </div>

                    <div className="content-card-info responsive-text">
                        <h4><b>More</b></h4>
                        <p><b>Country:</b> {getHighlightedText(country, searchWord)}</p>
                        <p><b>City:</b> {getHighlightedText(city, searchWord)}</p>
                        <p><b>Added:</b> {getHighlightedText(added, searchWord)}</p>
                        <p><b>Rating:</b> {getHighlightedText(rating, searchWord)}</p>

                    </div>

                    <div className="content-card-info responsive-text">
                        <h4><b>LINK</b></h4>
                        <a href={link} target="popup"><p><b>Link:</b> {getHighlightedText(link, searchWord)}</p></a>
                    </div>

                    <div className="degree-courses-buttons">
                        {user ? <>
                            {inActiveDegree ?
                                <button id={courseID} className="button-style-2" onClick={toggleToActiveDegree}>REMOVE from degree</button> :
                                <button id={courseID} className="button-style-3" onClick={toggleToActiveDegree}>ADD to degree</button>
                            }
                        </> : null}

                        <Link className="button-style-1" to={"/courses/" + courseID}>Go to course</Link>

                        {
                            user !== null && user.role === "Admin" ?
                                <Link className="button-style-4" to={"/courses/request/update/" + courseID}>Update</Link>
                                : null
                        }
                    </div>
                </div>
            </div>
        )
    });
}
