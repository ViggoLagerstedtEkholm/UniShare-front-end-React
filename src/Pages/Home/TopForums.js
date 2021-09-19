export const TopTrendingDiscussion = (data) => {
    return data.data.map(function (data) {
        const created = data['created'];
        const title = data['title'];
        const topic = data['topic'];
        const views = data['views'];

        console.log(created);
        return (
            <div className="content-card-body">
                <div className="content-user">
                    <div className="content-card-image">
                        <img src="images/books.png" alt="USER IMAGE"/>
                    </div>

                    <div className="content-card-info">
                        <h4><b>Course information</b></h4>
                        <p><b>Name:</b> {title}</p>
                        <p><b>Created: </b>{created}</p>
                    </div>

                    <div className="content-card-info">
                        <p><b>Views:</b> {views}</p>
                    </div>

                    <div className="content-card-info-buttons">
                        <form action="/UniShare/forum" method="get">
                            <input type="hidden" name="ID" value="---ID---"/>
                            <button className="button-style-1" type="submit">Visit</button>
                        </form>
                    </div>
                </div>
            </div>)
    });
}