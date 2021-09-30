import axios from "axios";
import {Redirect} from "react-router-dom";
import React, {useContext, useState} from "react";
import {UserContext} from "../../Shared/Context/UserContext";
import {API} from "../../Shared/Constants";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import Message from "../../Shared/Files/Message";

function Add(props) {
    const [file, setFile] = useState(null);
    const [link, setLink] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [customCheck, setCustomCheck] = useState(false);
    const [text, setText] = useState('');
    const [message, setMessage] = useState(null);

    const {user} = useContext(UserContext);

    const onSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('file', file);
        formData.append('link', link);
        formData.append('name', name);
        formData.append('description', description);
        formData.append('customCheck', customCheck);
        formData.append('text', text);

        axios.post(API + "/project/upload", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            withCredentials: true
        }).then(response => {
            console.log(response);
            const path = "/profile/" + user["userID"];
            props.history.push(path);
        }).catch(error => {
            console.log(error.response['data']);
            const response = error.response['data'];
            const message = response.join(' , ');
            setMessage(message);
        });

    }

    const onLinkChanged = (e) => {
        const link = e.target.value;
        setLink(link);
    }

    const onNameChanged = (e) => {
        const name = e.target.value;
        setName(name);
    }

    const onDescriptionChanged = (e) => {
        const description = e.target.value;
        setDescription(description);
    }

    const onTextChanged = (e) => {
        const text = e.target.value;
        setText(text);
    }

    const onFileChange = e => {
        setFile(e.target.files[0]);
    }

    const onCheckedChange = () => {
        const check = !customCheck;
        setCustomCheck(check);
    }

    return (
        <div className="container">
            <div className="flex-item">
                <div className="user-input-form-box">
                    <h3> Enter project information</h3>

                    {message ? <Message msg={message}/> : null}

                    <form onSubmit={onSubmit}>
                        <input className="user-input-text" type="text" onChange={onLinkChanged} value={link}
                               placeholder="Enter link"/>
                        <input className="user-input-text" type="text" onChange={onNameChanged} value={name}
                               placeholder="Project name"
                               required/>
                        <br/>
                        <textarea className="user-input-text" onChange={onDescriptionChanged} value={description}
                                  placeholder="Enter description" required/>

                        <Tabs>
                            <TabList>
                                <Tab>Upload image</Tab>
                                <Tab>Custom image</Tab>
                            </TabList>

                            <TabPanel>
                                <p>
                                    <input className="form-text" type='file' onChange={onFileChange}/>
                                </p>
                            </TabPanel>

                            <TabPanel>
                                <label>Create custom image with text: </label>
                                <input type="checkbox" name="customCheck" onChange={onCheckedChange}
                                       checked={customCheck}/>
                                <p>
                                    <input className="user-input-text" type="text" onChange={onTextChanged} value={text}
                                           placeholder="TEXT"/>
                                </p>
                            </TabPanel>
                            <p>
                                <input className="button-style-1" type="submit" name="submit_project"
                                       value="Upload"/>
                            </p>
                        </Tabs>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Add;
