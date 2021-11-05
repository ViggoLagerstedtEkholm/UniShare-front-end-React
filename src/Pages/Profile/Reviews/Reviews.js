import FilterContent from "../../Shared/Search/FilterContent";
import {API} from "../../Shared/Constants";
import {useContext} from "react";
import {ProfileContext} from "../../Shared/Context/ProfileContext";
import {ReviewBox} from "./ReviewBox";

export const Reviews = () => {
    const {profileID} = useContext(ProfileContext);

    const startFilter = {
        Page: 1,
        Option: "Added",
        Order: "Descending",
        Search: null,
        ResultsPerPage: 3,
        Username: profileID
    }

    const selectOptions = new Map();
    selectOptions.set('Added', 'Added');
    selectOptions.set('Updated', 'Updated');
    selectOptions.set('Course name', 'Name');
    selectOptions.set('University', 'University');
    selectOptions.set('Difficulty', 'Difficulty');
    selectOptions.set('Environment', 'Environment');
    selectOptions.set('Fulfilling', 'Fulfilling');
    selectOptions.set('Grading', 'Grading');
    selectOptions.set('Overall', 'Overall');

    return (
        <FilterContent
            APIEndPoint={API + "/api/Search/user/reviews"}
            startFilter={startFilter}
            options={selectOptions}
            displayBox={ReviewBox}
            showFilterBox={false}
        />
    );
}