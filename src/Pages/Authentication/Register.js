import {useEffect} from "react";
import {Link} from "react-router-dom";

function Register() {

    useEffect(() => {
        fetch("http://localhost/UniShare/course/getrate?courseID=13")
            .then(
                (result) => {
                    console.log(result["data"]);
                },
                (error) => {
                    console.log(error);
                }
            )
    }, [])

    return (
        <div className="container">
            <div className="form-authentication-container">
                <h1>Register</h1>
                <form method="post">
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
