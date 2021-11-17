import React, {Fragment, useState} from "react";
import Message from "./Message";
import {UploadImage} from "../../Service/UserService";

const FileUpload = () => {
    const [file, setFile] = useState('');
    const [message, setMessage] = useState('');

    const onChange = e => {
        setFile(e.target.files[0]);
    }

    const onSubmit = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);

        UploadImage(formData).then(response => {
            console.log(response);
            window.location.reload();
        }).catch(error => {
            console.log(error);
            setMessage("Could not upload file.");
        });
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