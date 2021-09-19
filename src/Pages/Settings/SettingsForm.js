import {useContext, useState} from "react";
import axios from "axios";
import {Redirect} from "react-router-dom";
import {UserContext} from "../Shared/Context/UserContext";

export function SettingsForm({settings, degrees, activeID}) {
    const [username, setUsername] = useState(settings['display_name']);
    const [firstName, setFistName] = useState(settings['first_name']);
    const [lastName, setLastName] = useState(settings['last_name']);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [email, setEmail] = useState(settings['email']);
    const [description, setDescription] = useState(settings['description']);
    const [activeDegree, setActiveDegree] = useState(activeID);
    const [update, setUpdate] = useState(false);

    const {user} = useContext(UserContext);

    const onUsernameChange = (e) => {
        const username = e.target.value;
        setUsername(username);
    }

    const onFirstNameChange = (e) => {
        const firstName = e.target.value;
        setFistName(firstName);
    }

    const onLastNameChange = (e) => {
        const lastName = e.target.value;
        setLastName(lastName);
    }

    const onEmailChange = (e) => {
        const email = e.target.value;
        setEmail(email);
    }

    const onCurrentPasswordChange = (e) => {
        const password = e.target.value;
        setCurrentPassword(password);
    }

    const onNewPasswordChange = (e) => {
        const newPassword = e.target.value;
        setNewPassword(newPassword);
    }

    const onDescriptionChange = (e) => {
        const description = e.target.value;
        setDescription(description);
    }

    const onDegreeChange = (e) => {
        console.log('Changed!');
        const degree = e.target.value;
        setActiveDegree(degree);
    }

    function populateDegrees() {
        return degrees.map(function (data) {
            const isActive = data['isActive'];
            const name = data['name'];
            const degreeID = data['degreeID'];

            if (isActive) {
                return (
                    <option value={degreeID} selected="selected">{name} - Active</option>
                )
            } else {
                return (
                    <option value={degreeID}>{name}</option>
                )
            }
        });
    }

    async function onUpdate(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('first_name', firstName);
        formData.append('last_name', lastName);
        formData.append('email', email);
        formData.append('display_name', username);
        formData.append('current_password', currentPassword);
        formData.append('new_password', newPassword);
        formData.append('activeDegreeID', activeDegree);
        formData.append('description', description);

        const config = {
            headers: {
                'Accept': 'application/json'
            }
        };

        await axios.post("/settings/update", formData, config).then(() => {
            setUpdate(true);
        }).catch(error => {
            console.log(error);
        });
    }

    function onDelete() {
        if (window.confirm("Are you sure you want to delete your account?")) {

        }
    }

    return (
        <div className="form-authentication-container">
            <div className="user-input-form-box">
                <h3> User information</h3>
                <form onSubmit={onUpdate}>
                    <p>
                        Display name
                        <input className="user-input-text" type="text" value={username} onChange={onUsernameChange}
                               placeholder="Display name"/>
                    </p>
                    <p>
                        First name
                        <input className="user-input-text" type="text" value={firstName}
                               onChange={onFirstNameChange}
                               placeholder="First name"/>
                    </p>
                    <p>
                        Last name
                        <input className="user-input-text" type="text" value={lastName} onChange={onLastNameChange}
                               placeholder="Last name"/>
                    </p>
                    <p>
                        Email
                        <input className="user-input-text" type="text" value={email} onChange={onEmailChange}
                               placeholder="Email"/>
                    </p>
                    <p>
                        Current password
                        <input className="user-input-text" type="password" value={currentPassword}
                               onChange={onCurrentPasswordChange}
                               placeholder="Current password"/>
                    </p>
                    <p>
                        New password
                        <input className="user-input-text" type="password" value={newPassword}
                               onChange={onNewPasswordChange}
                               placeholder="New password"/>
                    </p>

                    <p>
                        Description
                        <textarea className="user-input-text" value={description} onChange={onDescriptionChange}
                                  placeholder="Enter description"/>
                    </p>

                    <p>
                        <b>
                            Select degree, if you don't have one go to Profile->Degrees->Upload new degree
                        </b>
                    </p>

                    <select id="degrees" name="activeDegreeID" onClick={onDegreeChange}>
                        {populateDegrees()}
                    </select>

                    {activeDegree}

                    <hr/>

                    <button id="update" type="submit" className="button-style-4">Update</button>
                </form>

                <hr/>

                <h2>Privacy settings</h2>

                <form onSubmit={onDelete}>
                    <button type="submit" className="button-style-2">Delete account</button>
                </form>
            </div>

            {
                update ? <Redirect to={"/profile/" + user['userID']}/> : null
            }
        </div>
    )
}