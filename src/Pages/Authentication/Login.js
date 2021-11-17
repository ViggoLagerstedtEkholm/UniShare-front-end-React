import '../../css/header.css';
import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {validEmail} from "../Shared/RegEx/User";
import Message from "../Shared/Files/Message";
import {LogIn} from "../Service/AuthenticationService";
import {Loading} from "../Shared/State/Loading";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    const validate = (e) =>{
        setIsLoading(true);
        e.preventDefault();

        const emailError = checkEmail(email);

        if(!emailError){
            doLogin();
        }
    }

    const doLogin = () => {
        const loginPayload ={
            email : email,
            password : password
        }

        LogIn(loginPayload).then(response => {
            localStorage.clear();
            localStorage.setItem('token', JSON.stringify(response.data));
            setIsLoading(false);
            setIsLoggedIn(true);
            window.location.reload();
        }).catch(error => {
            setIsLoading(false);
            setMessage(error);
        });
    }

    if(isLoggedIn){
        navigate("/");
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

    return (
        <div className="container">
            <div className="title-bar">
                <h1>Login</h1>

                {message ? <Message msg={message}/> : null}

                <form onSubmit={validate}>
                    <div className="text_field">
                        <label>Email</label>
                        <input type="email"
                               id="email"
                               placeholder="Email"
                               value={email}
                               onChange={(e) => {
                                   setEmail(e.target.value);
                                   checkEmail(e.target.value);
                               }}
                        />
                    </div>

                    <div className="text_field">
                        <label>Password</label>
                        <input type="password"
                               id="password"
                               placeholder="Password"
                               value={password}
                               onChange={(e) => {
                                    setPassword(e.target.value);
                               }}
                        />
                    </div>

                    {!isLoading ? <input type="submit" name="submit_login" className="button-style-4" value="Login"/> : <Loading/>}

                </form>

                <h4 className="form-authentication-text">Create new account?
                <hr/>
                <Link className="button-style-1" to="/register">Go to register page</Link></h4>
            </div>
        </div>
    );
}

export default Login;
