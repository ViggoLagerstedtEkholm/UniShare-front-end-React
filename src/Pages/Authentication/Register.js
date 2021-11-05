import {Link} from "react-router-dom";
import React, {useState} from "react";
import {validAge, validEmail, validFirstname, validLastname, validPassword, validUsername} from "../Shared/RegEx/User";
import {RegisterAccount} from "../Service/AuthenticationService";
import Message from "../Shared/Files/Message";
import { useHistory } from 'react-router-dom';
import {Loading} from "../Shared/State/Loading";

function Register() {
    const [email, setEmail] = useState('viggo.lagerstedtekholm@gmail.com');
    const [firstname, setFirstName] = useState('Viggo');
    const [lastname, setLastName] = useState('Lagerstedt');
    const [username, setUsername] = useState('horken');
    const [password, setPassword] = useState('123!AbcdDA');
    const [age, setAge] = useState(25);
    const [isLoading, setIsLoading] = useState(false);
    const [passwordRepeat, setPasswordRepeat] = useState('123!AbcdDA');
    const [message, setMessage] = useState();
    const history = useHistory();

    const validate = (e) =>{
        e.preventDefault();

        const firstNameError = checkFirstName(firstname);
        const lastNameError = checkLastName(lastname);
        const emailError = checkEmail(email);
        const usernameError = checkUsername(username);
        const passwordError = checkPassword(password);
        const passwordRepeatError = checkPasswordRepeat(passwordRepeat);
        const ageError = checkAge(age);

        if(!ageError && !emailError && !firstNameError && !lastNameError && !usernameError && !passwordError && !passwordRepeatError){
            doRegister();
        }
    }

    const doRegister = () => {
        setIsLoading(true);

        const registerPayload = {
            username : username,
            email : email,
            password : password,
            age : age,
            firstname : firstname,
            lastname : lastname,
        }

        RegisterAccount(registerPayload).then(() => {
            alert('Successfully registered account. To login you need to confirm the email, go to : ' + email);
            history.push("/login");
        }).catch(error => {
            setMessage(error);
            alert(error);
            setIsLoading(false);
        });
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


    const checkLastName = (lastName) =>{
        let error;
        if(!validLastname.test(lastName)){
            error = true;
            document.getElementById("lastName").style.background="rgb(250,138,131)";
        }else{
            error = false;
            document.getElementById("lastName").style.background="white";
        }
        return error;
    }

    const checkFirstName = (firstName) =>{
        let error;
        if(!validFirstname.test(firstName)){
            error = true;
            document.getElementById("firstName").style.background="rgb(250,138,131)";
        }else{
            error = false;
            document.getElementById("firstName").style.background="white";
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

    const checkPassword = (password) =>{
        let error;
        if(!validPassword.test(password)){
            error = true;
            document.getElementById("password").style.background="rgb(250,138,131)";
        }else{
            error = false;
            document.getElementById("password").style.background="white";
        }
        return error;
    }

    const checkPasswordRepeat = (passwordRepeat) =>{
        let error;
        if(password !== passwordRepeat){
            error = true;
            document.getElementById("passwordRepeat").style.background="rgb(250,138,131)";
        }else{
            error = false;
            document.getElementById("passwordRepeat").style.background="white";
        }
        return error;
    }

    return (
        <div className="container">
            <div className="title-bar">
                <h1>Register</h1>
                {message ? <Message msg={message}/> : null}

                <form onSubmit={validate}>
                    <div className="text_field">
                        <h2>First name</h2>
                        <h5 className="information"> (a-z and A-Z and 0-9) minimum 2 characters and maximum 30. Spaces and some special characters allowed.</h5>
                        <input id="firstName" type="text" className="user-input-text" placeholder="First name" value={firstname}
                        onChange={(e) => {
                            setFirstName(e.target.value);
                            checkFirstName(e.target.value);
                        }}/>
                    </div>
                    <div className="text_field">
                        <h2>Last name</h2>
                        <h5 className="information"> (a-z and A-Z and 0-9) minimum 2 characters and maximum 30. Spaces and some special characters allowed.</h5>
                        <input id="lastName" type="text" className="user-input-text" placeholder="Last name" value={lastname}
                        onChange={(e) => {
                            setLastName(e.target.value);
                            checkLastName(e.target.value);
                        }}/>
                    </div>

                    <div className="text_field">
                        <h2>Email</h2>
                        <h5 className="information"> Example mail: user.example@mail.com</h5>
                        <input id="email" type="text" className="user-input-text" placeholder="Email" value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            checkEmail(e.target.value);
                        }}/>
                    </div>

                    <div className="text_field">
                        <h2>Username</h2>
                        <h5 className="information"> (a-z and A-Z and 0-9) minimum 8 characters and maximum 30. No spaces allowed.</h5>
                        <input id="username" type="text" className="user-input-text" placeholder="Username" value={username}
                        onChange={(e) => {
                            setUsername(e.target.value);
                            checkUsername(e.target.value);
                        }}/>
                    </div>

                    <div className="text_field">
                        <h2>Age</h2>
                        <h5 className="information">Age 13-120 allowed</h5>
                        <input id="age" type="text" className="user-input-text" placeholder="Age" value={age}
                        onChange={(e) => {
                            setAge(e.target.value);
                            checkAge(e.target.value);
                        }}/>
                    </div>

                    <div className="text_field">
                        <h2>Password</h2>
                        <h5 className="information">Minimum eight and maximum 80 characters, at least one uppercase letter (A-Z),
                            one lowercase letter (a-z), one number (0-9) and one special character (@$!%*?&).</h5>
                       <input id="password" type="password" className="user-input-text" placeholder="Password" value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            checkPassword(e.target.value);
                        }}/>
                    </div>
                    <div className="text_field">
                        <h2>Repeat password</h2>
                        <input id="passwordRepeat" type="password" className="user-input-text" placeholder="Repeat password" value={passwordRepeat}
                        onChange={(e) => {
                            setPasswordRepeat(e.target.value);
                            checkPasswordRepeat(e.target.value);
                        }}/>
                    </div>

                    { isLoading ? <Loading/> : <input type="submit" name="submit_register" className="button-style-4" value="Register"/>}

                </form>
                <h4 class="form-authentication-text">Already have an account? <hr/><Link className="button-style-1" to="/login">Go to login page</Link> </h4>
            </div>
        </div>
);
}

export default Register;
