import {useContext} from "react";
import {ProfileContext} from "../../Shared/Context/ProfileContext";
import {UserContext} from "../../Shared/Context/UserContext";
import {Redirect} from "react-router-dom";
import axios from "axios";
import querystring from "querystring";

export const CommentBox = (results) => {
    const {profileID} = useContext(ProfileContext);
    const {user} = useContext(UserContext);
    const path = results.results['comments'];
    if (path.length === 0) {
        return (<div><h4 className="review">No profile comments!</h4></div>)
    }

    return path.map(function (data, i) {
        const image = data['userImage'];
        const username = data['userDisplayName'];
        const date = data['date'];
        const text = data['text'];
        const info = data['info'];

        const authorID = data['author'];
        const commentID = data['commentID'];

        let canSeeProfileEdits = false;
        if (user !== null) {
            if (profileID === user['userID'] || authorID === user['userID']) {
                canSeeProfileEdits = true;
            }
        }

        const onDelete = async () => {
            const params = {
                commentID: commentID
            }

            const config = {
                headers: {
                    'Accept': 'application/json'
                }
            };

            await axios.post("/profile/delete/comment", querystring.stringify(params), config).then(response => {
                    console.log(response);
                    document.location.reload();
                }
            ).catch((error) => {
                console.log(error);
                alert('Error!');
            });
        }

        const onVisit = (ID) => {
            return <Redirect to={"/profile/" + ID}/>;
        }

        return (
            <div className="profile-comment">
                <br/>
                <div className="comment-image">
                    <img src={'data:image/jpeg;base64,' + image} alt="USER IMAGE"/>
                </div>

                <p>Username: {username}</p>
                <div className="comment-content">
                    <div className="user-description">
                        {text}
                    </div>
                </div>
                <hr/>
                <p><b>Comment date: {date}</b></p>
                {canSeeProfileEdits ?
                    <input className="button-style-2" type="button" value="Delete comment" onClick={onDelete}/>
                    :
                    <input className="button-style-1" type="button" value="Visit user" onClick={onVisit(authorID)}/>
                }
            </div>
        )
    });
}