import {getHighlightedText} from "../../Shared/HighLightText";
import {NoResults} from "../../Shared/Search/NoResults";
import courseImage from '../../../images/CourseDefault.png';

export const RatingsBox = ({results, filter}) => {
    const path = results['ratings'];
    const searchWord = filter['Search'] ?? "";

    if(path.length === 0){
        return (<NoResults/>)
    }

    return path.map(function (data, index) {
        const name = data['name'];
        const code = data['code'];
        const credits = data['credits'];
        const university = data['university'];
        const rating = data['rating'];
        const courseID = data['courseId'];
        const city = data['city'];

        return (
            <div key={index} className="content-card-body">
                <div className="card-info">
                    <div className="content-card-image">
                        <img src={courseImage} alt="USER"/>
                    </div>

                    <div className="content-card-info">
                        <h4><b>Course information</b></h4>
                        <p><b>Name:</b> {getHighlightedText(name, searchWord)}</p>
                        <p><b>Credits:</b> {getHighlightedText(credits, searchWord)}</p>
                        <p><b>University: </b> {getHighlightedText(university, searchWord)}</p>
                        <p><b>Code: </b> {getHighlightedText(code, searchWord)}</p>
                        <p><b>City: </b> {getHighlightedText(city, searchWord)}</p>
                    </div>

                    <div className="content-card-info">
                        <h4><b>Score</b></h4>
                        <p><b>Score:</b> {rating}</p>
                    </div>

                    <div className="content-card-info-buttons">
                        <form action={"/courses/" + courseID} >
                            <button className="button-style-1" type="submit">Go to course</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    });
}
