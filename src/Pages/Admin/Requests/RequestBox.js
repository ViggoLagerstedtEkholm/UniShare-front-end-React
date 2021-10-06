import axios from "axios";
import {API} from "../../Shared/Constants";
import courseImage from '../../../images/books.png';
import {NoResults} from "../../Shared/Search/NoResults";

export const RequestBox = (results) => {
    console.log(results);

    const path = results.results['result'];

    if (path.length === 0) {
        return (<NoResults/>)
    }

    return path.map(function (data) {
        const name = data['name'];
        const credits = data['credits'];
        const university = data['university'];
        const country = data['country'];
        const city = data['city'];
        const requestID = data['requestID'];
        const code = data['code'];
        const requestDate = data['date'];

        const formData = new FormData();
        formData.append('requestID', requestID);

        const deny = async () => {
            await axios.post(API + "/admin/course/deny", formData, {withCredentials: true}).then(() => {
                document.getElementById(requestID).remove();
            }).catch(error => {
                console.log(error);
            });
        }

        const approve = async () => {
            await axios.post(API + "/admin/course/approve", formData, {withCredentials: true}).then(() => {
                document.getElementById(requestID).remove();
            }).catch(error => {
                console.log(error);
            });
        }

        return (
            <div>
                <div id={requestID} className="content-card-body">
                    <div className="card-info">
                        <div className="content-card-image">
                            <img src={courseImage} alt="COURSE"/>
                        </div>

                        <div className="content-card-info responsive-text">
                            <h4><b>Course information</b></h4>
                            <p><b>Name:</b> {name} </p>
                            <p><b>Credits:</b> {credits}</p>
                            <p><b>University: </b> {university}</p>
                            <p><b>Code:</b> {code}</p>
                        </div>

                        <div className="content-card-info responsive-text">
                            <h4><b>More</b></h4>
                            <p><b>Country:</b> {country}</p>
                            <p><b>City:</b> {city}</p>
                            <p><b>Request date:</b> {requestDate}</p>
                        </div>

                        <div className="content-card-info-buttons">
                            <button className="button-style-2" onClick={deny}>Deny request </button>
                            <button className="button-style-3" onClick={approve}>Approve request </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    });
}
