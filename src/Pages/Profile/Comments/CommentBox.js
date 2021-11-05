import {useContext} from "react";
import {ProfileContext} from "../../Shared/Context/ProfileContext";
import {UserContext} from "../../Shared/Context/UserContext";
import {getHighlightedText} from "../../Shared/HighLightText";
import {NoResults} from "../../Shared/Search/NoResults";
import {DeleteComment} from "../../Service/CommentService";
import {CanSeeEdits} from "../../Service/UserService";

export const CommentBox = ({results, filter}) => {
    const {profileID} = useContext(ProfileContext);
    const {user} = useContext(UserContext);

    const comments = results['comments'];
    let searchWord = filter['Search'] ?? "";

    if (comments.length === 0) {
        return (<NoResults/>)
    }

    return comments.map(function (data) {
        const username = data['username'];
        const image = data['image'];
        const date = data['date'];
        const text = data['text'];
        const commentId = data['commentId'];

        return (
            <div className="profile-comment">
                <br/>
                <div className="comment-image">
                    <img src={`data:image/jpeg;base64,${image}`} alt="USER IMAGE"/>
                </div>

                <p>Username: {getHighlightedText(username, searchWord)}</p>
                <div className="comment-content">
                    <div className="user-description">
                        {getHighlightedText(text, searchWord)}
                    </div>
                </div>
                <hr/>
                <p><b>Comment date: {getHighlightedText(date, searchWord)}</b></p>

                {CanSeeEdits(username, user) || username === profileID ?
                    <input className="button-style-2" type="button" value="Delete comment" onClick={() => {
                        DeleteComment(commentId).then(() => window.location.reload())
                    }}/>
                    :
                    <form action={"/profile/" + username} >
                        <button className="button-style-4" type="submit">Visit author</button>
                    </form>
                }
            </div>
        )
    });
}