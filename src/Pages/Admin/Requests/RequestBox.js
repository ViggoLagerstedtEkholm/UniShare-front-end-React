import {NoResults} from "../../Shared/Search/NoResults";
import {getHighlightedText} from "../../Shared/HighLightText";
import {Link} from "react-router-dom";
import {ApproveRequest, DeleteRequest, DenyRequest, UploadRequest} from "../../Service/CourseRequestService";

export const RequestBox = ({results, filter}) => {
    const path = results['requests'];
    let searchWord = filter['Search'] ?? "";

    console.log(results);

    if (path.length === 0) {
        return (<NoResults/>)
    }

    return path.map(function (data) {
        const name = data['name'];
        const credits = data['credits'];
        const university = data['university'];
        const country = data['country'];
        const city = data['city'];
        const requestID = data['id'];
        const code = data['code'];
        const requestDate = data['date'];
        const username = data['username'];
        const image = data['image'];

        return (
            <div>
                <div id={requestID} className="content-card-body">
                    <div className="card-info">
                        <div className="content-card-image">
                            <img src={`data:image/jpeg;base64,${image}`} alt="User"/>
                        </div>

                        <div className="content-card-info responsive-text">
                            <h4><b>Course information</b></h4>
                            <p><b>Name:</b> {getHighlightedText(name, searchWord)} </p>
                            <p><b>Credits:</b> {getHighlightedText(credits, searchWord)}</p>
                            <p><b>University: </b> {getHighlightedText(university, searchWord)}</p>
                            <p><b>Code:</b> {getHighlightedText(code, searchWord)}</p>
                        </div>

                        <div className="content-card-info responsive-text">
                            <h4><b>More</b></h4>
                            <p><b>Country:</b> {getHighlightedText(country, searchWord)}</p>
                            <p><b>City:</b> {getHighlightedText(city, searchWord)}</p>
                            <p><b>Request date:</b> {getHighlightedText(requestDate, searchWord)}</p>
                            <p><b>Requester:</b> {getHighlightedText(username, searchWord)}</p>
                        </div>

                        <div className="content-card-info-buttons">
                            <button className="button-style-2" onClick={() =>{
                                DenyRequest(requestID).then(() => window.location.reload());
                            }}>Deny request </button>
                            <button className="button-style-3" onClick={() => {
                                ApproveRequest(requestID).then(() => window.location.reload());
                            }}>Approve request </button>

                            <Link to={"/profile/" + username} className="button-style-4">Go to request maker profile</Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    });
}
