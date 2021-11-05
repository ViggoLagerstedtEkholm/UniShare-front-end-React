import {DegreeCourse} from "./DegreeCourses";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "../../Shared/Context/UserContext";
import {ProfileContext} from "../../Shared/Context/ProfileContext";
import {API} from "../../Shared/Constants";
import {NoResults} from "../../Shared/Search/NoResults";
import {Link} from "react-router-dom";
import api from "../../Service/api";
import {Loading} from "../../Shared/State/Loading";
import {GetDegrees} from "../../Service/DegreeService";
import {CanSeeEdits} from "../../Service/UserService";

export const DegreesBox = () => {
    const {user} = useContext(UserContext);
    const {profileID} = useContext(ProfileContext);

    const [data, setData] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [totalCredits, setTotalCredits] = useState(0);


    useEffect(() => {
        {}
        GetDegrees(profileID).then(response => {
            setData(response);
            setIsLoaded(true);
        });
    }, []);

    return(
        <div>
            {isLoaded ? renderResults() : <Loading/>}
        </div>
    );

    function renderResults(){
        if(data.length === 0){
            return (<NoResults/>)
        }

        return data.map(function (data) {
            const degree = data['degree'];
            const ID = degree['id'];
            const city = degree['city'];
            const country = degree['country'];
            const field_of_study = degree['field'];
            const name = degree['name'];

            const endDate = new Date(degree['endDate']).toDateString();
            const startDate = new Date(degree['startDate']).toDateString();

            const totalCredits = data['totalCredits'];
            const university = degree['university'];
            const courses = data['courses'];
            const isActive = data['isActiveDegree'];

            const onDelete = async () => {
                if (window.confirm("Do you want to delete this degree?")) {
                    await api.post(API + "/api/Degree/delete/" + ID).then(response => {
                            console.log(response);
                            document.getElementById(ID).remove();
                        }
                    )
                        .catch((error) => {
                            console.log(error);
                            alert('Error!');
                        });
                }
            }

            return (
                <div id={ID} className="degree-box">
                    <div className="degree-info-panel">
                        <div className="responsive-text">
                            {
                                isActive ? <h1>Active degree</h1>:null
                            }

                            <div className="capitalize">
                                <h2>{name}</h2>
                            </div>

                            <hr/>

                            <p><b>University: </b> {university}</p>
                            <p><b>Country: </b> {country}</p>
                            <p><b>City: </b> {city}</p>
                            <p><b>Field of study: </b> {field_of_study}</p>
                            <p><b>Between: </b> {startDate} - {endDate}</p>
                            <p><b>Sum total credits: </b> {totalCredits} hp</p>
                        </div>

                        {CanSeeEdits(profileID, user) ?
                            <div>
                                <form action={"/degree/edit/" + ID}>
                                    <button className="button-style-4">Edit degree</button>
                                </form>

                                <button className="button-style-2" onClick={onDelete}>Delete degree </button>

                                <h3>Included courses</h3>
                                <Link to={"/search/courses"}>Add courses to degree</Link>
                            </div>: null}
                    </div>

                    <DegreeCourse course={courses}/>
                </div>
            );
        });
    }
}