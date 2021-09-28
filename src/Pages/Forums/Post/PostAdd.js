import {useState} from "react";
import axios from "axios";
import {API} from "../../Shared/Constants";

export const PostAdd = ({forumID}) => {
    const [text, setText] = useState("");

    const onTextChange = (e) => {
        const text = e.target.value;
        setText(text);
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('forumID', forumID);
        formData.append('text', text);

        const config = {
            headers: {
                'Accept': 'application/json'
            }
        };

        await axios.post(API + "/post/add", formData, config).then(() => {
            window.location.reload();
        }).catch(error => {
            console.log(error);
        });
    }

    return (
        <div className="user-input-form-box">
            <form onSubmit={onSubmit}>
                <h4>
                    Add post
                </h4>

                <textarea className="user-input-text" type="text" value={text} onChange={onTextChange}
                          placeholder="Text"/>

                <p>
                    <input className="button-style-1" type="submit" name="submit_post" value="PostBox"/>
                </p>
            </form>
        </div>
    );
}
