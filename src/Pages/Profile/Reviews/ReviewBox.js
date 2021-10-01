import {Link} from "react-router-dom";
import courseImage from'../../../images/books.png';

export const ReviewBox = ({results, filter}) => {
    console.log(results);
    const path = results['reviews'];
    const searchWord = filter['search'] ?? "";

    if(path.length === 0){
        return (<div><h4 className="review">No course results!</h4></div>)
    }

    return path.map(function (data) {
        let userID = data['userID'];
        let courseID = data['courseID'];
        const text = data['text'];
        const course = data['course'];
        const fulfilling = data['fulfilling'];
        const environment = data['environment'];
        const difficulty = data['difficulty'];
        const grading = data['grading'];
        const litterature = data['litterature'];
        const overall = data['overall'];
        const helpful = data['helpful'];
        const added = data['added'];
        const updated = data['updated'];

        const getHighlightedText = (text, highlight) =>{
            highlight = highlight.toString();
            const parts = text.toString().split(new RegExp(`(${highlight})`, 'gi'));
            return <span> { parts.map((part, i) =>
                <span key={i} style={part.toLowerCase() === highlight.toLowerCase() ? { 'background-color': 'rgba(255,234,0,0.59)' } : {} }>
            { part }
        </span>)
            } </span>;
        }

        return (
            <div id={userID + "," + courseID} className="review">
                <div className="comment-image">
                    <img src={courseImage} alt="USER IMG"/>
                    <div className="content-card-info">
                        <h4><b>Course information</b></h4>
                        <p><b>Course name: {getHighlightedText(course['name'], searchWord)}</b></p>
                        <p><b>University: {getHighlightedText(course['university'], searchWord)}</b></p>
                    </div>
                    <Link class="button-style-4" to={"/courses/" + courseID} >Go to course</Link>
                </div>

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