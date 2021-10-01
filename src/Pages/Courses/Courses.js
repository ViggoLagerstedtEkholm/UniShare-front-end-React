import {SideHUD} from "./HUD/SideHUD";
import {useMemo, useState} from "react";
import {CourseContext} from "../Shared/Context/CourseContext";
import {Main} from "./Main/Main";
import {ReviewBox} from "./Review/ReviewBox";
import FilterContent from "../Shared/Search/FilterContent";
import {AddReview} from "./Review/AddReview";
import {API} from "../Shared/Constants";

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

    const selectOptions = new Map();
    selectOptions.set('Helpful', 'helpful');
    selectOptions.set('Username', 'userDisplayName');

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

            <h2>Write a review</h2>
            <hr/>

            <div className="button-box">
                <CourseContext.Provider value={value}>
                    <AddReview/>
                </CourseContext.Provider>
            </div>

            <h2>Reviews</h2>
            <hr/>

            <FilterContent
                APIEndPoint={API + "/search/reviews"}
                startFilter={startFilter}
                options={selectOptions}
                displayBox={ReviewBox}
                showFilterBox={false}
            />
        </div>
    );
}

export default Courses;
