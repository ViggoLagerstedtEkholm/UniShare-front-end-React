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
    const optionFilter = ['userDisplayName', 'visits', 'lastOnline'];

    return (
        <div className="container">
            <FilterContent
                APIEndPoint={"/search/people"}
                startFilter={startFilter}
                optionFilter={optionFilter}
                displayBox={PeopleBox}
                showFilterBox={true}
            />
        </div>
    );
}

export default People;