import FilterContent from "../../Shared/Search/FilterContent";
import {ForumBox} from "./ForumBox";

const Forums = () => {
    const startFilter = {
        page: 1,
        filterOption: "views",
        filterOrder: "DESC",
        search: null,
        results_per_page_count: 7,
        ID: null
    }
    const optionFilter = ['title', 'topic', 'views', 'created'];

    return (
        <div className="container">
            <FilterContent
                APIEndPoint={"/search/forums"}
                startFilter={startFilter}
                optionFilter={optionFilter}
                displayBox={ForumBox}
                showFilterBox={true}
            />
        </div>
    );
}

export default Forums;