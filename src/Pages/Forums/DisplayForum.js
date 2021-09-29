import {useEffect, useState} from "react";
import axios from "axios";
import FilterContent from "../Shared/Search/FilterContent";
import {PostBox} from "./Post/PostBox";
import {PostAdd} from "./Post/PostAdd";
import {API} from "../Shared/Constants";

export const DisplayForum = (props) => {
    const [forum, setForum] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    const forumID = props.match.params.forumID;

    useEffect(() => {
        const getForum = async () => {
            await axios.get(API + "/forum/get", {
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

    const selectOptions = new Map();
    selectOptions.set('Date', 'date');
    selectOptions.set('Username', 'userDisplayName');

    return (
        <div className="container">
                {
                    isLoaded ?
                        <div>
                            <div className="forum-display-info">
                                <h3>Title: {forum['title']}</h3>
                                <h3>Created: {forum['created']}</h3>
                                <h3>Views: {forum['views']}</h3>
                            </div>

                            <br/>

                            <PostAdd forumID={forumID}/>

                            <FilterContent
                                APIEndPoint={API + "/search/posts"}
                                startFilter={startFilter}
                                options={selectOptions}
                                displayBox={PostBox}
                                showFilterBox={false}
                            />
                    </div> : <h1>Loading...</h1>
                }

        </div>

    );
}
