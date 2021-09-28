import FilterContent from "../../Shared/Search/FilterContent";
import {ForumBox} from "./ForumBox";
import {Link} from "react-router-dom";
import {API} from "../../Shared/Constants";

const Forums = () => {
    const startFilter = {
        page: 1,
        filterOption: "views",
        filterOrder: "DESC",
        search: null,
        results_per_page_count: 7,
        ID: null
    }

    const selectOptions = new Map();
    selectOptions.set('Title', 'title');
    selectOptions.set('Topic', 'topic');
    selectOptions.set('Views', 'views');
    selectOptions.set('Created', 'created');

    return (
        <div className="container">
            <Link to="/forum/add" className="button-style-1">Add forum</Link>

            <FilterContent
                APIEndPoint={API + "/search/forums"}
                startFilter={startFilter}
                options={selectOptions}
                displayBox={ForumBox}
                showFilterBox={true}
            />
        </div>
    );
}

export default Forums;