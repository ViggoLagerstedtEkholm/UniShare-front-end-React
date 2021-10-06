import {useEffect, useState} from "react";
import axios from "axios";
import FilterContent from "../Shared/Search/FilterContent";
import {PostBox} from "./Post/PostBox";
import {PostAdd} from "./Post/PostAdd";
import {API} from "../Shared/Constants";
import Collapsible from "react-collapsible";
import NotFound from "../Shared/Error/NotFound";
import {ShowcaseUser} from "../Home/ShowcaseUser";
import {Loading} from "../Shared/State/Loading";

export const DisplayForum = (props) => {
    const [forum, setForum] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [forumExists, setForumExists] = useState(false);
    const forumID = props.match.params.forumID;

    useEffect(() => {
        checkIfForumExists().then((response) =>{
            if(response){
                setForumExists(true);
                setForum(response);
            }
            setIsLoaded(true);
        });
    }, []);

    const checkIfForumExists = async () => {
        const promise =  axios.get(API + "/forum/get", {
            params: {
                forumID: forumID
            }
        });

        return promise.then((response) => response.data).catch(() => null);
    }

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
            {isLoaded ? <div>
                    {
                        forumExists ?
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
                            </div> : <NotFound/>
                    }
                </div> :
                <Loading/>
            }
        </div>

    );
}
