import {useContext} from "react";
import {UserContext} from "../../Shared/Context/UserContext";

export const ReviewBox = (results) => {
    const {user} = useContext(UserContext);
    const path = results.results['reviews'];
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

        let canSeeProfileEdits = false;
        if(userID === parseInt(user['userID'])){
            canSeeProfileEdits = true;
        }

        if(image === ""){
            image = "/images/user.png";
        }else{
            image = 'data:image/jpeg;base64,' + image;
        }

        return (
            <div id={userID + "," + courseID} className="review">
                <div className="comment-image">
                    <img src={image} alt="USER IMG"/>
                </div>
                <p>
                    Username: {userDisplayName}
                </p>

                {canSeeProfileEdits ?
                    <input className="button-style-2" type="button" value="Delete comment" onClick="return deleteComment(---ID---);"/>
                    :
                    <form action={"/profile/" + courseID} >
                        <button className="button-style-1" type="submit">Visit</button>
                    </form>
                }

                <hr/>
                <br/>

                <div className="review-border">
                    <div className="review-text">
                        {text}
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
            </div>
        )
    });
}