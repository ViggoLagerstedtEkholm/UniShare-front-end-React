import axios from "axios";
import {API} from "../../Shared/Constants";
import {useEffect, useState} from "react";
import {validCode, validCredits} from "../../Shared/RegEx/Courses";
import {
    validCity,
    validCountry,
    validDescription,
    validName,
    validUniversity,
    validURL
} from "../../Shared/RegEx/Shared";
import Message from "../../Shared/Files/Message";
import NotFound from "../../Shared/Error/NotFound";
import {Loading} from "../../Shared/State/Loading";
import {checkIfCourseExists} from "../../Service/CourseService";

export function CourseUploadHandler(props) {
    const [name, setName] = useState('');
    const [credits, setCredits] = useState();
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [university, setUniversity] = useState('');
    const [description, setDescription] = useState('');
    const [code, setCode] = useState('');
    const [link, setLink] = useState('');

    const [isLoaded, setIsLoaded] = useState(false);
    const [courseExists, setCourseExists] = useState(false);

    const [message, setMessage] = useState('');

    let courseID = props.match.params.courseID;

    useEffect(() => {
        if(courseID){
            checkIfCourseExists(courseID).then((response) => {
                console.log(courseID);
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
    }, []);

    const validate = (e) =>{
        e.preventDefault();

        const nameError = checkName(e.target.name.value);
        const creditsError = checkCredits(e.target.credits.value);
        const countryError = checkCountry(e.target.country.value);
        const cityError = checkCity(e.target.city.value);
        const universityError = checkUniversity(e.target.university.value);
        const descriptionError = checkDescription(e.target.description.value);
        const codeError = checkCode(e.target.code.value);
        const linkError = checkLink(e.target.link.value);

        if(!linkError && !codeError && !nameError && !creditsError && !countryError && !cityError && !universityError && !descriptionError){
            uploadRequest();
        }
    }

    const uploadRequest = () => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('credits', credits);
        formData.append('country', country);
        formData.append('city', city);
        formData.append('university', university);
        formData.append('description', description);
        formData.append('code', code);
        formData.append('link', link);

        if(courseID && courseExists){
            formData.append('courseID', courseID);
            axios.post(API + "/admin/course/update", formData, { withCredentials: true }).then(() => {
                window.location.reload();
            }).catch(error => {
                console.log(error.data);
                const response = error.response.data;
                const message = response.join(' , ');
                setMessage(message);
            });
        }else{
            axios.post(API + "/request/upload", formData, { withCredentials: true }).then(() => {
                window.location.reload();
            }).catch(error => {
                console.log(error.data);
                const response = error.response.data;
                const message = response.join(' , ');
                setMessage(message);
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

    const checkCredits = (credits) => {
        let error;
        if (!validCredits.test(credits)) {
            error = true;
            document.getElementById("credits").style.background = "rgb(250,138,131)";
        } else {
            error = false;
            document.getElementById("credits").style.background = "white";
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
                        courseExists || !courseID ?
                            <div className="title-bar">
                                {message ? <Message msg={message}/> : null}

                                {
                                    courseID ? <h2>Update course</h2> : <h2>Add course</h2>
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
                                               checkCredits(e.target.value);
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