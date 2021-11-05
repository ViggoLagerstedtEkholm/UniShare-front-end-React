import {SideHUD} from "./HUD/SideHUD";
import {useEffect, useMemo, useState} from "react";
import {CourseContext} from "../Shared/Context/CourseContext";
import {Main} from "./Main/Main";
import NotFound from "../../../../microlabscasefrontend/src/Components/Error/NotFound";
import {Loading} from "../Shared/State/Loading";
import {CheckIfCourseExists} from "../Service/CourseService";
import {Review} from "./Review/Review";

function Courses(props) {
    const [courseID, setCourseID] = useState(props.match.params.courseID);
    const value = useMemo(() => ({courseID, setCourseID}), [courseID, setCourseID]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [courseExists, setCourseExists] = useState(false);
    const [header, setHeader] = useState(false);

    useEffect( () => {
        CheckIfCourseExists(courseID).then((response) =>{
            if(response){
                setHeader(response.name);
                setCourseExists(true);
            }
            setIsLoaded(true);
        });
    }, []);

    return (
        <div class="container">
            <CourseContext.Provider value={value}>
            <div className="course-header-text">{header}</div>
            <hr/>
            {isLoaded ?
                <div>
                    {
                    courseExists ?
                        <div>
                            <div className="content-container-course">
                                <div className="course-flex-item">
                                    <Main/>
                                </div>
                                <div className="course-fixed">
                                    <SideHUD/>
                                </div>
                            </div>

                            <Review/>
                        </div> : <NotFound/>
                    }
                </div> :
                <Loading/>
            }
            </CourseContext.Provider>
        </div>
    );
}

export default Courses;
