import axios from "axios";
import React, {useContext, useState} from "react";
import {ProfileContext} from "../../Shared/Context/ProfileContext";
import * as querystring from "querystring";
import {API} from "../../Shared/Constants";
import { useHistory } from "react-router-dom";
import Message from "../../Shared/Files/Message";

function CommentForm() {
    const {profileID} = useContext(ProfileContext);
    let history = useHistory();
    const [message, setMessage] = useState(null);

    const submit = (e) => {
        e.preventDefault();
        const text = e.target.commentText.value;

        const params = {
            profileID: profileID,
            text: text
        }

        axios.post(API + "/profile/add/comment", querystring.stringify(params), {withCredentials: true}).then(() => {
            window.location.reload();
            alert('Added comment!');
        }).catch((error) => {
            const response = error.response['data'];
            const message = response.join(' , ');
            setMessage(message);

            if (error.response) {
                if(error.response.status === 403){
                    history.push('/login');
                }
            }
        });
    }

    return (
        <div className="profile-comment-form">
            <form onSubmit={submit} id="addCommentForm">
                <h2>Post comment</h2>
                {message ? <Message msg={message}/> : null}
                <textarea id="commentText" name="text" required/>
                <button className="button-style-1" type="submit" id="addComment" value="PostBox comment">Add comment
                </button>
            </form>
        </div>
    );
}

export default CommentForm;
