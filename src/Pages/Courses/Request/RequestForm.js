import axios from "axios";
import {API} from "../../Shared/Constants";
import {useState} from "react";
import {validCredits} from "../../Shared/RegEx/RequestCourse";
import {validCity, validCountry, validDescription, validName, validUniversity} from "../../Shared/RegEx/Shared";

export function RequestForm() {
    const [name, setName] = useState('');
    const [credits, setCredits] = useState();
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [university, setUniversity] = useState('');
    const [description, setDescription] = useState('');

    const validate = (e) =>{
        e.preventDefault();

        const nameError = checkName(e.target.name.value);
        const creditsError = checkCredits(e.target.credits.value);
        const countryError = checkCountry(e.target.country.value);
        const cityError = checkCity(e.target.city.value);
        const universityError = checkUniversity(e.target.university.value);
        const descriptionError = checkDescription(e.target.description.value);

        console.log(e.target.name.value);
        console.log(e.target.credits.value);
        console.log(e.target.country.value);
        console.log(e.target.city.value);
        console.log(e.target.university.value);
        console.log(e.target.description.value);

        if(!nameError && !creditsError && !countryError && !cityError && !universityError && !descriptionError){
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

        axios.post(API + "/request/upload", formData, { withCredentials: true }).then(response => {
            console.log(response);
            //window.location.reload();
        }).catch(error => {
            console.log(error);
        });
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
        <div className="user-input-form-box">
            <h3> Enter course</h3>
            <form onSubmit={validate}>
                <input id="name" className="user-input-text" type="text" name="name" placeholder="Course name"
                       value={name}
                       onChange={(e) =>{
                           setName(e.target.value);
                           checkName(e.target.value);
                       }}
                />
                <input id="credits" className="user-input-text" type="number" name="credits" placeholder="Credits"
                       value={credits}
                       onChange={(e) =>{
                           setCredits(e.target.value);
                           checkCredits(e.target.value);
                       }}
                />
                <input id="country" className="user-input-text" type="text" name="country" placeholder="Country"
                        value={country}
                        onChange={(e) =>{
                            setCountry(e.target.value);
                            checkCountry(e.target.value);
                        }}
                />
                <input id="city" className="user-input-text" type="text" name="city" placeholder="City"
                        value={city}
                        onChange={(e) =>{
                            setCity(e.target.value);
                            checkCity(e.target.value);
                        }}
                />
                <input id="university" className="user-input-text" type="text" name="university" placeholder="@University"
                        value={university}
                        onChange={(e) =>{
                            setUniversity(e.target.value);
                            checkUniversity(e.target.value);
                        }}
                />
                <textarea id="description" className="user-input-text" name="description" placeholder="Enter description"
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
        </div>
    );
}