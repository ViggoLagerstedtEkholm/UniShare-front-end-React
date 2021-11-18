import {SideHUD} from "./HUD/SideHUD";
import {useEffect, useMemo, useState} from "react";
import {CourseContext} from "../Shared/Context/CourseContext";
import {Main} from "./Main/Main";
import NotFound from "../Shared/Error/NotFound";
import {Loading} from "../Shared/State/Loading";
import {CheckIfCourseExists} from "../Service/CourseService";
import {useParams} from "react-router-dom";
import {Review} from "./Review/Review";

function Courses() {
    const {ID} = useParams();
    const [courseID, setCourseID] = useState(ID);
    const value = useMemo(() => ({courseID, setCourseID}), [courseID, setCourseID]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [courseExists, setCourseExists] = useState(false);
    const [header, setHeader] = useState(false);

    useEffect( () => {
        setIsLoaded(false);
        setCourseExists(false);
        setCourseID(ID);

        CheckIfCourseExists(courseID).then((response) =>{
            if(response){
                setHeader(response.name);
                setCourseExists(true);
            }
            setIsLoaded(true);
        }).catch(() =>{
            setCourseExists(false);
            setIsLoaded(true);
        });
    }, [ID]);

    return (
        <div class="container">
            <CourseContext.Provider value={value}>
            <div className="course-header-text">{header}</div>
            {isLoaded ?
                <div>
                    {
                    courseExists ?
                        <div>
                            <hr/>
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
