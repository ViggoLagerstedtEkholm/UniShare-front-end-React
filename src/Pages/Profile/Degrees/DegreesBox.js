import {DegreeCourse} from "./Courses";
import axios from "axios";
import querystring from "querystring";
import {useContext} from "react";
import {UserContext} from "../../Shared/Context/UserContext";
import {ProfileContext} from "../../Shared/Context/ProfileContext";
import {API} from "../../Shared/Constants";
import Collapsible from "react-collapsible";

export const DegreesBox = (attributes) => {
    const {user} = useContext(UserContext);
    const {profileID} = useContext(ProfileContext);

    const path = attributes.attributes.data.degrees;
    if(path.length === 0){
        return (<div><h4 className="review">No degrees found!</h4></div>)
    }

    return path.map(function (data) {
        const ID = data['ID'];
        const city = data['city'];
        const country = data['country'];
        const end_date = data['end_date'];
        const field_of_study = data['field_of_study'];
        const name = data['name'];
        const start_date = data['start_date'];
        const totalCredits = data['totalCredits'];
        const university = data['university'];
        const courses = data['courses'];
        const isActive = data['isActiveDegree'];

        let canSeeProfileEdits = false;
        if(user !== null){
            const currentLoggedIn = user['userID'];
            if (currentLoggedIn === profileID) {
                canSeeProfileEdits = true;
            }
        }

        const onDelete = async () => {
            const params = {
                degreeID: ID
            }

            await axios.post(API + "/degree/remove", querystring.stringify(params), { withCredentials: true }).then(response => {
                    console.log(response);
                    document.getElementById(ID).remove();
                }
            )
            .catch((error) => {
                console.log(error);
                alert('Error!');
            });
        }

        return (
                <div id={ID} className="degree-box">
                    <div className="degree-info-panel">
                        <div className="review-text">
                            {
                                isActive ? <h1>Active degree</h1>:null
                            }
                            <p >Name: {name}</p>

                            <hr/>

                            <p>University: {university}</p>
                            <p>Country: {country}</p>
                            <p>City: {city}</p>
                            <p>Field of study: {field_of_study}</p>
                            <p>Between: {start_date} - {end_date}</p>
                            <p>Sum total credits: {totalCredits} hp</p>
                        </div>

                        {canSeeProfileEdits ?
                            <div>
                                <form action={"/degree/edit/" + ID}>
                                    <button className="button-style-4">Edit degree</button>
                                </form>

                                <button className="button-style-2" onClick={onDelete}>Delete degree </button>

                                <h3>Included courses</h3>
                                <a href="/search/courses">Add courses to degree</a>
                            </div>: null}
                    </div>

                    <DegreeCourse course={courses}/>
                </div>
        );
    });
}