import React, {Fragment, useState} from "react";
import axios from "axios";
import Message from "./Message";
import {API} from "../Constants";

const FileUpload = ({URL}) => {
    const [file, setFile] = useState('');
    const [message, setMessage] = useState('');

    const onChange = e => {
        //Get first file.
        setFile(e.target.files[0]);
    }

    const onSubmit = async e => {
        console.log("URL: " , URL);
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);

        try {
            await axios.post(API + URL, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            }).then(response => {
                console.log(response);
                window.location.reload();
            });
        } catch (err) {
            console.log(err);
            setMessage("Could not upload file.");
        }
    }

    return (
        <Fragment>
            {message ? <Message msg={message}/> : null}
            <form onSubmit={onSubmit}>
                <label>
                    File upload
                </label>
                <br/>

                <p>
                    <input type='file' name='file' onChange={onChange}/>
                </p>

                <input type="submit" value="Upload" className="button-style-4"/>
            </form>
        </Fragment>
    );
};

export default FileUpload;