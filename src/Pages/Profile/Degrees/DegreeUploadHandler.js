import axios from "axios";
import React, {useContext, useEffect, useState} from "react";
import {UserContext} from "../../Shared/Context/UserContext";
import {API} from "../../Shared/Constants";
import Message from "../../Shared/Files/Message";
import {validFieldOfStudy} from "../../Shared/RegEx/Degree";
import {validCity, validCountry, validName, validUniversity} from "../../Shared/RegEx/Shared";

function DegreeUploadHandler(props) {
    const [name, setName] = useState('');
    const [fieldOfStudy, setFieldOfStudy] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [university, setUniversity] = useState('');

    const [message, setMessage] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const degreeID = props.match.params.degreeID;

    const {user} = useContext(UserContext);

    useEffect(() => {
        if(degreeID){
            const getDegree = async () => {
                await axios.get(API + "/degree/get", {
                    params: {
                        degreeID: degreeID
                    },
                    withCredentials: true
                }).then(
                    response => {
                        console.log(response);
                        const data = response.data['data']['degree'];
                        setCity(data['city']);
                        setCountry(data['country']);
                        setEndDate(data['end_date']);
                        setFieldOfStudy(data['fieldOfStudy']);
                        setName(data['name']);
                        setStartDate(data['start_date']);
                        setUniversity(data['university']);

                    }
                )
                .catch((error) => {
                    console.log(error);
                    props.history.push("/");
                });
            }

            getDegree().then(() => setIsLoaded(true));
        }else{
            setIsLoaded(true);
        }
    }, []);

    const validate = (e) =>{
        e.preventDefault();

        const nameError = checkName(name);
        const fieldOfStudyError = checkFieldOfStudy(fieldOfStudy);
        const startDateError = checkBetweenDates(startDate);
        const countryError = checkCountry(country);
        const cityError = checkCity(city);
        const universityError = checkUniversity(university);

        if(!nameError && !fieldOfStudyError && !startDateError && !countryError && !cityError && !universityError){
            onSubmit();
        }
    }

    const onSubmit = () => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('field_of_study', fieldOfStudy);
        formData.append('start_date', startDate);
        formData.append('end_date', endDate);
        formData.append('country', country);
        formData.append('city', city);
        formData.append('university', university);

        if(degreeID){
            formData.append('degreeID', degreeID);
        }

        if(degreeID){
            axios.post(API + "/degree/update", formData, {withCredentials: true}).then(() => {
                const path = "/profile/" + user["userID"];
                props.history.push(path);
            }).catch(error => {
                const response = error.response.data;
                const message = response.join(' , ');
                setMessage(message);
            });
        }else{
            axios.post(API + "/degree/upload", formData, {withCredentials: true}).then(() => {
                const path = "/profile/" + user["userID"];
                props.history.push(path);
            }).catch(error => {
                const response = error.response.data;
                const message = response.join(' , ');
                setMessage(message);
            });
        }
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

    const checkBetweenDates = (date1, date2) =>{
        let error;
        if(Date.parse(date1) > Date.parse(date2)|| (date1 === "" || date2 === "" )){
            error = true;
            document.getElementById('dates').style.border = "5px solid red";
        }else{
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
                {
                    degreeID ? <h2>Update degree</h2> : <h2>Add degree</h2>
                }
                <hr/>

                <div className="user-input-form-box">
                    {message ? <Message msg={message}/> : null}

                    {isLoaded ?     <form onSubmit={validate}>
                        <h4>
                            Degree name
                        </h4>
                        <input id="name" className="user-input-text" type="text" placeholder="Degree name" value={name}
                               onChange={(e) =>{
                                   setName(e.target.value);
                                   checkName(e.target.value);
                               }}/>
                        <h4>
                            Field of study
                        </h4>
                        <input id="field" className="user-input-text" type="text" placeholder="Field of study" value={fieldOfStudy}
                               onChange={(e) =>{
                                   setFieldOfStudy(e.target.value);
                                   checkFieldOfStudy(e.target.value);
                               }}
                        />

                        <div id="dates">
                            <h4>
                                Start date
                            </h4>
                            <input className="user-input-text" type="date" value={startDate}
                                   onChange={(e) =>{
                                       setStartDate(e.target.value);
                                       checkBetweenDates(e.target.value, startDate);
                                   }}
                            />
                            <h4>
                                End date
                            </h4>
                            <input className="user-input-text" type="date" value={endDate}
                                   onChange={(e) =>{
                                       setEndDate(e.target.value);
                                       checkBetweenDates(startDate, e.target.value);
                                   }}
                            />
                        </div>

                        <h4>
                            Country
                        </h4>
                        <input id="country" className="user-input-text" type="text" placeholder="Country" value={country}
                               onChange={(e) =>{
                                   setCountry(e.target.value);
                                   checkCountry(e.target.value);
                               }}
                        />

                        <h4>
                            City
                        </h4>
                        <input id="city" className="user-input-text" type="text" placeholder="City" value={city}
                               onChange={(e) =>{
                                   setCity(e.target.value);
                                   checkCity(e.target.value);
                               }}
                        />
                        <h4>
                            University
                        </h4>
                        <input id="university" className="user-input-text" type="text" placeholder="University" value={university}
                               onChange={(e) =>{
                                   setUniversity(e.target.value);
                                   checkUniversity(e.target.value);
                               }}
                        />

                        <p>
                            <input className="button-style-1" type="submit"
                                   name="submit_project" value="Upload"/>
                        </p>
                    </form>: <h4>Loading degree...</h4>}
                </div>
        </div>
    );
}

export default DegreeUploadHandler;
