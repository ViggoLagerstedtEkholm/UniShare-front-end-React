import {useContext} from "react";
import {UserContext} from "../../Shared/Context/UserContext";
import {getHighlightedText} from "../../Shared/HighLightText";
import {NoResults} from "../../Shared/Search/NoResults";
import {DeleteComment} from "../../Service/CommentService";
import {CanRemoveCommentProfile, CanSeeEdits} from "../../Service/UserService";
import DefaultImage from '../../../images/ProfileDefault.png';
import {Link} from "react-router-dom";

export const CommentBox = ({results, filter}) => {
    const {user} = useContext(UserContext);

    const comments = results['comments'];
    let searchWord = filter['Search'] ?? "";

    if (comments.length === 0) {
        return (<NoResults/>)
    }

    return comments.map(function (data, index) {
        const authorId = data['authorId'];
        const username = data['username'];
        let image = data['image'];
        const date = data['date'];
        const text = data['text'];
        const commentId = data['commentId'];

        const addedDateTime = new Date(date).toDateString() + " , " + new Date(date).toTimeString();

        if (!image) {
            image = DefaultImage;
        } else {
            image = 'data:image/jpeg;base64,' + image;
        }

        return (
            <div key={index} className="profile-comment">
                <br/>
                <div className="comment-image">
                    <img src={image} alt="USER"/>
                </div>

                <div className="comment-content">
                    <div className="user-description">
                        {getHighlightedText(text, searchWord)}
                    </div>
                </div>
                <hr/>
                <p><b>{getHighlightedText(addedDateTime, searchWord)}</b></p>

                {CanRemoveCommentProfile(authorId, user) || CanSeeEdits(username, user) ?
                    <input className="button-style-2" type="button" value="Delete comment" onClick={() => {
                        DeleteComment(commentId).then(() => window.location.reload())
                    }}/>
                    :
                    <Link className="button-style-4"  to={"/profile/" + username}>Visit author</Link>
                }
            </div>
        )
    });
}