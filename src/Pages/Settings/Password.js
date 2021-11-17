import {useState} from "react";
import Collapsible from "react-collapsible";
import {
    validPassword,
} from "../Shared/RegEx/User";
import {API} from "../Shared/Constants";
import api from "../Service/api";

export function Password() {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [regexError, setRegexError] = useState('');

    const hint = "Minimum eight and maximum 80 characters, at least one uppercase letter, one lowercase letter, one number and one special character.";

    const validate = (e) =>{
        e.preventDefault();

        const newPasswordError = checkNewPassword(newPassword);

        if(!newPasswordError)
        {
            doSubmit();
        }
    }

    const doSubmit = () =>{
        api.post(API + "/api/Settings/password/update", {CurrentPassword : currentPassword, NewPassword : newPassword} ).then(() => {
            alert('Updated password');
        }).catch(error => {
            console.log(error.response);
        });
    }

    const checkNewPassword = (password) =>{
        let error;
        if(!validPassword.test(password)){
            setRegexError(true);
            error = true;
            document.getElementById("new_password").style.background="rgb(250,138,131)";
        }else{
            setRegexError(false);
            error = false;
            document.getElementById("new_password").style.background="white";
        }
        return error;
    }

    return (
        <Collapsible trigger="Change Password">

            <form onSubmit={validate}>
                <p>
                    Current password
                    <input id="current_password" className="user-input-text" type="password" placeholder="Current password" value={currentPassword}
                           onChange={(e) =>{
                               setCurrentPassword(e.target.value);
                           }}
                    />
                </p>
                <p>
                    {regexError ? <h5>{hint}</h5>: null }
                    New password
                    <input id="new_password" className="user-input-text" type="password" placeholder="New password" value={newPassword}
                           onChange={(e) =>{
                               setNewPassword(e.target.value);
                               checkNewPassword(e.target.value);
                           }}
                    />
                </p>

                <button type="submit" className="button-style-1">Change password</button>
            </form>
        </Collapsible>
    );
}