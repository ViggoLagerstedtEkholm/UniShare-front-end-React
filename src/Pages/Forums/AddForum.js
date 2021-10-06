import {useState} from "react";
import axios from "axios";
import {API} from "../Shared/Constants";
import {validText} from "../Shared/RegEx/Post";
import {validTitle, validTopic} from "../Shared/RegEx/Forum";

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
            },
            withCredentials: true
        };

        await axios.post(API + "/forum/add", formData, config).then(() => {
            props.history.push("/search/forums");
        }).catch(error => {
            console.log(error);
        });
    }

    const checkTitle = (title) =>{
        let error;
        if(!validTitle.test(title)){
            error = true;
            document.getElementById("title").style.background="rgb(250,138,131)";
        }else{
            error = false;
            document.getElementById("title").style.background="white";
        }
        return error;
    }

    const checkTopic = (topic) =>{
        let error;
        if(!validTopic.test(topic)){
            error = true;
            document.getElementById("topic").style.background="rgb(250,138,131)";
        }else{
            error = false;
            document.getElementById("topic").style.background="white";
        }
        return error;
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
        <div className="container">
            <h2>Create forum post</h2>
            <hr/>
            <div className="title-bar">
                <form onSubmit={onSubmit}>
                    <h4>
                        Title
                    </h4>
                    <h4 className="information">Keep the title short, 5 to 50 characters allowed.</h4>
                    <input id="title" className="user-input-text" type="text" placeholder="Title" value={title}
                       onChange={(e) =>{
                            setTitle(e.target.value);
                            checkTitle(e.target.value);
                        }}
                   />

                    <h4>
                        Topic
                    </h4>

                    <h4 className="information">Keep the topic short, 1 to 50 characters allowed.</h4>

                    <input id="topic" className="user-input-text" type="text" placeholder="Topic" value={topic}
                        onChange={(e) =>{
                            setTopic(e.target.value);
                            checkTopic(e.target.value);
                        }}
                    />

                    <h4>
                        Text
                    </h4>

                    <h4 className="information">5 to 500 characters allowed.</h4>

                    <input id="text" className="user-input-text" type="text" placeholder="Text" value={text}
                        onChange={(e) =>{
                            setText(e.target.value);
                            checkText(e.target.value);
                        }}
                    />

                    <p>
                        <input className="button-style-1" type="submit"/>
                    </p>
                </form>
            </div>
        </div>
    );
}
