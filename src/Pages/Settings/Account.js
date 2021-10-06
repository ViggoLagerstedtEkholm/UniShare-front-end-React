import {useEffect, useState} from "react";
import Collapsible from "react-collapsible";
import {
    validDescription,
    validEmail,
    validFirstname,
    validLastname,
    validUsername
} from "../Shared/RegEx/User";
import axios from "axios";
import {API} from "../Shared/Constants";
import Message from "../Shared/Files/Message";

export function Account() {
    const [username, setUsername] = useState('');
    const [firstName, setFistName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [description, setDescription] = useState('');
    const [message, setMessage] = useState('');
    const [updated, setUpdated] = useState('');

    const [emailIsAvailable, setEmailIsAvailable] = useState(true);
    const [usernameIsAvailable, setUsernameIsAvailable] = useState(true);

    const [isLoaded, setIsLoaded] = useState(false);

    useEffect( () => {
        getAccountSettings().then(() => setIsLoaded(true));
    }, [isLoaded])

    const getAccountSettings = async () => {
        await axios.get(API + "/settings/get", {withCredentials: true}).then(response => {
            const settings = response.data;
            setUsername(settings['display_name']);
            setFistName(settings['first_name']);
            setLastName(settings['last_name']);
            setEmail(settings['email']);
            setDescription(settings['description']);
        }).catch(error => {
            console.log(error);
        });
    }

    const validate = (e) =>{
        e.preventDefault();

        const firstNameError = checkFirstName(firstName);
        const lastNameError = checkLastName(lastName);
        checkEmail(email);
        const descriptionError = checkDescription(description);
        checkUsername(username);

        if(emailIsAvailable && !firstNameError && !lastNameError && usernameIsAvailable && !descriptionError)
        {
            doSubmit();
        }
    }

    const doSubmit = () =>{
        const formData = new FormData();
        formData.append('first_name', firstName);
        formData.append('last_name', lastName);
        formData.append('email', email);
        formData.append('display_name', username);
        formData.append('description', description);

        axios.post(API + "/settings/update/account", formData, {withCredentials: true}).then(response => {
            setUpdated(true);
            console.log(response);
        }).catch(error => {
            setMessage(error.response);
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
        if(!validEmail.test(email)){
            document.getElementById("email").style.background="rgb(250,138,131)";
        }else{
            checkEmailAvailable(email);
        }
    }

    const checkEmailAvailable = (email) => {
        const formData = new FormData();
        formData.append('email', email);

        axios.post(API + "/settings/check/email/available", formData, {withCredentials: true}).then(response => {
            setEmailIsAvailable(response.data);

            //Available
            if(response.data){
                document.getElementById("email").style.background="white";
            }else{
                document.getElementById("email").style.background="rgb(250,138,131)";
            }
        });
    }

    const checkUsername = (username) =>{
        if(!validUsername.test(username)){
            document.getElementById("username").style.background="rgb(250,138,131)";
        }else{
            checkUsernameAvailable(username);
        }
    }

    const checkUsernameAvailable = (username) =>{
        const formData = new FormData();
        formData.append('display_name', username);

        axios.post(API + "/settings/check/username/available", formData, {withCredentials: true}).then(response => {
            setUsernameIsAvailable(response.data);
            //Available
            if(response.data){
                document.getElementById("username").style.background="white";
            }else{
                document.getElementById("username").style.background="rgb(250,138,131)";
            }
        });
    }

    return (
        <Collapsible open={true} trigger="General Settings">
            {message ? <Message msg={message}/> : null}

            {updated ?<div className="information">
                <h4 className="success">Updated</h4>
            </div> : null}

            <form onSubmit={validate}>
                <p>
                    {
                        usernameIsAvailable ? null : <h2>Username is not available!</h2>
                    }
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
                    {
                        emailIsAvailable ? null : <h2>Email is not available!</h2>
                    }
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