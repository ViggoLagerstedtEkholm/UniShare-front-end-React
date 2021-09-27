import courseImage from '../../images/books.png';

export const TopRankedCourse = (data) => {
    return data.data.map(function (data) {
        const name = data['name'];
        const university = data['university'];
        const average_rating = data['average_rating'];
        const courseID = data['courseID'];

        return (
            <div className="content-card-body">
                <div className="content-user">
                    <div className="content-card-image">
                        <img src={courseImage} alt="USER IMAGE"/>
                    </div>

                    <div className="content-card-info">
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

                    <div className="content-card-info">
                        <p><b>Score:</b> {average_rating}</p>
                    </div>

                    <div className="content-card-info-buttons">
                        <form action={'/courses/' + courseID}>
                            <button className="button-style-1" type="submit">Visit</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    });
}