import axios from "axios";
import {Redirect} from "react-router-dom";
import {useContext, useState} from "react";
import {UserContext} from "../../Shared/Context/UserContext";
import {API} from "../../Shared/Constants";

function Add(props) {
    const [file, setFile] = useState(null);
    const [link, setLink] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [customCheck, setCustomCheck] = useState(false);
    const [text, setText] = useState('');

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
            }
        }).then(() => {
            const path = "/profile/" + user["userID"];
            props.history.push(path);
        }).catch(error => {
            console.log(error);
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

    const onCheckedChange = (e) => {
        const check = !customCheck;
        setCustomCheck(check);
    }

    return (
        <div className="container">
            <div className="content-container">
                <div className="flex-item">
                    <div className="user-input-form-box">
                        <h3> Enter project information</h3>
                        <form onSubmit={onSubmit}>
                            <input className="user-input-text" type="text" onChange={onLinkChanged} value={link}
                                   placeholder="Enter link"/>
                            <input className="user-input-text" type="text" onChange={onNameChanged} value={name}
                                   placeholder="Project name"
                                   required/>
                            <br/>
                            <textarea className="user-input-text" onChange={onDescriptionChanged} value={description}
                                      placeholder="Enter description" required/>
                            <p>
                                Project image
                                <input className="form-text" type='file' onChange={onFileChange}/>
                            </p>

                            <h3>Create default image with text</h3>
                            <input type="checkbox" name="customCheck" onChange={onCheckedChange} value={customCheck}/>
                            <p>
                                <input className="user-input-text" type="text" onChange={onTextChanged} value={text}
                                       placeholder="TEXT"/>
                            </p>
                            <p>
                                <input className="button-style-1" type="submit" name="submit_project"
                                       value="Upload"/>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Add;
