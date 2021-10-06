import courseImage from '../../../images/books.png';
import {getHighlightedText} from "../../Shared/HighLightText";
import {NoResults} from "../../Shared/Search/NoResults";

export const RatingsBox = ({results, filter}) => {
    const path = results['result'];
    const searchWord = filter['search'] ?? "";

    if(path.length === 0){
        return (<NoResults/>)
    }

    return path.map(function (data) {
        const name = data['name'];
        const code = data['code'];
        const credits = data['credits'];
        const university = data['university'];
        const rating = data['rating'];
        const courseID = data['courseID'];
        const city = data['city'];

        return (
            <div className="content-card-body">
                <div className="card-info">
                    <div className="content-card-image">
                        <img src={courseImage} alt="USER IMAGE"/>
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
