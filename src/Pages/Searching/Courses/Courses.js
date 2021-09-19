import FilterContent from "../../Shared/Search/FilterContent";
import {CourseBox} from "./CourseBox";

const Courses = () => {
    const startFilter = {
        page: 1,
        filterOption: "average_rating",
        filterOrder: "DESC",
        search: null,
        results_per_page_count: 7,
        ID: null
    }

    const optionFilter = ['name', 'credits', 'duration', 'average_rating', 'added', 'city', 'country', 'university'];

    return (
        <div className="container">
            <FilterContent
                APIEndPoint={"/search/courses"}
                startFilter={startFilter}
                optionFilter={optionFilter}
                displayBox={CourseBox}
                showFilterBox={true}
            />
        </div>
    );
}

export default Courses;