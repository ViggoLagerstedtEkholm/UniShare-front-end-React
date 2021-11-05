import {useEffect, useState} from "react";
import Collapsible from "react-collapsible";
import {
    validAge,
    validDescription,
    validEmail,
    validFirstname,
    validLastname,
    validUsername
} from "../Shared/RegEx/User";
import {Loading} from "../Shared/State/Loading";
import {GetAccountSettings, UpdateAccount} from "../Service/SettingsService";

export function Account() {
    const [username, setUsername] = useState('');
    const [firstName, setFistName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState();
    const [description, setDescription] = useState('');
    const [updated, setUpdated] = useState('');

    const [isLoaded, setIsLoaded] = useState(false);

    const [isSubmitLoading, setSubmitLoading] = useState(false);

    useEffect( () => {
        GetAccountSettings().then(response => {
            setUsername(response['username']);
            setFistName(response['firstname']);
            setLastName(response['lastname']);
            setEmail(response['email']);
            setAge(response['age']);
            setDescription(response['description']);
            setIsLoaded(true);
        });
    }, [isLoaded])

    const validate = (e) =>{
        e.preventDefault();
        setSubmitLoading(true);

        const firstNameError = checkFirstName(firstName);
        const lastNameError = checkLastName(lastName);
        const descriptionError = checkDescription(description);
        const ageError = checkAge(age);
        const emailError = checkEmail(email);
        const usernameError = checkUsername(username);

        if(!emailError && !usernameError && !ageError && !firstNameError && !lastNameError && !descriptionError)
        {
            doSubmit();
        }
    }

    const doSubmit = () =>{
        const account = {
            Firstname : firstName,
            Lastname : lastName,
            Email : email,
            Username : username,
            Description : description,
            Age : age
        }

        UpdateAccount(account).then(() => {
            setUpdated(true);
            setSubmitLoading(false);
        });
    }

    const checkDescription = (description) =>{
        let error;
        if(!validDescription.test(description)){
            error = true;
            document.getElementById("description").style.background="rgb(250,138,131)";
        }else{
            error = false;
            document.getElementById("description").style.background="white";
        }
        return error;
    }

    const checkLastName = (lastName) =>{
        let error;
        if(!validLastname.test(lastName)){
            error = true;
            document.getElementById("last_name").style.background="rgb(250,138,131)";
        }else{
            error = false;
            document.getElementById("last_name").style.background="white";
        }
        return error;
    }

    const checkFirstName = (firstName) =>{
        let error;
        if(!validFirstname.test(firstName)){
            error = true;
            document.getElementById("first_name").style.background="rgb(250,138,131)";
        }else{
            error = false;
            document.getElementById("first_name").style.background="white";
        }
        return error;
    }

    const checkEmail = (email) =>{
        let error;
        if(!validEmail.test(email)){
            error = true;
            document.getElementById("email").style.background="rgb(250,138,131)";
        }else{
            error = false;
            document.getElementById("email").style.background="white";
        }
        return error;
    }

    const checkUsername = (username) =>{
        let error;
        if(!validUsername.test(username)){
            error = true;
            document.getElementById("username").style.background="rgb(250,138,131)";
        }else{
            error = false;
            document.getElementById("username").style.background="white";
        }
        return error;
    }

    const checkAge = (age) =>{
        let error;
        if(!validAge.test(age)){
            error = true;
            document.getElementById("age").style.background="rgb(250,138,131)";
        }else{
            error = false;
            document.getElementById("age").style.background="white";
        }
        return error;
    }
    return (
        <Collapsible open={true} trigger="General Settings">
            {updated ?<div className="information">
                <h4 className="success">Updated</h4>
            </div> : null}
            <hr/>

            {isSubmitLoading ? <Loading/> : null}

            <form onSubmit={validate}>
                <p>
                    Username
                    <input id="username" className="user-input-text" type="text" placeholder="Display name" value={username}
                           onChange={(e) =>{
                               setUsername(e.target.value);
                               setUpdated(false);
                               checkUsername(e.target.value);
                           }}
                    />
                </p>
                <p>
                    First name
                    <input id="first_name" className="user-input-text" type="text" placeholder="First name" value={firstName}
                           onChange={(e) =>{
                               setFistName(e.target.value);
                               setUpdated(false);
                               checkFirstName(e.target.value);
                           }}
                    />
                </p>
                <p>
                    Last name
                    <input id="last_name" className="user-input-text" type="text" placeholder="Last name" value={lastName}
                           onChange={(e) =>{
                               setLastName(e.target.value);
                               setUpdated(false);
                               checkLastName(e.target.value);
                           }}
                    />
                </p>
                <p>
                    Email
                    <input id="email" className="user-input-text" type="text" placeholder="Email" value={email} disabled
                           onChange={(e) =>{
                               setEmail(e.target.value);
                               setUpdated(false);
                               checkEmail(e.target.value);
                           }}
                    />
                </p>
                <p>
                    Age
                    <input id="age" className="user-input-text" type="text" placeholder="Age" value={age}
                           onChange={(e) =>{
                               setAge(e.target.value);
                               setUpdated(false);
                               checkAge(e.target.value);
                           }}
                    />
                </p>
                <p>
                    Description
                    <textarea id="description" className="user-input-text" placeholder="Enter description" value={description}
                              onChange={(e) =>{
                                  setDescription(e.target.value);
                                  setUpdated(false);
                                  checkDescription(e.target.value);
                              }}
                    />
                </p>

                <button type="submit" className="button-style-1">Update account</button>
            </form>
        </Collapsible>
    );
}