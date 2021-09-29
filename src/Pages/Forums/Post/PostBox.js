import userImage from '../../../images/user.png';

export const PostBox = (results) => {
    console.log(results);
    const path = results.results['posts'];
    if(path.length === 0){
        return (<div><h4 className="review">No post results!</h4></div>)
    }

    return path.map(function (data) {
        const date = data['date'];
        const text = data['text'];
        const userDisplayName = data['userDisplayName'];
        const userID = data['userID'];
        let image = data['userImage'];

        if(image === ""){
            image = userImage;
        }else{
            image = 'data:image/jpeg;base64,' + image;
        }

        return (
            <div className="review">
                <div className="comment-image">
                    <img src={image} alt="USER IMG"/>
                </div>

                <p>
                    Username: {userDisplayName}
                </p>

                <p>
                    Posted: {date}
                </p>

                <div className="review-border">
                    <div className="review-text">
                        {text}
                    </div>
                </div>
            </div>
        )
    });
}
