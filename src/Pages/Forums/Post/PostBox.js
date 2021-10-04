import userImage from '../../../images/user.png';

export const PostBox = ({results, filter}) => {

    const path = results['posts'];
    let searchWord = filter['search'] ?? "";

    if(path.length === 0){
        return (<div><h4 className="review">No post results!</h4></div>)
    }

    return path.map(function (data) {
        const date = data['date'];
        const text = data['text'];
        const userDisplayName = data['userDisplayName'];
        let image = data['userImage'];
        console.log(data);

        if(image === ""){
            image = userImage;
        }else{
            image = 'data:image/jpeg;base64,' + image;
        }

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
            <div className="review">
                <div className="comment-image">
                    <img src={image} alt="USER IMG"/>
                </div>

                <p>
                    Username: {getHighlightedText(userDisplayName, searchWord)}
                </p>

                <p>
                    Posted: {getHighlightedText(date, searchWord)}
                </p>

                <div className="review-border">
                    <div className="review-text">
                        {getHighlightedText(text, searchWord)}
                    </div>
                </div>
            </div>
        )
    });
}
