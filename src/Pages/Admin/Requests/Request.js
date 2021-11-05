import {RequestBox} from "./RequestBox";
import FilterContent from "../../Shared/Search/FilterContent";
import {API} from "../../Shared/Constants";

export const Request = () => {

    const startFilter = {
        Page: 1,
        Option: "Date",
        Order: "Descending",
        Search: null,
        ResultsPerPage: 7,
    }

    const selectOptions = new Map();
    selectOptions.set('Date', 'Date');
    selectOptions.set('Credits', 'Credits');
    selectOptions.set('Name', 'Name');
    selectOptions.set('University', 'University');
    selectOptions.set('Country', 'Country');

    return (
        <FilterContent
            APIEndPoint={API + "/api/Search/requests"}
            startFilter={startFilter}
            options={selectOptions}
            displayBox={RequestBox}
            showFilterBox={true}
        />
    )
}
