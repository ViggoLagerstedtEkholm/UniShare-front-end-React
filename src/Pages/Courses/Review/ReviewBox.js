import {useContext} from "react";
import {UserContext} from "../../Shared/Context/UserContext";
import axios from "axios";
import userImage from '../../../images/user.png';
import {API} from "../../Shared/Constants";

export const ReviewBox = ({results, filter}) => {
    const {user} = useContext(UserContext);

    const path = results['reviews'];
    let searchWord = filter['search'] ?? "";

    if(path.length === 0){
        return (<div><h4 className="review">No review results!</h4></div>)
    }

    return path.map(function (data) {
        const userDisplayName = data['userDisplayName'];
        let image = data['userImage'];
        let userID = data['userID'];
        let courseID = data['courseID'];
        const text = data['text'];

        const fulfilling = data['fulfilling'];
        const environment = data['environment'];
        const difficulty = data['difficulty'];
        const grading = data['grading'];
        const litterature = data['litterature'];
        const overall = data['overall'];
        const helpful = data['helpful'];
        const added = data['added'];
        const updated = data['updated'];

        let canSeeProfileEdits = false;
        if(userID === parseInt(user['userID'])){
            canSeeProfileEdits = true;
        }

        if(image === ""){
            image = userImage;
        }else{
            image = 'data:image/jpeg;base64,' + image;
        }

        const getHighlightedText = (text, highlight) =>{
            highlight = highlight.toString();
            const parts = text.toString().split(new RegExp(`(${highlight})`, 'gi'));
            return <span> { parts.map((part, i) =>
                <span key={i} style={part.toLowerCase() === highlight.toLowerCase() ? { 'background-color': 'rgba(255,234,0,0.59)' } : {} }>
            { part }
        </span>)
            } </span>;
        }

        const onDelete = async (e) => {
            e.preventDefault();

            const formData = new FormData();
            formData.append('userID', userID);
            formData.append('courseID', courseID);

            await axios.post(API + "/review/delete", formData, { withCredentials: true }).then(() => {
                window.location.reload();
            }).catch(error => {
                console.log(error);
            });

            document.getElementById(userID + "," + courseID).remove();
        }

        return (
            <div id={userID + "," + courseID} className="review">
                <div className="comment-image">
                    <img src={image} alt="USER IMG"/>
                </div>
                <p>
                    Username: {getHighlightedText(userDisplayName, searchWord)}
                </p>

                {canSeeProfileEdits ?
                    <input className="button-style-2" type="button" value="Delete comment" onClick={onDelete}/>
                    :
                    <form action={"/profile/" + courseID} >
                        <button className="button-style-1" type="submit">Visit</button>
                    </form>
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
                Literature: {litterature}
                <br/>
                Overall: {overall}
                <br/>
                <br/>
                Helpful: {helpful}

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