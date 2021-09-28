import axios from "axios";
import querystring from "querystring";
import {useContext} from "react";
import {UserContext} from "../../Shared/Context/UserContext";
import {API} from "../../Shared/Constants";

export const RequestBox = (results) => {
    console.log(results);

    const path = results.results['data'];

    if (path.length === 0) {
        return (<div><h4 className="review">No requested courses!</h4></div>)
    }

    return path.map(function (data) {
        const name = data['name'];
        const credits = data['credits'];
        const university = data['university'];
        const country = data['country'];
        const city = data['city'];
        const duration = data['duration'];
        const requestID = data['requestID'];

        const removeRequest = async () => {
            const formData = new FormData();
            formData.append('requestID', requestID);

            const config = {
                headers: {
                    'Accept': 'application/json'
                }
            };

            await axios.post(API + "/request/delete", formData, config).then(() => {
                document.getElementById(requestID).remove();
            }).catch(error => {
                console.log(error);
            });
        }

        return (
            <div>
                <div id={requestID} className="content-card-body">
                    <div className="content-user">
                        <div className="content-card-image">
                            <img src="images/books.png" alt="USER IMAGE"/>
                        </div>

                        <div className="content-card-info">
                            <h4><b>Course information</b></h4>
                            <p><b>Name:</b> {name}</p>
                            <p><b>Credits:</b> {credits}</p>
                            <p><b>Duration: </b> {duration}</p>
                            <p><b>University: </b> {university}</p>
                        </div>

                        <div className="content-card-info">
                            <h4><b>More</b></h4>
                            <p><b>Country:</b> {country}</p>
                            <p><b>City:</b> {city}</p>
                        </div>

                        <div className="content-card-info-buttons">
                            <button className="button-style-2" onClick={removeRequest}>Remove request </button>
                        </div>
                    </div>
                </div>
            </div>

        )
    });
}
