import axios from "axios";
import {Redirect} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "../../Shared/Context/UserContext";
import {API} from "../../Shared/Constants";

function Edit(props) {
    const [isLoaded, setIsLoaded] = useState(null);
    const {user} = useContext(UserContext);
    const [link, setLink] = useState('');
    const [name, setName] = useState('');
    const [file, setFile] = useState(null);
    const [description, setDescription] = useState('');
    const projectID = props.match.params.projectID;

    useEffect(() => {
        const getProject = async () => {
            await axios.get(API + "/project/get", {
                params: {
                    projectID: projectID
                }
            }).then(
                response => {
                    console.log(response);
                    const data = response.data['data'];
                    setName(data['Name']);
                    setLink(data['Link']);
                    setDescription(data['Description']);
                }
            )
            .catch((error) => {
                console.log(error);
            });
        }

        getProject().then(() => setIsLoaded(true));
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('projectID', projectID);
        formData.append('file', file);
        formData.append('link', link);
        formData.append('name', name);
        formData.append('description', description);

        axios.post(API + "/project/update", formData, {
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

    const onFileChange = (e) => {
        const file = e.target.files[0];
        setFile(file);
    }

    const onNameChange = (e) => {
        const name = e.target.value;
        setName(name);
    }

    const onLinkChange = (e) => {
        const link = e.target.value;
        setLink(link);
    }

    const onDescriptionChange = (e) => {
        const description = e.target.value;
        setDescription(description);
    }

    return (
        <div className="container">
            <div className="content-container">
                <div className="flex-item">
                    {isLoaded ?   <div className="user-input-form-box">
                        <form onSubmit={onSubmit}>
                            <h1>Update project</h1>
                            <input className="user-input-text" id="name" type="text" name="name" placeholder="Name" onChange={onNameChange} value={name} required/>
                            <br/>
                            <p>
                                Project image
                                <input className="form-text" type='file' name='file' onChange={onFileChange} required/>
                            </p>

                            <input className="user-input-text" id="link" type="text" name="link" placeholder="Link" onChange={onLinkChange} value={link} required/>
                            <div id="project-text">
                                <textarea className="user-input-text" id="description" name="description"
                                          placeholder="Enter description" onChange={onDescriptionChange} value={description} required/>
                            </div>
                            <button type="submit" className="button-style-1">Update</button>
                        </form>
                    </div>
                    : null}
                </div>
            </div>
        </div>
    );
}

export default Edit;
