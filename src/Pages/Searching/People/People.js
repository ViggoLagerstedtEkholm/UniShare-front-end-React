import FilterContent from "../../Shared/Search/FilterContent";
import {PeopleBox} from "./PeopleBox";

const People = () => {
    const startFilter = {
        page: 1,
        filterOption: "visits",
        filterOrder: "DESC",
        search: null,
        results_per_page_count: 7,
        ID: null
    }

    const selectOptions = new Map();
    selectOptions.set('Username', 'userDisplayName');
    selectOptions.set('Visits', 'visits');
    selectOptions.set('Last online', 'lastOnline');
    selectOptions.set('First name', 'userFirstName');
    selectOptions.set('Last name', 'userLastName');
    selectOptions.set('Joined', 'joined');

    return (
        <div className="container">
            <FilterContent
                APIEndPoint={"/search/people"}
                startFilter={startFilter}
                options={selectOptions}
                displayBox={PeopleBox}
                showFilterBox={true}
            />
        </div>
    );
}

export default People;