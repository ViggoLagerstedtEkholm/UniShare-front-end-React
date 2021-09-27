import axios from "axios";

export const RequestBox = (results) => {
    console.log(results);

    const path = results.results['requests'];

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
        const code = data['code'];
        const requestDate = data['date'];

        const formData = new FormData();
        formData.append('requestID', requestID);

        const deny = async () => {
            const config = {
                headers: {
                    'Accept': 'application/json'
                }
            };

            await axios.post("/admin/course/deny", formData, config).then(() => {
                document.getElementById(requestID).remove();
            }).catch(error => {
                console.log(error);
            });
        }

        const approve = async () => {
            const config = {
                headers: {
                    'Accept': 'application/json'
                }
            };

            await axios.post("/admin/course/approve", formData, config).then(() => {
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
                            <p><b>Code:</b> {code}</p>
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
