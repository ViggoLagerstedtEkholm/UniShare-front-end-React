import {SideHUD} from "./HUD/SideHUD";
import {useEffect, useMemo, useState} from "react";
import {CourseContext} from "../Shared/Context/CourseContext";
import {Main} from "./Main/Main";
import {ReviewBox} from "./Review/ReviewBox";
import FilterContent from "../Shared/Search/FilterContent";
import {AddReview} from "./Review/AddReview";
import {API} from "../Shared/Constants";
import NotFound from "../Shared/Error/NotFound";
import {Loading} from "../Shared/State/Loading";
import {checkIfCourseExists} from "../Service/CourseService";

function Courses(props) {
    const [courseID, setCourseID] = useState(props.match.params.courseID);
    const value = useMemo(() => ({courseID, setCourseID}), [courseID, setCourseID]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [courseExists, setCourseExists] = useState(false);

    useEffect( () => {
        checkIfCourseExists(courseID).then((response) =>{
            if(response){
                setCourseExists(true);
            }
            setIsLoaded(true);
        });
    }, []);

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
    selectOptions.set('Added', 'added');
    selectOptions.set('Updated', 'updated');

    return (
        <div class="container">
            {isLoaded ? <div>
                    {
                        courseExists ?
                            <div>
                                <div className="content-container">
                                    <div className="flex-item">
                                        <CourseContext.Provider value={value}>
                                            <Main/>
                                        </CourseContext.Provider>
                                    </div>
                                    <div className="fixed">
                                        <CourseContext.Provider value={value}>
                                            <SideHUD/>
                                        </CourseContext.Provider>
                                    </div>
                                </div>

                                <hr/>

                                <h2>Write a review</h2>
                                <hr/>

                                <CourseContext.Provider value={value}>
                                    <AddReview/>
                                </CourseContext.Provider>

                                <h2>Reviews</h2>
                                <hr/>

                                <FilterContent
                                    APIEndPoint={API + "/search/reviews"}
                                    startFilter={startFilter}
                                    options={selectOptions}
                                    displayBox={ReviewBox}
                                    showFilterBox={false}
                                />
                            </div> : <NotFound/>
                    }
                </div> :
                <Loading/>
            }
        </div>
    );
}

export default Courses;
