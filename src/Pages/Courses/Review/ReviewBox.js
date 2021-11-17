import {useContext} from "react";
import {UserContext} from "../../Shared/Context/UserContext";
import {getHighlightedText} from "../../Shared/HighLightText";
import {NoResults} from "../../Shared/Search/NoResults";
import {CanSeeEdits} from "../../Service/UserService";
import {DeleteReview} from "../../Service/ReviewService";
import userImage from '../../../images/ProfileDefault.png';
import {Link} from "react-router-dom";

export const ReviewBox = ({results, filter}) => {
    const {user} = useContext(UserContext);

    const path = results['reviews'];
    let searchWord = filter['Search'] ?? "";

    if(path.length === 0){
        return (<NoResults/>)
    }

    return path.map(function (data, index) {
        const username = data['username'];
        let image = data['image'];
        let courseID = data['courseId'];
        const text = data['text'];

        const fulfilling = data['fulfilling'];
        const environment = data['environment'];
        const difficulty = data['difficulty'];
        const grading = data['grading'];
        const literature = data['literature'];
        const overall = data['overall'];
        const added = data['added'];
        const updated = data['updated'];

        if(image === ""){
            image = userImage;
        }else{
            image = 'data:image/jpeg;base64,' + image;
        }

        const onDelete = async (e) => {
            e.preventDefault();

            DeleteReview(courseID).then(() => window.location.reload());
        }

        return (
            <div key={index} className="empty-response">
                <div className="comment-image">
                    <img src={image} alt="USER IMG"/>
                </div>
                <p>
                    Username: {getHighlightedText(username, searchWord)}
                </p>

                {CanSeeEdits(username, user) ?
                    <input className="button-style-2" type="button" value="Delete review" onClick={onDelete}/>
                    :
                    <Link to={"/profile/" + username} className="button-style-1">Visit</Link>
                    }
                <hr/>
                <br/>

                <div className="review-border">
                    <div className="review-text">
                        {getHighlightedText(text, searchWord)}
                    </div>
                </div>

                <hr/>
                Fulfilling: {fulfilling}
                <br/>
                Environment: {environment}
                <br/>
                Difficulty: {difficulty}
                <br/>
                Grading: {grading}
                <br/>
                Literature: {literature}
                <br/>
                Overall: {overall}
                <br/>

                <hr/>

                <p>
                    Updated: {getHighlightedText(updated, searchWord)}
                </p>

                <p>
                    Added: {getHighlightedText(added, searchWord)}
                </p>
            </div>
        )
    });
}