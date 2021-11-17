import {NoResults} from "../../Shared/Search/NoResults";
import {DeleteRequest, GetRequests} from "../../Service/CourseRequestService";
import {useEffect, useState} from "react";
import {Loading} from "../../Shared/State/Loading";
import courseImage from '../../../images/CourseDefault.png';

export const RequestBox = () => {
    const [data, setData] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        GetRequests().then(response => {
            setData(response);
            setIsLoaded(true);
        });
    }, []);

    return(
      <div className="display-result-box">
          <h2>Your requests</h2>
          {isLoaded ? renderResults() : <Loading/>}
      </div>
    );

    function renderResults(){
        if (data.length === 0) {
            return (<NoResults/>)
        }

        return data.map(function (data, index) {
            const name = data['name'];
            const credits = data['credits'];
            const university = data['university'];
            const country = data['country'];
            const city = data['city'];
            const requestID = data['id'];

            return (
                <div key={index} id={requestID} className="content-card-body">
                    <div className="card-info">
                        <div className="content-card-image">
                            <img src={courseImage} alt="USER"/>
                        </div>

                        <div className="content-card-info responsive-text">
                            <h4><b>Course information</b></h4>
                            <p><b>Name:</b> {name}</p>
                            <p><b>Credits:</b> {credits}</p>
                            <p><b>University: </b> {university} </p>
                        </div>

                        <div className="content-card-info responsive-text">
                            <h4><b>More</b></h4>
                            <p><b>Country:</b> {country}</p>
                            <p><b>City:</b> {city}</p>
                        </div>

                        <div className="content-card-info-buttons">
                            <button className="button-style-2" onClick={() => {
                                DeleteRequest(requestID).then(() => {
                                    window.location.reload();
                                })
                            }}>Remove request</button>
                        </div>
                    </div>
                </div>
            )
        });
    }
}
