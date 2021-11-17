import {Link} from "react-router-dom";
import {getHighlightedText} from "../../Shared/HighLightText";
import {NoResults} from "../../Shared/Search/NoResults";
import courseImage from '../../../images/CourseDefault.png';

export const ReviewBox = ({results, filter}) => {
    const path = results['profileReviews'];
    const searchWord = filter['Search'] ?? "";

    if(path.length === 0){
        return (<NoResults/>)
    }

    return path.map(function (data, index) {
        let courseID = data['courseId'];
        const text = data['text'];
        const name = data['name'];
        const university = data['university'];
        const fulfilling = data['fulfilling'];
        const environment = data['environment'];
        const difficulty = data['difficulty'];
        const grading = data['grading'];
        const literature = data['literature'];
        const overall = data['overall'];
        const helpful = 55;
        const added = data['added'];
        const updated = data['updated'];

        return (
            <div key={index} className="empty-response">
                <div className="comment-image">
                    <img src={courseImage} alt="USER IMG"/>
                    <div className="content-card-info">
                        <h4><b>Course information</b></h4>
                        <p><b>Course name: {getHighlightedText(name, searchWord)}</b></p>
                        <p><b>University: {getHighlightedText(university, searchWord)}</b></p>
                    </div>
                    <Link class="button-style-4" to={"/courses/" + courseID} >Go to course</Link>
                </div>

                <div className="review-border">
                    <div className="responsive-text">
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
