import {useContext, useEffect, useState} from "react";
import {CourseContext} from "../../Shared/Context/CourseContext";
import {Loading} from "../../Shared/State/Loading";
import {CheckIfCourseExists} from "../../Service/CourseService";

export const SideHUD = () => {
    const [HUDInfo, setHUDInfo] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const {courseID} = useContext(CourseContext);
    const [added, setAdded] = useState(new Date());

    useEffect( () => {
        CheckIfCourseExists(courseID).then(response => {
            setHUDInfo(response);
            const addedDateTime = new Date(response['added']).toDateString() + " , " + new Date(response['added']).toTimeString();
            setAdded(addedDateTime);
            setIsLoaded(true);
        })
    }, [courseID])

    return (
        <div className="course-side-information">
            {isLoaded ?
                <div>
                    <h3>
                        {HUDInfo['name']}
                    </h3>

                    <div>
                        <h4>
                            Link
                        </h4>
                    </div>

                    <div className="responsive-text">
                        <a href={HUDInfo['link']} target="popup">{HUDInfo['link']}</a>
                    </div>

                    <hr/>

                    <div>
                        <h3>
                            Credits
                        </h3>
                    </div>

                    <p>
                        {HUDInfo['credits']}
                    </p>

                    <div>
                        <h3>
                            Country
                        </h3>
                    </div>

                    <p>
                        {HUDInfo['country']}
                    </p>

                    <div>
                        <h3>
                            City
                        </h3>
                    </div>

                    <p>
                        {HUDInfo['city']}
                    </p>

                    <div>
                        <h3>
                            University
                        </h3>
                    </div>

                    <p>
                        {HUDInfo['university']}
                    </p>

                    <hr/>

                    <div>
                        <h5>
                            Added
                        </h5>
                    </div>

                    <p>
                        {
                            added
                        }
                    </p>
                </div> : <Loading/>}
        </div>
    );
}