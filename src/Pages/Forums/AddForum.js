export const AddForum = () => {

    return (
        <div className="container">
            <div className="content-container">
                <div className="flex-item">
                    <div className="user-input-form-box">
                        <form action="/UniShare/forum/add">
                            <h1>Create forum post</h1>
                            <h4>
                                Title
                            </h4>
                            <input className="user-input-text" type="text" name="title" placeholder="Title"/>

                            <h4>
                                Topic
                            </h4>
                            <input className="user-input-text" type="text" name="topic" placeholder="Topic"/>

                            <h4>
                                Text - (ATLEAST 200 characters)
                            </h4>
                            <input className="user-input-text" type="text" name="text" placeholder="Text"/>

                            <p>
                                <input className="button-style-1" type="submit" name="submit_project"
                                       value="AddForum forum"/>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>

);
}
