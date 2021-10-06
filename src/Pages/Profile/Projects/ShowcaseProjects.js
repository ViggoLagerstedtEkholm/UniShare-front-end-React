import axios from "axios";
import {useContext, useEffect, useState} from "react";
import ProjectBox from "./ProjectBox";
import {ProfileContext} from "../../Shared/Context/ProfileContext";
import {API} from "../../Shared/Constants";
import {Loading} from "../../Shared/State/Loading";

function ShowcaseProjects() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [results, setResults] = useState([]);
    const {profileID} = useContext(ProfileContext);

    useEffect(() => {
        const getProjects = async () => {
            await axios.get(API + "/project/get/all",  {
                params: {
                    profileID: profileID
                }
            })
                .then(
                    response => {
                        console.log(response);
                        setResults(response)
                    }
                )
                .catch((error) => {
                    console.log(error);
                });
        }

        getProjects().then(() => setIsLoaded(true));
    }, [profileID]);


    return (
        <div>
            {isLoaded ? <ProjectBox results={results}/> : <Loading/>}
        </div>
    );
}

export default ShowcaseProjects;