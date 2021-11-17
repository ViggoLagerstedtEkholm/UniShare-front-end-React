import React, {useContext, useState} from "react";
import {Tabs} from "react-tabs";
import {validDescription, validName, validURL} from "../../Shared/RegEx/Shared";
import {AddProject} from "../../Service/ProjectService";
import {useNavigate} from "react-router-dom";
import {UserContext} from "../../Shared/Context/UserContext";

export default function Add() {
    const [file, setFile] = useState(null);
    const [link, setLink] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();
    const {user} = useContext(UserContext);

    const validate = (e) => {
        e.preventDefault();

        const linkError = checkLink(e.target.link.value);
        const nameError = checkName(e.target.name.value);
        const descriptionError = checkDescription(e.target.description.value);
        let canUploadFile = false;

        if (file !== null) {
            canUploadFile = true;
            document.getElementById('imagePicker').style.border = "none";
        } else {
            document.getElementById('imagePicker').style.border = "5px solid red";
        }

        if (!linkError && !nameError && !descriptionError && canUploadFile) {
            onSubmit();
        }
    }

    const onSubmit = () => {
        const formData = new FormData();
        formData.append('File', file);
        formData.append('Link', link);
        formData.append('Name', name);
        formData.append('Description', description);

        AddProject(formData).then(() => {
            navigate('/profile/' + user.Username);
        });
    }

    const checkLink = (link) => {
        let error;
        if (!validURL.test(link)) {
            error = true;
            document.getElementById("link").style.background = "rgb(250,138,131)";
        } else {
            error = false;
            document.getElementById("link").style.background = "white";
        }
        return error;
    }

    const checkName = (name) => {
        let error;
        if (!validName.test(name)) {
            error = true;
            document.getElementById("name").style.background = "rgb(250,138,131)";
        } else {
            error = false;
            document.getElementById("name").style.background = "white";
        }
        return error;
    }

    const checkDescription = (description) => {
        let error;
        if (!validDescription.test(description)) {
            error = true;
            document.getElementById("description").style.background = "rgb(250,138,131)";
        } else {
            error = false;
            document.getElementById("description").style.background = "white";
        }
        return error;
    }

    return (
        <div className="container">
            <div className="title-bar">
                <form onSubmit={validate}>
                    <h2>Project link</h2>
                    <h4 className="information">Valid links are either http/https. Example of valid
                        link: https://test.com</h4>
                    <input id="link" className="user-input-text" type="text" placeholder="Enter link"
                           value={link}
                           onChange={(e) => {
                               setLink(e.target.value);
                               checkLink(e.target.value);
                           }}
                    />

                    <h2>Project name</h2>
                    <h4 className="information">Special characters and spaces allowed. Between 1 and 150
                        characters. No numbers allowed.</h4>
                    <input id="name" className="user-input-text" type="text" placeholder="Project name"
                           value={name}
                           onChange={(e) => {
                               setName(e.target.value);
                               checkName(e.target.value);
                           }}
                    />

                    <br/>
                    <h2>Description</h2>
                    <h4 className="information">Characters between 5 and 2000 allowed.</h4>
                    <textarea id="description" className="user-input-text" value={description}
                              placeholder="Enter description"
                              onChange={(e) => {
                                  setDescription(e.target.value);
                                  checkDescription(e.target.value);
                              }}/>

                    <Tabs>
                        <div id="imagePicker">
                            <p>
                                <h2>File</h2>
                                <h4 className="information">GIF, JPEG, PNG are allowed file formats.
                                    Don't upload copyright material.</h4>
                                <input id="file" className="form-text" type='file' required
                                       onChange={(e) => {
                                           setFile(e.target.files[0]);
                                       }}/>
                            </p>
                        </div>

                        <p>
                            <input className="button-style-1" type="submit" name="submit_project"
                                   value="Upload"/>
                        </p>
                    </Tabs>
                </form>
            </div>
        </div>
    );
}