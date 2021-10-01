import FilterContent from "../../Shared/Search/FilterContent";
import {RatingsBox} from "./RatingsBox";
import {API} from "../../Shared/Constants";
import {useContext} from "react";
import {ProfileContext} from "../../Shared/Context/ProfileContext";

export const Ratings = () => {
    const {profileID} = useContext(ProfileContext);

    const startFilter = {
        page: 1,
        filterOption: "added",
        filterOrder: "DESC",
        search: null,
        results_per_page_count: 7,
        ID: profileID
    }

    const selectOptions = new Map();
    selectOptions.set('Name', 'name');
    selectOptions.set('Course code', 'code');
    selectOptions.set('Credits', 'credits');
    selectOptions.set('University', 'university');

    return (
        <div>
            <h2>Ratings</h2>
            <hr/>
            <FilterContent
                APIEndPoint={API + "/search/profile/ratings"}
                startFilter={startFilter}
                options={selectOptions}
                displayBox={RatingsBox}
                showFilterBox={false}
            />
        </div>
    );
}