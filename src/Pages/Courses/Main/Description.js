import {useContext, useEffect, useState} from "react";
import {CourseContext} from "../../Shared/Context/CourseContext";
import {Loading} from "../../Shared/State/Loading";
import {CheckIfCourseExists} from "../../Service/CourseService";

export const Description = () => {
    const [description, setDescription] = useState(null);
    const {courseID} = useContext(CourseContext);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect( () => {
        CheckIfCourseExists(courseID).then(response =>{
            setDescription(response.description);
            setIsLoaded(true);
        })
    }, [])

    return (
        <div className="course-sections course-shadow">
            {isLoaded ?
                <div>
                    <div className="course-info">
                        <p>Description</p>
                    </div>

                    <div className="responsive-text">
                        {
                            description.length === 0 ? <h4>No description set!</h4> : null
                        }
                        <p>
                            {description}
                        </p>
                    </div>
                </div>
                :
                <Loading/>
            }
        </div>
    );
}
