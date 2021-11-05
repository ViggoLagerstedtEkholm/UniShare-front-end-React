import React, {useContext, useState} from "react";
import {validFieldOfStudy} from "../../Shared/RegEx/Degree";
import {validCity, validCountry, validName, validUniversity} from "../../Shared/RegEx/Shared";
import {UploadDegree} from "../../Service/DegreeService";
import {useHistory} from "react-router-dom";
import {UserContext} from "../../Shared/Context/UserContext";

export default function Add() {
    const [name, setName] = useState('SYSTEMVETENSKAP');
    const [fieldOfStudy, setFieldOfStudy] = useState('Informatik');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [country, setCountry] = useState('Sweden');
    const [city, setCity] = useState('City');
    const [university, setUniversity] = useState('University');
    let history = useHistory();
    const {user} = useContext(UserContext);

    const validate = (e) => {
        e.preventDefault();

        const nameError = checkName(name);
        const fieldOfStudyError = checkFieldOfStudy(fieldOfStudy);
        const startDateError = checkBetweenDates(startDate);
        const countryError = checkCountry(country);
        const cityError = checkCity(city);
        const universityError = checkUniversity(university);

        if (!nameError && !fieldOfStudyError && !startDateError && !countryError && !cityError && !universityError) {
            onSubmit();
        }
    }

    const onSubmit = () => {
        const formData = new FormData();
        formData.append('Name', name);
        formData.append('Field', fieldOfStudy);
        formData.append('StartDate', startDate);
        formData.append('EndDate', endDate);
        formData.append('Country', country);
        formData.append('City', city);
        formData.append('University', university);

        UploadDegree(formData).then(() => history.push('/profile/' + user.Username)).catch(() => alert('Something went wrong!'));
    }

    const checkName = (name) => {
        let error;
        if (!validName.test(name)) {
            error = true;
            document.getElementById("name").style.background = "rgb(250,138,131)";
        } else {
            error = false;
            document.getElementById("name").style.background = "white";
        }
        return error;
    }

    const checkFieldOfStudy = (field) => {
        let error;
        if (!validFieldOfStudy.test(field)) {
            error = true;
            document.getElementById("field").style.background = "rgb(250,138,131)";
        } else {
            error = false;
            document.getElementById("field").style.background = "white";
        }
        return error;
    }

    const checkBetweenDates = (date1, date2) => {
        let error;
        if (Date.parse(date1) > Date.parse(date2) || (date1 === "" || date2 === "")) {
            error = true;
            document.getElementById('dates').style.border = "5px solid red";
        } else {
            console.log("No border?");
            error = false;
            document.getElementById('dates').style.border = "none";
        }
        return error;
    }

    const checkCountry = (country) => {
        let error;
        if (!validCountry.test(country)) {
            error = true;
            document.getElementById("country").style.background = "rgb(250,138,131)";
        } else {
            error = false;
            document.getElementById("country").style.background = "white";
        }
        return error;
    }

    const checkCity = (city) => {
        let error;
        if (!validCity.test(city)) {
            error = true;
            document.getElementById("city").style.background = "rgb(250,138,131)";
        } else {
            error = false;
            document.getElementById("city").style.background = "white";
        }
        return error;
    }

    const checkUniversity = (university) => {
        let error;
        if (!validUniversity.test(university)) {
            error = true;
            document.getElementById("university").style.background = "rgb(250,138,131)";
        } else {
            error = false;
            document.getElementById("university").style.background = "white";
        }
        return error;
    }

    return (
        <div className="container">
            <div className="title-bar">
                <form onSubmit={validate}>
                    <h4>
                        Degree name
                    </h4>
                    <input id="name" className="user-input-text" type="text" placeholder="Degree name"
                           value={name}
                           onChange={(e) => {
                               setName(e.target.value);
                               checkName(e.target.value);
                           }}/>
                    <h4>
                        Field of study
                    </h4>
                    <input id="field" className="user-input-text" type="text"
                           placeholder="Field of study" value={fieldOfStudy}
                           onChange={(e) => {
                               setFieldOfStudy(e.target.value);
                               checkFieldOfStudy(e.target.value);
                           }}
                    />

                    <div id="dates">
                        <h4>
                            Start date
                        </h4>
                        <input className="user-input-text" type="date" value={startDate}
                               onChange={(e) => {
                                   setStartDate(e.target.value);
                                   checkBetweenDates(e.target.value, startDate);
                               }}
                        />
                        <h4>
                            End date
                        </h4>
                        <input className="user-input-text" type="date" value={endDate}
                               onChange={(e) => {
                                   setEndDate(e.target.value);
                                   checkBetweenDates(startDate, e.target.value);
                               }}
                        />
                    </div>

                    <h4>
                        Country
                    </h4>
                    <input id="country" className="user-input-text" type="text" placeholder="Country"
                           value={country}
                           onChange={(e) => {
                               setCountry(e.target.value);
                               checkCountry(e.target.value);
                           }}
                    />

                    <h4>
                        City
                    </h4>
                    <input id="city" className="user-input-text" type="text" placeholder="City"
                           value={city}
                           onChange={(e) => {
                               setCity(e.target.value);
                               checkCity(e.target.value);
                           }}
                    />
                    <h4>
                        University
                    </h4>
                    <input id="university" className="user-input-text" type="text"
                           placeholder="University" value={university}
                           onChange={(e) => {
                               setUniversity(e.target.value);
                               checkUniversity(e.target.value);
                           }}
                    />

                    <p>
                        <input className="button-style-1" type="submit"
                               name="submit_project" value="Upload"/>
                    </p>
                </form>
            </div>
        </div>
    );
}