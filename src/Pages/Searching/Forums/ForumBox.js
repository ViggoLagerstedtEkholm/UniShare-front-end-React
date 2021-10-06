import forumImage from '../../../images/pencil.jpg';
import {getHighlightedText} from "../../Shared/HighLightText";
import {NoResults} from "../../Shared/Search/NoResults";

export const ForumBox = ({results, filter}) => {
    const path = results['result'];
    const searchWord = filter['search'] ?? "";
    console.log(path);

    if(path.length === 0){
        return (<NoResults/>)
    }

    return path.map(function (data) {
        const title = data['title'];
        const topic = data['topic'];
        const views = data['views'];
        const created = data['created'];
        const forumID = data['forumID'];
        const totalPosts = data['TOTAL_POSTS'];

        return (
            <div className="content-card-body">
                <div className="card-info">
                    <div className="content-card-image">
                        <img src={forumImage} alt="FORUM IMAGE"/>
                    </div>

                    <div className="content-card-info responsive-text">
                        <h4><b>Forum information</b></h4>
                        <p><b>Title:</b> {getHighlightedText(title, searchWord)}</p>
                        <p><b>Topic:</b> {getHighlightedText(topic, searchWord)}</p>
                    </div>

                    <div className="content-card-info responsive-text">
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
