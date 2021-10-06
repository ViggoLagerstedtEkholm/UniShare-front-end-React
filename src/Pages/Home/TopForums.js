import forumImage from '../../images/pencil.jpg';

export const TopTrendingDiscussion = (data) => {
    return data.data.map(function (data) {
        const created = data['created'];
        const title = data['title'];
        const topic = data['topic'];
        const views = data['views'];
        const forumID = data['forumID'];

        return (
            <div className="content-card-body">
                <div className="card-info">
                    <div className="content-card-image">
                        <img src={forumImage} alt="USER IMAGE"/>
                    </div>

                    <div className="content-card-info responsive-text">
                        <h4><b>Course information</b></h4>
                        <p><b>Name:</b> {title}</p>
                        <p><b>Created: </b>{created}</p>
                        <p><b>Topic: </b>{topic}</p>
                    </div>

                    <div className="content-card-info responsive-text">
                        <h4>
                            <b>Stats</b>
                        </h4>

                        <p><b>Views:</b> {views}</p>
                    </div>

                    <div className="content-card-info-buttons">
                        <form action={'/forum/' + forumID}>
                            <button className="button-style-1" type="submit">Visit</button>
                        </form>
                    </div>
                </div>
            </div>)
    });
}