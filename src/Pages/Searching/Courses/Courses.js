import FilterContent from "../../Shared/Search/FilterContent";
import {CourseBox} from "./CourseBox";
import {Link} from "react-router-dom";
import {API} from "../../Shared/Constants";

const Courses = () => {
    const startFilter = {
        page: 1,
        filterOption: "average_rating",
        filterOrder: "DESC",
        search: null,
        results_per_page_count: 7,
        ID: null
    }

    const selectOptions = new Map();
    selectOptions.set('Name', 'name');
    selectOptions.set('Credits', 'credits');
    selectOptions.set('Rating', 'average_rating');
    selectOptions.set('Added', 'added');
    selectOptions.set('City', 'city');
    selectOptions.set('Country', 'country');
    selectOptions.set('University', 'university');
    selectOptions.set('Code', 'code');

    return (
        <div className="container">
            <h2>Courses</h2>
            <hr/>
            <FilterContent
                APIEndPoint={API + "/search/courses"}
                startFilter={startFilter}
                options={selectOptions}
                displayBox={CourseBox}
                showFilterBox={false}
            />
        </div>
    );
}

export default Courses;