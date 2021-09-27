import '../../css/header.css';
import React, {useState, useRef, useContext} from 'react';
import {Link, Redirect} from 'react-router-dom';

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import {login} from "../Service/AuthService";
import {UserContext} from "../Shared/Context/UserContext";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const { setUser } = useContext(UserContext);

    const form = useRef();
    const checkBtn = useRef();

    const doLogin = (e) => {
        e.preventDefault();

        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
            login(email, password, rememberMe).then(response =>{
                    localStorage.clear();
                    console.log(response);
                    localStorage.setItem('USER', JSON.stringify(response['data']));
                    setUser(JSON.stringify(response['data']));
                    window.location.reload();
            });
        }
    }

    const required = (field) => {
        if (!field) {
            return (
                <div className="alert alert-danger" role="alert">
                    This field is required!
                </div>
            );
        }
    };

    const onUsernameChanged = (e) => {
        const email = e.target.value;
        setEmail(email);
    }

    const onPasswordChanged = (e) => {
        const password = e.target.value;
        setPassword(password);
    }

    if (localStorage.getItem('USER') != null) {
        return <Redirect to="/" />;
    }

    return (
        <div className="container">
            <div className="user-input-form-box">
                <h1>Login</h1>
                <Form onSubmit={doLogin} ref={form}>
                    <div className="text_field">

                        <label>Email</label>

                        <Input type="email"
                               className="form-control col-auto my-2"
                               id="email"
                               name="email"
                               placeholder="Email"
                               value={email}
                               onChange={onUsernameChanged}
                               validations={[required]}/>
                    </div>

                    <div className="text_field">

                        <label>Password</label>

                        <Input type="password"
                               className="form-control col-auto my-2"
                               id="password"
                               placeholder="Password"
                               value={password}
                               onChange={onPasswordChanged}
                               validations={[required]}/>
                    </div>

                    Remember me:
                    <input type="checkbox"
                           defaultChecked={rememberMe}
                           onChange={() => setRememberMe(!rememberMe)}/>

                    <br/>

                    <input type="submit" name="submit_login" value="Login"/>
                    <CheckButton style={{display: "none"}} ref={checkBtn}/>
                </Form>

                <h4 className="form-authentication-text">Do not have an account? <Link to="/register" >Register</Link></h4>
            </div>
        </div>
    );
}

export default Login;
