export function Received ({received}) {

    return received.map(function (data) {
        const username = data['userDisplayName'];
        const userImage = data['userImage'];
        const userID = data['usersID'];

        return (
            <div className="friend-pending">
                <div className="row">
                    <div className="column friend-columns">
                        <p>Username: {username}</p>
                    </div>

                </div>
                <div className="row">
                    <div className="column friend-columns">
                        <form action={"/profile/" +userID}>
                            <button className="button-style-4" type="submit" id="addComment" value="PostBox comment">Profile</button>
                        </form>
                    </div>

                    <div className="column friend-columns">
                        <button className="button-style-4" type="submit" id="addComment" value="PostBox comment">Remove</button>
                    </div>
                </div>
            </div>
        )
    });
}