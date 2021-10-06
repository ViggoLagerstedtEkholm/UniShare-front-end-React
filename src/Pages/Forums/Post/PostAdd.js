import {useState} from "react";
import axios from "axios";
import {API} from "../../Shared/Constants";
import {useHistory} from "react-router-dom";
import {validText} from "../../Shared/RegEx/Post";

export const PostAdd = ({forumID}) => {
    const [text, setText] = useState("");
    let history = useHistory();

    const validate = (e) =>{
        e.preventDefault();

        const textError = checkText(e.target.text.value);

        if(!textError){
            onSubmit();
        }
    }

    const onSubmit = () => {
        const formData = new FormData();
        formData.append('forumID', forumID);
        formData.append('text', text);

        axios.post(API + "/post/add", formData, { withCredentials: true }).then(() => {
            window.location.reload();
        }).catch(error => {
            if (error.response) {
                if(error.response.status === 403){
                    history.push("/login");
                }
            }
        });
    }

    const checkText = (text) =>{
        let error;
        if(!validText.test(text)){
            error = true;
            document.getElementById("text").style.background="rgb(250,138,131)";
        }else{
            error = false;
            document.getElementById("text").style.background="white";
        }
        return error;
    }

    return (
        <div className="title-bar">
            <form onSubmit={validate}>
                <h4>
                    Add post
                </h4>
                <h4 className="information">The post needs to be between 5 and 500 characters.</h4>
                <textarea id="text" className="user-input-text" placeholder="Text" value={text}
                      onChange={(e) =>{
                            setText(e.target.value);
                          checkText(e.target.value);
                      }}
                />

                <p>
                    <input className="button-style-1" type="submit" value="PostBox"/>
                </p>
            </form>
        </div>
    );
}
