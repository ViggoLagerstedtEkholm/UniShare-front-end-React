import axios from "axios";
import {API} from "../Shared/Constants";
import {useEffect, useState} from "react";
import Collapsible from "react-collapsible";
import {Loading} from "../Shared/State/Loading";
import {validURL} from "../Shared/RegEx/Shared";
import Message from "../Shared/Files/Message";

export const Handles = () =>{
    const [github, setGitHub] = useState('');
    const [linkedIn, setLinkedIn] = useState('');
    const [message, setMessage] = useState('');
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect( () => {
        getHandles().then((response) => {
            console.log(response);
            setIsLoaded(true);
            setLinkedIn(response['linkedin']);
            setGitHub(response['github']);
        });
    }, [])

    const getHandles = async () => {
        const promise = axios.get(API + "/settings/get/handles", {withCredentials: true});
        return promise.then((response) => response.data).catch(() => null);
    }


    const updateHandles = (e) =>{
        e.preventDefault();
        const formData = new FormData();
        formData.append('linkedin', e.target.LinkedIn.value);
        formData.append('github', e.target.GitHub.value);

        axios.post(API + "/settings/update/handles", formData, { withCredentials: true }).then(response => {
            console.log(response);
            //window.location.reload();
        }).catch(error => {
            console.log(error.data);
            const response = error.response.data;
            const message = response.join(' , ');
            setMessage(message);
        });
    }

    const checkLink = (link, ID) => {
        let error;
        if (!validURL.test(link)) {
            error = true;
            document.getElementById(ID).style.background = "rgb(250,138,131)";
        } else {
            error = false;
            document.getElementById(ID).style.background = "white";
        }
        return error;
    }

    const onDeleteLinkedIn = () =>{
        axios.post(API + "/settings/delete/handle/linkedin", null, { withCredentials: true }).then(() => {
            window.location.reload();
        });
    }

    const onDeleteGitHub = () =>{
        axios.post(API + "/settings/delete/handle/github", null, { withCredentials: true }).then(() => {
            window.location.reload();
        });
    }

    return(
        <Collapsible trigger="Manage Handles">
            {isLoaded ?
                <div>
                    {message ? <Message msg={message}/> : null}

                    <form onSubmit={updateHandles}>
                        <h2>LinkedIn URL</h2>

                        <input id="LinkedIn" className="user-input-text" type="text" placeholder="LinkedIn"
                               value={linkedIn}
                               onChange={(e) => {
                                   setLinkedIn(e.target.value);
                                   checkLink(e.target.value, 'LinkedIn');
                               }}
                        />
                        <button className="button-style-2" onClick={onDeleteLinkedIn}>Delete</button>

                        <h2>GitHub URL</h2>
                        <input id="GitHub" className="user-input-text" type="text" placeholder="GitHub"
                               value={github}
                               onChange={(e) => {
                                   setGitHub(e.target.value);
                                   checkLink(e.target.value, 'GitHub');
                               }}
                        />

                        <button className="button-style-2" onClick={onDeleteGitHub}>Delete</button>

                        <hr/>

                        <button className="button-style-4" type="submit">Submit handles</button>
                    </form>
                </div>
                : <Loading/>}
        </Collapsible>
    );
}