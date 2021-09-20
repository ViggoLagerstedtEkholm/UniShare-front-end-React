import {SideHUD} from "./HUD/SideHUD";
import {useMemo, useState} from "react";
import {CourseContext} from "../Shared/Context/CourseContext";
import {Main} from "./Main/Main";
import {ReviewBox} from "./Review/ReviewBox";
import FilterContent from "../Shared/Search/FilterContent";
import {Link} from "react-router-dom";
import {AddReview} from "./Review/AddReview";
import {AddReviewForm} from "./Review/AddReviewForm";

function Courses(props) {
    const [courseID, setCourseID] = useState(props.match.params.courseID);
    const value = useMemo(() => ({courseID, setCourseID}), [courseID, setCourseID]);

    const startFilter = {
        page: 1,
        filterOption: "helpful",
        filterOrder: "DESC",
        search: null,
        results_per_page_count: 7,
        ID: courseID
    }
    const optionFilter = ['helpful', 'userDisplayName'];

    return (
        <div class="container">
            <div class="content-container">
                <div class="fixed">
                    <CourseContext.Provider value={value}>
                        <SideHUD/>
                    </CourseContext.Provider>
                </div>
                <div class="flex-item">
                    <CourseContext.Provider value={value}>
                        <Main/>
                    </CourseContext.Provider>
                </div>
            </div>

            <hr/>

            <div className="button-box">
                <CourseContext.Provider value={value}>
                    <AddReview/>
                </CourseContext.Provider>
            </div>

            <div class="course-sections">
                <FilterContent
                    APIEndPoint={"/search/reviews"}
                    startFilter={startFilter}
                    optionFilter={optionFilter}
                    displayBox={ReviewBox}
                    showFilterBox={false}
                />
            </div>
        </div>
    );
}

export default Courses;
