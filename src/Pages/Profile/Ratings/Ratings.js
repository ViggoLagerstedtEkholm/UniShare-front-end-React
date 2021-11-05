import FilterContent from "../../Shared/Search/FilterContent";
import {RatingsBox} from "./RatingsBox";
import {API} from "../../Shared/Constants";
import {useContext} from "react";
import {ProfileContext} from "../../Shared/Context/ProfileContext";

export const Ratings = () => {
    const {profileID} = useContext(ProfileContext);

    const startFilter = {
        Page: 1,
        Option: "Rating",
        Order: "Descending",
        Search: null,
        ResultsPerPage: 7,
        ProfileId: profileID
    }

    const selectOptions = new Map();
    selectOptions.set('Name', 'Name');
    selectOptions.set('Course code', 'Code');
    selectOptions.set('Credits', 'Credits');
    selectOptions.set('University', 'University');
    selectOptions.set('Rating', 'Rating');

    return (
        <FilterContent
            APIEndPoint={API + "/api/Search/user/ratings"}
            startFilter={startFilter}
            options={selectOptions}
            displayBox={RatingsBox}
            showFilterBox={false}
        />
    );
}