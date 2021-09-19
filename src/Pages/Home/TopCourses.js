export const TopRankedCourse = (data) => {
    return data.data.map(function (data) {
        let name = data['name'];
        let university = data['university'];
        let average_rating = data['average_rating'];

        return (
            <div className="content-card-body">
                <div className="content-user">
                    <div className="content-card-image">
                        <img src="images/books.png" alt="USER IMAGE"/>
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
                        <form action="/UniShare/courses" method="get">
                            <input type="hidden" name="ID" value="---ID---"/>
                            <button className="button-style-1" type="submit">Visit</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    });
}