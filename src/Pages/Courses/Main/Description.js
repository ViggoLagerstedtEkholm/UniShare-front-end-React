import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {CourseContext} from "../../Shared/Context/CourseContext";

export const Description = () => {
    const [description, setDescription] = useState(null);
    const {courseID} = useContext(CourseContext);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(async () => {
        await getCourse();
    }, [])

    const getCourse = async () => {
        const params = {
            params:{
                courseID: courseID
            }
        }

        try{
            await axios.get("/course/get", params).then(response =>{
                console.log(response['data'][0]['description']);
                const description = response['data'][0]['description'];
                setDescription(description);
                setIsLoaded(true);
            });


        }catch(error){
            console.log(error);
        }
    }

    return (
        <div className="course-sections">
            {isLoaded ?
                <div>
                    <div className="course-info">
                        <p>Description</p>
                    </div>

                    <div className="review-text">
                        {
                            description.length === 0 ? <h4>No description set!</h4> : null
                        }
                        {description}
                    </div>
                </div>

                :
                <h1>Loading...</h1>
            }
        </div>
    );
}
