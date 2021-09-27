import {Link, Redirect} from "react-router-dom";
import {useState} from "react";
import axios from "axios";

function Register() {
    const [registered, setRegistered] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();

        const firstName = e.target.first_name.value;
        const lastName = e.target.last_name.value;
        const email = e.target.email.value;
        const username = e.target.display_name.value;
        const password = e.target.password.value;
        const passwordRepeat = e.target.password_repeat.value;

        const formData = new FormData();
        formData.append('first_name', firstName);
        formData.append('last_name', lastName);
        formData.append('email', email);
        formData.append('display_name', username);
        formData.append('password', password);
        formData.append('password_repeat', passwordRepeat);

        await axios.post("/register", formData).then(response => {
            console.log(response);
            setRegistered(true);
        }).catch(response => {
            console.log(response);
        })
    }

    return (
        <div className="container">
            <div className="user-input-form-box">

                {registered ? <Redirect to="/"/> : null}

                <h1>Register</h1>
                <form onSubmit={onSubmit}>
                    <div className="text_field">
                        <label>First name</label>
                        <input type="text" name="first_name" required/>
                    </div>
                    <div className="text_field">
                        <label>Last name</label>
                        <input type="text" name="last_name" required/>
                    </div>
                    <div className="text_field">
                        <label>Email</label>
                        <input type="text" name="email" required/>
                    </div>
                    <div className="text_field">
                        <label>Display name</label>
                        <input type="text" name="display_name" required/>
                    </div>
                    <div className="text_field">
                        <label>Password</label>
                        <input type="password" name="password" required/>
                    </div>
                    <div className="text_field">
                        <label>Repeat password</label>
                        <input type="password" name="password_repeat" required/>
                    </div>
                    <input type="submit" name="submit_register" value="Register"/>
                </form>
                <h4 class="form-authentication-text">Already have an account? <Link to="/login">Login</Link> </h4>
            </div>
        </div>
);
}

export default Register;
