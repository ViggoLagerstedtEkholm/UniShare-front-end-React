import {Link} from "react-router-dom";
import {useState} from "react";
import axios from "axios";
import {API} from "../Shared/Constants";
import {validEmail, validFirstname, validLastname, validPassword, validUsername} from "../Shared/RegEx/User";

function Register() {
    const [registered, setRegistered] = useState(false);
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');

    const validate = (e) =>{
        e.preventDefault();

        const firstNameError = checkFirstName(firstName);
        const lastNameError = checkLastName(lastName);
        const emailError = checkEmail(email);
        const usernameError = checkUsername(username);
        const passwordError = checkPassword(password);
        const passwordRepeatError = checkPasswordRepeat(passwordRepeat);

        console.log("emailError: " + emailError);
        console.log("firstNameError: " + firstNameError);
        console.log("lastNameError: " + lastNameError);
        console.log("usernameError: " + usernameError);
        console.log("passwordError: " + passwordError);
        console.log("passwordRepeatError: " + passwordRepeatError);

        if(!emailError && !firstNameError && !lastNameError && !usernameError && !passwordError && !passwordRepeatError){
            doRegister();
        }
    }

    const doRegister = () => {
        const formData = new FormData();
        formData.append('first_name', firstName);
        formData.append('last_name', lastName);
        formData.append('email', email);
        formData.append('display_name', username);
        formData.append('password', password);
        formData.append('password_repeat', passwordRepeat);

        axios.post(API + "/register", formData).then(response => {
            console.log(response);
            setRegistered(true);
            alert('Go to your mail for verification.');
            window.scrollTo(0, 0);
        }).catch(error => {
            console.log(error.response);
        })
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

                {registered ? <p>Check your mail: <b>{email}</b>. click the embedded the link to verify your email.</p> : null}

                <h1>Register</h1>
                <form onSubmit={validate}>
                    <div className="text_field">
                        <h2>First name</h2>
                        <h5 className="information"> (a-z and A-Z and 0-9) minimum 2 characters and maximum 30. Spaces and some special characters allowed.</h5>
                        <input id="firstName" type="text" className="user-input-text" placeholder="First name" onChange={(e) => {
                            setFirstName(e.target.value);
                            checkFirstName(e.target.value);
                        }}/>
                    </div>
                    <div className="text_field">
                        <h2>Last name</h2>
                        <h5 className="information"> (a-z and A-Z and 0-9) minimum 2 characters and maximum 30. Spaces and some special characters allowed.</h5>
                        <input id="lastName" type="text" className="user-input-text" placeholder="Last name" onChange={(e) => {
                            setLastName(e.target.value);
                            checkLastName(e.target.value);
                        }}/>
                    </div>

                    <div className="text_field">
                        <h2>Email</h2>
                        <h5 className="information"> Example mail: user.example@mail.com</h5>
                        <input id="email" type="text" className="user-input-text" placeholder="Email"  onChange={(e) => {
                            setEmail(e.target.value);
                            checkEmail(e.target.value);
                        }}/>
                    </div>

                    <div className="text_field">
                        <h2>Username</h2>
                        <h5 className="information"> (a-z and A-Z and 0-9) minimum 8 characters and maximum 30. No spaces allowed.</h5>
                        <input id="username" type="text" className="user-input-text" placeholder="Username" onChange={(e) => {
                            setUsername(e.target.value);
                            checkUsername(e.target.value);
                        }}/>
                    </div>
                    <div className="text_field">
                        <h2>Password</h2>
                        <h5 className="information">Minimum eight and maximum 80 characters, at least one uppercase letter (A-Z),
                            one lowercase letter (a-z), one number (0-9) and one special character (@$!%*?&).</h5>
                       <input id="password" type="password" className="user-input-text" placeholder="Password" onChange={(e) => {
                            setPassword(e.target.value);
                            checkPassword(e.target.value);
                        }}/>
                    </div>
                    <div className="text_field">
                        <h2>Repeat password</h2>
                        <input id="passwordRepeat" type="password" className="user-input-text" placeholder="Repeat password" onChange={(e) => {
                            setPasswordRepeat(e.target.value);
                            checkPasswordRepeat(e.target.value);
                        }}/>
                    </div>
                    <input type="submit" name="submit_register" className="button-style-4" value="Register"/>
                </form>
                <h4 class="form-authentication-text">Already have an account? <hr/><Link className="button-style-1" to="/login">Go to login page</Link> </h4>
            </div>
        </div>
);
}

export default Register;
