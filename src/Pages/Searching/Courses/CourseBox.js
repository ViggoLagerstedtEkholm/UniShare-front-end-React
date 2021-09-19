import axios from "axios";
import querystring from "querystring";

export const CourseBox = (results) => {
    const path = results.results['courses'];
    if(path.length === 0){
        return (<div><h4 className="review">No course results!</h4></div>)
    }

    return path.map(function (data) {
        const name = data['name'];
        const credits = data['credits'];
        const duration = data['duration'];
        const university = data['university'];
        const country = data['university'];
        const rating = data['average_rating'] == null ? 'Not set!': data['average_rating'];
        const city = data['city'];
        const added = data['added'];
        const courseID = data['courseID'];
        let isInActiveDegree = data['isInActiveDegree'];

        const toggleToActiveDegree = async (e) => {
            e.preventDefault();

            const params = {
                courseID: courseID
            }

            const config = {
                headers: {
                    'Accept': 'application/json'
                }
            };

            await axios.post("/degree/toggle/course", querystring.stringify(params), config).then(response => {
                    const status = response["data"]["data"]["Status"];

                    console.log(response["data"]["data"]["Status"]);

                    if (status === 'Inserted') {
                        document.getElementById(courseID).innerText = "REMOVE from degree";
                        document.getElementById(courseID).classList.remove("button-style-3");
                        document.getElementById(courseID).classList.add("button-style-2");
                    }
                    if (status === 'Deleted') {
                        document.getElementById(courseID).innerText = "ADD to degree";
                        document.getElementById(courseID).classList.remove("button-style-2");
                        document.getElementById(courseID).classList.add("button-style-3");
                    }
                }
            )
            .catch((error) => {
                if (error.response.status === 500) {
                    alert('AddForum a degree to put this course into! Profile->Degrees then go to settings->active degree');
                }
            });
        }

        return (
            <div className="content-card-body">
                <div className="content-user">
                    <div className="content-card-image">
                        <img src="/images/books.png" alt="USER IMAGE"/>
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
                        <p><b>Score:</b> {rating}</p>
                        <p><b>Country:</b> {country}</p>
                        <p><b>City:</b> {city}</p>
                        <p><b>Added:</b> {added}</p>
                    </div>

                    <div className="content-card-info-buttons">
                        <form onSubmit={toggleToActiveDegree}>
                            {isInActiveDegree ?
                                <button id={courseID} className="button-style-2" type="submit">REMOVE from active degree</button>
                                : <button id={courseID} className="button-style-3" type="submit">ADD to active degree</button>
                            }
                        </form>

                        <form action={"/courses/" + courseID} >
                            <button className="button-style-1" type="submit">Go to course</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    });
}
