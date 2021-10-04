import {useEffect, useState} from "react";
import axios from "axios";
import FilterContent from "../Shared/Search/FilterContent";
import {PostBox} from "./Post/PostBox";
import {PostAdd} from "./Post/PostAdd";
import {API} from "../Shared/Constants";
import {ShowcaseUser} from "../Home/ShowcaseUser";
import Collapsible from "react-collapsible";

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
                    console.log(response['data']);
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
    selectOptions.set('Posted', 'date');
    selectOptions.set('Username', 'userDisplayName');

    return (
        <div className="container">
                {
                    isLoaded ?
                        <div>
                            <h2>Thread starter</h2>
                            <hr/>
                            <ShowcaseUser ID={forum['creator']}/>
                            <hr/>
                            <div className="forum-display-info">
                                <h3>Title: {forum['title']}</h3>
                                <h3>Created: {forum['created']}</h3>
                                <h3>Views: {forum['views']}</h3>
                            </div>

                            <br/>

                            <Collapsible open={true} trigger="Write post">
                                <PostAdd forumID={forumID}/>
                            </Collapsible>
                            <br/>

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
