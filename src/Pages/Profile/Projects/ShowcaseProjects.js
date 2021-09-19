import axios from "axios";
import {useContext, useEffect, useState} from "react";
import ProjectBox from "./ProjectBox";
import {ProfileContext} from "../../Shared/Context/ProfileContext";

function ShowcaseProjects() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [results, setResults] = useState([]);
    const {profileID} = useContext(ProfileContext);

    useEffect(() => {
        const getProjects = async () => {
            await axios.get("/project/get/all",  {
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
            {isLoaded ? <ProjectBox results={results}/> : <h1>Loading...</h1>}
        </div>
    );
}

export default ShowcaseProjects;