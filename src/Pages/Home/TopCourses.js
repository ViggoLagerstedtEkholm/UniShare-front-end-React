import {Link} from "react-router-dom";
import courseImage from '../../images/CourseDefault.png';

export const TopRankedCourse = ({data}) => {
    return data.map(function (data, index) {
        const name = data['name'];
        const university = data['university'];
        const average_rating = data['rating'];
        const courseID = data['id'];

        return (
            <div key={index} className="content-card-body">
                <div className="card-info">
                    <div className="content-card-image">
                        <img src={courseImage} alt="USER"/>
                    </div>

                    <div className="content-card-info responsive-text">
                        <h4>
                            <b>Course information</b>
                        </h4>
                        <p>
                            <b>Name:</b>
                            {name}
                        </p>
                        <p>
                            <b>University: </b>
                            {university}
                        </p>
                    </div>

                    <div className="content-card-info responsive-text">
                        <h4>
                            <b>Stats</b>
                        </h4>

                        <p><b>Score:</b> {average_rating}</p>
                    </div>

                    <div className="content-card-info-buttons">
                        <Link className="button-style-1" to={'/courses/' + courseID}> Visit</Link>
                    </div>
                </div>
            </div>
        )
    });
}