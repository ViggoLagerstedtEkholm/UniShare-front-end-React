import {RequestBox} from "./RequestBox";
import FilterContent from "../../Shared/Search/FilterContent";
import {API} from "../../Shared/Constants";

export const Request = () => {

    const startFilter = {
        page: 1,
        filterOption: "date",
        filterOrder: "DESC",
        search: null,
        results_per_page_count: 7,
        ID: null
    }

    const selectOptions = new Map();
    selectOptions.set('Date', 'date');
    selectOptions.set('Credits', 'credits');
    selectOptions.set('Name', 'name');
    selectOptions.set('University', 'university');
    selectOptions.set('Country', 'country');

    return (
        <FilterContent
            APIEndPoint={API + "/search/requests"}
            startFilter={startFilter}
            options={selectOptions}
            displayBox={RequestBox}
            showFilterBox={true}
        />
    )
}
