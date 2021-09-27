import forumImage from '../../../images/pencil.jpg';

export const ForumBox = (results) => {
    const path = results.results['forums'];
    if(path.length === 0){
        return (<div><h4 className="review">No forum results!</h4></div>)
    }

    return path.map(function (data) {
        const title = data['title'];
        const topic = data['topic'];
        const views = data['views'];
        const created = data['created'];
        const forumID = data['forumID'];

        return (
            <div className="content-card-body">
                <div className="content-user">
                    <div className="content-card-image">
                        <img src={forumImage} alt="FORUM IMAGE"/>
                    </div>

                    <div className="content-card-forum">
                        <p><b>Title:</b> {title}</p>
                        <p><b>Topic:</b> {topic}</p>
                        <p><b>Views: </b> {views}</p>
                        <p><b>Created: </b> {created}</p>
                    </div>

                    <div className="content-card-info-buttons">
                        <form action={"/forum/" + forumID}>
                            <button className="button-style-1" type="submit">Visit</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    });
}
