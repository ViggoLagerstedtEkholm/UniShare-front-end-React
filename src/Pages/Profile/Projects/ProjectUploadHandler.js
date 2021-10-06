import axios from "axios";
import {useHistory} from "react-router-dom";
import React, {useContext, useEffect, useState} from "react";
import {UserContext} from "../../Shared/Context/UserContext";
import {API} from "../../Shared/Constants";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import Message from "../../Shared/Files/Message";
import {validDescription, validName, validURL} from "../../Shared/RegEx/Shared";
import {Loading} from "../../Shared/State/Loading";
import NotFound from "../../Shared/Error/NotFound";

function ProjectUploadHandler(props) {
    const [file, setFile] = useState(null);

    const [link, setLink] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const [customCheck, setCustomCheck] = useState(false);
    const [text, setText] = useState('');
    const [message, setMessage] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    const [projectExists, setProjectExists] = useState(false);

    let projectID = props.match.params.projectID;
    const {user} = useContext(UserContext);
    let history = useHistory();

    useEffect(() => {
        checkIfProjectExists().then((response) => {
            if (response) {
                console.log(response);
                setName(response['name']);
                setLink(response['link']);
                setDescription(response['description']);
                setProjectExists(true);
            }
            setIsLoaded(true);
        });
    }, []);

    const checkIfProjectExists = () => {
        const promise = axios.get(API + "/project/get", {
            params: {
                projectID: projectID
            },
            withCredentials: true
        });

        return promise.then((response) => response.data).catch(() => null);
    }

    const validate = (e) => {
        e.preventDefault();

        const linkError = checkLink(e.target.link.value);
        const nameError = checkName(e.target.name.value);
        const descriptionError = checkDescription(e.target.description.value);
        let canUploadFile = false;

        if ((file !== null && !customCheck) || (customCheck && file === null)) {
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
        formData.append('file', file);
        formData.append('link', link);
        formData.append('name', name);
        formData.append('description', description);
        formData.append('customCheck', customCheck);
        formData.append('text', text);

        if (projectID) {
            formData.append('projectID', projectID);
        }

        const options = {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            withCredentials: true
        }

        if (projectID && projectExists) {
            axios.post(API + "/project/update", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            }).then(() => {
                const path = "/profile/" + user["userID"];
                props.history.push(path);
            }).catch(error => {
                console.log(error);
            });
        } else {
            axios.post(API + "/project/upload", formData, options).then(() => {
                const path = "/profile/" + user["userID"];
                history.push(path);
            }).catch(error => {
                console.log(error.response);
                const response = error.response['data'];
                const message = response.join(' , ');
                setMessage(message);
            });
        }
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
            {isLoaded ?
                <div>
                    {
                        projectExists || !projectID?
                            <div className="title-bar">
                                {message ? <Message msg={message}/> : null}

                                {
                                    projectID ? <h2>Update project</h2> : <h2>Add project</h2>
                                }
                                <hr/>

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
                                        <TabList>
                                            <Tab>Upload image</Tab>
                                            <Tab>Custom image</Tab>
                                        </TabList>

                                        <div id="imagePicker">
                                            <TabPanel>
                                                <p>
                                                    <h2>File</h2>
                                                    <h4 className="information">GIF, JPEG, PNG are allowed file formats.
                                                        Don't upload copyright material.</h4>
                                                    <input id="file" className="form-text" type='file'
                                                           onChange={(e) => {
                                                               setFile(e.target.files[0]);
                                                           }}/>
                                                </p>
                                            </TabPanel>

                                            <TabPanel>
                                                <h2>Custom Image</h2>
                                                <h4 className="information">Create default image with text</h4>
                                                <input type="checkbox" name="customCheck" checked={customCheck}
                                                       onChange={() => {
                                                           setCustomCheck(!customCheck);
                                                       }}
                                                />

                                                <p>
                                                    <input className="user-input-text" type="text" placeholder="TEXT"
                                                           value={text}
                                                           onChange={(e) => {
                                                               setText(e.target.value);
                                                           }}
                                                    />

                                                </p>
                                            </TabPanel>
                                        </div>

                                        <p>
                                            <input className="button-style-1" type="submit" name="submit_project"
                                                   value="Upload"/>
                                        </p>
                                    </Tabs>
                                </form>
                            </div> : <NotFound/>
                    }
                </div> : <Loading/>}
        </div>
    );
}

export default ProjectUploadHandler;
