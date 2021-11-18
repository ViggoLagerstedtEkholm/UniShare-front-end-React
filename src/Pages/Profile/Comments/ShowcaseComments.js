import CommentForm from "./CommentForm";
import FilterContent from "../../Shared/Search/FilterContent";
import {CommentBox} from "./CommentBox";
import {API} from "../../Shared/Constants";
import {useContext} from "react";
import {ProfileContext} from "../../Shared/Context/ProfileContext";

function ShowcaseComments() {
    const {profileID} = useContext(ProfileContext);

    const startFilter = {
        Page: 1,
        Option: "Date",
        Order: "Descending",
        Search: null,
        ResultsPerPage: 7,
        ProfileId : profileID
    }

    const selectOptions = new Map();
    selectOptions.set('Added', 'Date');

    return (
        <div >
            <CommentForm/>

            <h2>Comments</h2>
            <hr/>

            <FilterContent
                APIEndPoint={API + "/api/Search/comments"}
                startFilter={startFilter}
                options={selectOptions}
                displayBox={CommentBox}
                showFilterBox={false}
            />
        </div>
    );
}

export default ShowcaseComments;
