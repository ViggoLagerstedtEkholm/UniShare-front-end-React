import FilterContent from "../../Shared/Search/FilterContent";
import {API} from "../../Shared/Constants";
import {useContext} from "react";
import {ProfileContext} from "../../Shared/Context/ProfileContext";
import {ReviewBox} from "./ReviewBox";

export const Reviews = () => {
    const {profileID} = useContext(ProfileContext);

    const startFilter = {
        page: 1,
        filterOption: "added",
        filterOrder: "DESC",
        search: null,
        results_per_page_count: 3,
        ID: profileID
    }

    const selectOptions = new Map();
    selectOptions.set('Added date', 'added');

    return (
        <div>
            <h2>Ratings</h2>
            <hr/>
            <FilterContent
                APIEndPoint={API + "/search/profile/reviews"}
                startFilter={startFilter}
                options={selectOptions}
                displayBox={ReviewBox}
                showFilterBox={false}
            />
        </div>
    );
}