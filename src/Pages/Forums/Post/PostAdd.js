export const PostAdd = (results) => {
    return (
        <div className="container">
            <div className="content-container">
                <div className="flex-item">
                    <div className="user-input-form-box">
                        <form method="post" action="/UniShare/post/add">
                            <input type="hidden" name="forumID" value="---forumID---"/>
                            <h4>
                                Add post
                            </h4>
                            <input id="text" className="user-input-text" type="text" name="text" placeholder="Text"/>

                            <p>
                                <input className="button-style-1" type="submit" name="submit_post" value="PostBox"/>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
