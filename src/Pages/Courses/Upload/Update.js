import React, {useEffect, useState} from "react";
import {validCode} from "../../Shared/RegEx/Courses";
import {
    validCity,
    validCountry,
    validDescription,
    validName,
    validUniversity,
    validURL
} from "../../Shared/RegEx/Shared";
import NotFound from "../../../../../unishare/src/Pages/Shared/Error/NotFound";
import {Loading} from "../../Shared/State/Loading";
import {CheckIfCourseExists, UpdateCourse} from "../../Service/CourseService";
import Message from "../../Shared/Files/Message";
import {useParams} from "react-router-dom";

export default function Update() {
    const [name, setName] = useState();
    const [credits, setCredits] = useState();
    const [country, setCountry] = useState();
    const [city, setCity] = useState();
    const [university, setUniversity] = useState();
    const [description, setDescription] = useState();
    const [code, setCode] = useState();
    const [link, setLink] = useState();
    const [message, setMessage] = useState();

    const [isLoaded, setIsLoaded] = useState(false);
    const [courseExists, setCourseExists] = useState(false);

    const {ID} = useParams();

    useEffect(() => {
        if(ID){
            CheckIfCourseExists(ID).then((response) => {
                if (response) {
                    setName(response['name']);
                    setCredits(response['credits']);
                    setCountry(response['country']);
                    setCity(response['city']);
                    setUniversity(response['university']);
                    setDescription(response['description']);
                    setCode(response['code']);
                    setLink(response['link']);

                    setCourseExists(true);
                }
                setIsLoaded(true);
            });
        }else{
            setIsLoaded(true);
        }
    }, [ID]);

    const validate = (e) =>{
        e.preventDefault();

        const nameError = checkName(e.target.name.value);
        const countryError = checkCountry(e.target.country.value);
        const cityError = checkCity(e.target.city.value);
        const universityError = checkUniversity(e.target.university.value);
        const descriptionError = checkDescription(e.target.description.value);
        const codeError = checkCode(e.target.code.value);
        const linkError = checkLink(e.target.link.value);

        if(!linkError && !codeError && !nameError && !countryError && !cityError && !universityError && !descriptionError){
            uploadRequest();
        }
    }

    const uploadRequest = () => {
        const request = {
            Name : name,
            Credits : credits,
            Country : country,
            City : city,
            University : university,
            Description : description,
            Code : code,
            Link : link,
            CourseID : ID
        }

        if(courseExists){
            UpdateCourse(request).then(() => window.location.reload()).catch(error => {
                setMessage(error.response.data.title);
                alert(error.response.data.title);
            });
        }
    }

    const checkLink = (link) =>{
        let error;
        if (!validURL.test(link)) {
            error = true;
            document.getElementById("link").style.background = "rgb(250,138,131)";
        } else {
            error = false;
            document.getElementById("link").style.background = "white";
        }
        return error;
    }

    const checkCode = (code) => {
        let error;
        if (!validCode.test(code)) {
            error = true;
            document.getElementById("code").style.background = "rgb(250,138,131)";
        } else {
            error = false;
            document.getElementById("code").style.background = "white";
        }
        return error;
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

    const checkDescription = (description) => {
        let error;
        if (!validDescription.test(description)) {
            error = true;
            document.getElementById("description").style.background = "rgb(250,138,131)";
        } else {
            error = false;
            document.getElementById("description").style.background = "white";
        }
        return error;
    }

    return (
        <div className="container">
            {isLoaded ?
                <div>
                    {
                        courseExists || !ID ?
                            <div className="title-bar">
                                {message ? <Message msg={message}/> : null}

                                {
                                    ID ? <h2>Update course</h2> : <h2>Add course</h2>
                                }

                                <hr/>

                                <form onSubmit={validate}>
                                    <h4 className="information">Between 1 and 300 characters allowed</h4>
                                    <input id="name" className="user-input-text" type="text" name="name" placeholder="Course name"
                                           value={name}
                                           onChange={(e) =>{
                                               setName(e.target.value);
                                               checkName(e.target.value);
                                           }}
                                    />
                                    <h4 className="information">Whole numbers and decimal numbers allowed, example: 7.5, 15.0, 30</h4>
                                    <input id="credits" className="user-input-text" type="float" name="credits" placeholder="Credits"
                                           value={credits}
                                           onChange={(e) =>{
                                               setCredits(e.target.value);
                                           }}
                                    />
                                    <h4 className="information">Between 1 and 56 characters allowed</h4>
                                    <input id="country" className="user-input-text" type="text" name="country" placeholder="Country"
                                           value={country}
                                           onChange={(e) =>{
                                               setCountry(e.target.value);
                                               checkCountry(e.target.value);
                                           }}
                                    />
                                    <h4 className="information">Between 1 and 120 characters allowed</h4>
                                    <input id="city" className="user-input-text" type="text" name="city" placeholder="City"
                                           value={city}
                                           onChange={(e) =>{
                                               setCity(e.target.value);
                                               checkCity(e.target.value);
                                           }}
                                    />
                                    <h4 className="information">Between 1 and 100 characters allowed</h4>
                                    <input id="university" className="user-input-text" type="text" name="university" placeholder="@University"
                                           value={university}
                                           onChange={(e) =>{
                                               setUniversity(e.target.value);
                                               checkUniversity(e.target.value);
                                           }}
                                    />
                                    <h4 className="information">Between 1 and 20 characters allowed.</h4>
                                    <input id="code" className="user-input-text" type="text" name="code" placeholder="Code"
                                           value={code}
                                           onChange={(e) =>{
                                               setCode(e.target.value);
                                               checkCode(e.target.value);
                                           }}
                                    />
                                    <h4 className="information">Only valid links allowed.</h4>
                                    <input id="link" className="user-input-text" type="text" name="link" placeholder="Link"
                                           value={link}
                                           onChange={(e) =>{
                                               setLink(e.target.value);
                                               checkLink(e.target.value);
                                           }}
                                    />

                                    <h4 className="information">Between 1 and 5000 characters allowed</h4>
                                    <textarea id="description" className="text-area" name="description" placeholder="Enter description"
                                              value={description}
                                              onChange={(e) =>{
                                                  setDescription(e.target.value);
                                                  checkDescription(e.target.value);
                                              }}
                                    />
                                    <p>
                                        <input className="button-style-1" type="submit" value="Upload"/>
                                    </p>
                                </form>
                            </div> : <NotFound/>
                    }
                </div> : <Loading/>}
        </div>
    );
}