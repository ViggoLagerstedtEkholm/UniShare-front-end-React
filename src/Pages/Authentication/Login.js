import '../../css/header.css';
import React, {useState, useContext} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {UserContext} from "../Shared/Context/UserContext";
import axios from "axios";
import {API} from "../Shared/Constants";
import {validEmail} from "../Shared/RegEx/User";
import Message from "../Shared/Files/Message";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const [message, setMessage] = useState('');

    const {user, setUser} = useContext(UserContext);

    const validate = (e) =>{
        e.preventDefault();

        const emailError = checkEmail(email);

        if(!emailError){
            doLogin();
        }
    }

    const doLogin = () => {
        const data = new FormData();
        data.append('email', email);
        data.append('password', password);
        data.append('rememberMe', rememberMe);

        const options = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            withCredentials: true
        }

        axios.post(API + "/login", data, options).then(response => {
            console.log(response);
            localStorage.clear();
            localStorage.setItem('USER', JSON.stringify(response['data']));
            setUser(JSON.stringify(response['data']));
            document.location.reload("/");
        })
        .catch((error) => {
            if (error.response.status === 403) {
                setMessage(error.response.data);
            }
        });
    }

    if(user != null){
        return <Redirect to="/" />
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

                    Remember me:
                    <input type="checkbox"
                           defaultChecked={rememberMe}
                           onChange={() => setRememberMe(!rememberMe)}/>
                    <br/>

                    <input type="submit" name="submit_login" className="button-style-4" value="Login"/>
                </form>

                <h4 className="form-authentication-text">Create new account?
                <hr/>
                <Link className="button-style-1" to="/register">Go to register page</Link></h4>
            </div>
        </div>
    );
}

export default Login;
