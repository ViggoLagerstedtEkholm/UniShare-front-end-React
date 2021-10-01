import axios from "axios";
import querystring from "querystring";
import {useContext} from "react";
import {UserContext} from "../../Shared/Context/UserContext";
import courseImage from '../../../images/books.png';
import {useHistory} from "react-router-dom";

export const CourseBox = ({results, filter}) => {
    let history = useHistory();
    const {user} = useContext(UserContext);
    console.log(results);

    const path = results['courses'];
    let searchWord = filter['search'] ?? "";

    if(path.length === 0){
        return (<div><h4 className="review">No course results!</h4></div>)
    }

    return path.map(function (data) {
        const name = data['name'];
        const credits = data['credits'];
        const duration = data['duration'];
        const university = data['university'];
        const country = data['country'];
        const rating = data['average_rating'] == null ? 'Not set!': data['average_rating'];
        const city = data['city'];
        const added = data['added'];
        const courseID = data['courseID'];
        let isInActiveDegree = data['isInActiveDegree'];
        const code = data['code'];
        console.log("Code" + code);

        let canSeeLoggedInFeatures = true;
        if(user == null){
            canSeeLoggedInFeatures = false;
        }

        let isAdmin = false;
        if (user != null) {
            if (user.privilege === 'Admin') {
                isAdmin = true;
            }
        }

        const toggleToActiveDegree = async (e) => {
            e.preventDefault();

            const params = {
                courseID: courseID
            }

            const config = {
                headers: {
                    'Accept': 'application/json'
                }
            };

            await axios.post("/degree/toggle/course", querystring.stringify(params), config).then(response => {
                    const status = response["data"]["data"]["Status"];

                    console.log(response["data"]["data"]["Status"]);

                    if (status === 'Inserted') {
                        document.getElementById(courseID).innerText = "REMOVE from degree";
                        document.getElementById(courseID).classList.remove("button-style-3");
                        document.getElementById(courseID).classList.add("button-style-2");
                    }
                    if (status === 'Deleted') {
                        document.getElementById(courseID).innerText = "ADD to degree";
                        document.getElementById(courseID).classList.remove("button-style-2");
                        document.getElementById(courseID).classList.add("button-style-3");
                    }
                }
            )
            .catch((error) => {
                if (error.response.status === 500) {
                    if(window.confirm('You dont have an active degree go to settings?')){
                        history.push("/settings");
                    }
                }
            });
        }

        const getHighlightedText = (text, highlight) =>{
            highlight = highlight.toString();
            const parts = text.toString().split(new RegExp(`(${highlight})`, 'gi'));
            return <span> { parts.map((part, i) =>
                <span key={i} style={part.toLowerCase() === highlight.toLowerCase() ? { 'background-color': 'rgba(255,234,0,0.59)' } : {} }>
            { part }
        </span>)
            } </span>;
        }

        return (
            <div className="content-card-body">
                <div className="content-user">
                    <div className="content-card-image">
                        <img src={courseImage} alt="USER IMAGE"/>
                    </div>

                    <div className="content-card-info">
                        <h4><b>Course information</b></h4>
                        <p><b>Name:</b> {getHighlightedText(name, searchWord)}</p>
                        <p><b>Credits:</b> {getHighlightedText(credits, searchWord)}</p>
                        <p><b>Duration: </b> {getHighlightedText(duration, searchWord)}</p>
                        <p><b>University: </b> {getHighlightedText(university, searchWord)}</p>
                        <p><b>Code: </b> {getHighlightedText(code, searchWord)}</p>

                    </div>

                    <div className="content-card-info">
                        <h4><b>More</b></h4>
                        <p><b>Score:</b> {getHighlightedText(rating, searchWord)}</p>
                        <p><b>Country:</b> {getHighlightedText(country, searchWord)}</p>
                        <p><b>City:</b> {getHighlightedText(city, searchWord)}</p>
                        <p><b>Added:</b> {getHighlightedText(added, searchWord)}</p>
                    </div>

                    <div className="content-card-info-buttons">
                        {
                            canSeeLoggedInFeatures ?
                                <form onSubmit={toggleToActiveDegree}>
                                    {isInActiveDegree ?
                                        <button id={courseID} className="button-style-2" type="submit">REMOVE from active degree</button>
                                        : <button id={courseID} className="button-style-3" type="submit">ADD to active degree</button>
                                    }
                                </form>

                                : null

                        }
                        <form action={"/courses/" + courseID} >
                            <button className="button-style-1" type="submit">Go to course</button>
                        </form>

                        {isAdmin ? <form action={"/courses/" + courseID} >
                            <button className="button-style-4" type="submit">Update</button>
                        </form> : null}

                    </div>
                </div>
            </div>
        )
    });
}
