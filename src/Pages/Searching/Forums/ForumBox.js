import forumImage from '../../../images/pencil.jpg';

export const ForumBox = ({results, filter}) => {
    const path = results['forums'];
    const searchWord = filter['search'] ?? "";
    console.log(path);

    if(path.length === 0){
        return (<div><h4 className="review">No forum results!</h4></div>)
    }

    return path.map(function (data) {
        const title = data['title'];
        const topic = data['topic'];
        const views = data['views'];
        const created = data['created'];
        const forumID = data['forumID'];
        const totalPosts = data['TOTAL_POSTS'];

        const getHighlightedText = (text, highlight) =>{
            highlight = highlight.toString();
            const parts = text.toString().split(new RegExp(`(${highlight})`, 'gi'));
            return <span> { parts.map((part, i) =>
                <span key={i} style={part.toLowerCase() === highlight.toLowerCase() ? { 'background-color': 'rgba(255,234,0,0.59)' } : {} }>
            { part }
        </span>)
            } </span>;
        }

        return (
            <div className="content-card-body">
                <div className="content-user">
                    <div className="content-card-image">
                        <img src={forumImage} alt="FORUM IMAGE"/>
                    </div>

                    <div className="content-card-info review-text">
                        <h4><b>Forum information</b></h4>
                        <p><b>Title:</b> {getHighlightedText(title, searchWord)}</p>
                        <p><b>Topic:</b> {getHighlightedText(topic, searchWord)}</p>
                    </div>

                    <div className="content-card-info">
                        <h4><b>Forum stats</b></h4>
                        <p><b>Views: </b> {getHighlightedText(views, searchWord)}</p>
                        <p><b>Created: </b> {getHighlightedText(created, searchWord)}</p>
                        <p><b>Total posts: </b> {totalPosts}</p>
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
