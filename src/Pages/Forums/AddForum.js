import {useState} from "react";
import axios from "axios";
import {API} from "../Shared/Constants";

export const AddForum = (props) => {
    const [title, setTitle] = useState('');
    const [topic, setTopic] = useState('');
    const [text, setText] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('topic', topic);
        formData.append('text', text);

        const config = {
            headers: {
                'Accept': 'application/json'
            }
        };

        await axios.post(API + "/forum/add", formData, config).then(() => {
            props.history.push("/search/forums");
        }).catch(error => {
            console.log(error);
        });
    }

    const onTitleChanged = (e) => {
        const title = e.target.value;
        setTitle(title);
    }

    const onTopicChanged = (e) => {
        const topic = e.target.value;
        setTopic(topic);
    }

    const onTextChanged = (e) => {
        const text = e.target.value;
        setText(text);
    }

    return (
        <div className="container">
            <div className="flex-item">
                <div className="user-input-form-box">
                    <form onSubmit={onSubmit}>
                        <h1>Create forum post</h1>
                        <h4>
                            Title
                        </h4>
                        <input className="user-input-text" type="text" value={title} onChange={onTitleChanged}
                               placeholder="Title"/>

                        <h4>
                            Topic
                        </h4>
                        <input className="user-input-text" type="text" value={topic} onChange={onTopicChanged}
                               placeholder="Topic"/>

                        <h4>
                            Text - (ATLEAST 200 characters)
                        </h4>
                        <input className="user-input-text" type="text" value={text} onChange={onTextChanged}
                               placeholder="Text"/>

                        <p>
                            <input className="button-style-1" type="submit"/>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}
