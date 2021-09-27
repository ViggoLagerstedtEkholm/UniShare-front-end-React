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

    const selectOptions = new Map();
    selectOptions.set('Text', 'text');
    selectOptions.set('Date', 'date');
    selectOptions.set('Username', 'userDisplayName');

    return (
        <div >
            <CommentForm/>
            <FilterContent
                APIEndPoint={"/search/comments"}
                startFilter={startFilter}
                options={selectOptions}
                displayBox={CommentBox}
                showFilterBox={false}
            />
        </div>
    );
}

export default ShowcaseComments;
