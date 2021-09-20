import {useEffect, useState} from "react";
import axios from "axios";
import FilterContent from "../Shared/Search/FilterContent";
import {PostBox} from "./Post/PostBox";
import {PostAdd} from "./Post/PostAdd";

export const DisplayForum = (props) => {
    const [forum, setForum] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    const forumID = props.match.params.forumID;

    useEffect(() => {
        const getForum = async () => {
            await axios.get("/forum/get", {
                params: {
                    forumID: forumID
                }
            }).then(
                response => {
                    setForum(response['data']);
                }
            )
            .catch((error) => {
                console.log(error);
            });
        }

        getForum().then(() => setIsLoaded(true));
    }, []);

    const startFilter = {
        page: 1,
        filterOption: "date",
        filterOrder: "DESC",
        search: null,
        results_per_page_count: 7,
        ID: forumID
    }

    const optionFilter = ['date', 'userDisplayName'];

    return (
        <div className="container">
            <div className="content-container">
                {
                    isLoaded ?
                        <div className="startpage-flex-item">
                            <div className="forum-display-info">
                                <h3>Title: {forum['title']}</h3>
                                <h3>Created: {forum['created']}</h3>
                                <h3>Views: {forum['views']}</h3>
                            </div>

                            <br/>

                            <PostAdd forumID={forumID}/>

                            <div className="display-result-box filter-background-box">
                                <FilterContent
                                    APIEndPoint={"/search/posts"}
                                    startFilter={startFilter}
                                    optionFilter={optionFilter}
                                    displayBox={PostBox}
                                    showFilterBox={false}
                                />
                            </div>
                    </div> : <h1>Loading...</h1>
                }

            </div>
        </div>

    );
}
