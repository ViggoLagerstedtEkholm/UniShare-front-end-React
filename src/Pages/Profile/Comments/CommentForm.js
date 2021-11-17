import React, {useContext, useState} from "react";
import {ProfileContext} from "../../Shared/Context/ProfileContext";
import {CreateComment} from "../../Service/CommentService";
import {validComment} from "../../Shared/RegEx/Shared";

function CommentForm() {
    const {profileID} = useContext(ProfileContext);
    const [text, setText] = useState("");

    const validate = (e) =>{
        e.preventDefault();

        const commentError = checkComment(text);
        if(!commentError){
            submit();
        }
    }

    const submit = () => {
        const comment = {
            ProfileId: profileID,
            Text: text
        }

        CreateComment(comment).then(() => window.location.reload())
    }

    const checkComment = (text) => {
        let error;
        if (!validComment.test(text)) {
            error = true;
            document.getElementById("commentText").style.background = "rgb(250,138,131)";
        } else {
            error = false;
            document.getElementById("commentText").style.background = "white";
        }
        return error;
    }


    return (
        <div className="profile-comment-form">
            <form onSubmit={validate} id="addCommentForm">
                <h2>Post comment</h2>
                <textarea id="commentText" name="text" required
                  value={text}
                  onChange={(e) =>{
                    setText(e.target.value);
                  }}
                />
                <button className="button-style-1" type="submit" id="addComment" value="PostBox comment">Add comment
                </button>
            </form>
        </div>
    );
}

export default CommentForm;
