import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {CourseContext} from "../../Shared/Context/CourseContext";
import {API} from "../../Shared/Constants";
import {Loading} from "../../Shared/State/Loading";

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
            await axios.get(API + "/course/get", params).then(response =>{
                const description = response.data['description'];
                setDescription(description);
                setIsLoaded(true);
            });


        }catch(error){
            console.log(error);
        }
    }

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
