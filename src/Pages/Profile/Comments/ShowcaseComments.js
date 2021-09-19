import CommentForm from "./CommentForm";
import FilterContent from "../../Shared/Search/FilterContent";
import {CommentBox} from "./CommentBox";
import {useContext} from "react";
import {ProfileContext} from "../../Shared/Context/ProfileContext";

function ShowcaseComments() {
    const {profileID} = useContext(ProfileContext);

    const startFilter = {
        page: 1,
        filterOption: "date",
        filterOrder: "DESC",
        search: null,
        results_per_page_count: 7,
        ID: profileID
    }

    const optionFilter = ['text', 'date', 'userDisplayName'];

    return (
        <div >
            <CommentForm/>
            <FilterContent
                APIEndPoint={"/search/comments"}
                startFilter={startFilter}
                optionFilter={optionFilter}
                displayBox={CommentBox}
                showFilterBox={false}
            />
        </div>
    );
}

export default ShowcaseComments;
