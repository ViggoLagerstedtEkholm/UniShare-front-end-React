import axios from "axios";
import {useContext} from "react";
import {ProfileContext} from "../../Shared/Context/ProfileContext";
import * as querystring from "querystring";
import {API} from "../../Shared/Constants";

function CommentForm() {
    const {profileID} = useContext(ProfileContext);

   const submit = (e) => {
       e.preventDefault();
       const text = e.target.commentText.value;

       const params = {
           profileID: profileID,
           text:text
       }

       const config = {
           headers: {
               'Accept': 'application/json'
           }
       };

         axios.post(API + "/profile/add/comment", querystring.stringify(params), config).then(response => {
             window.location.reload();
             alert('Added comment!');
         }).catch(error =>{
             if (error.response) {
                 console.log(error.response.data);
                 console.log(error.response.status);
                 console.log(error.response.headers);
             }
         });
    }

    return (
        <div className="profile-comment-form">
            <form onSubmit={submit} id="addCommentForm">
                <h2>Post comment</h2>
                <textarea id="commentText" name="text"/>
                <button className="button-style-1" type="submit" id="addComment" value="PostBox comment">Add comment</button>
            </form>
        </div>
    );
}

export default CommentForm;
