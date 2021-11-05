import {useContext, useEffect, useState} from "react";
import {UserContext} from "../../Shared/Context/UserContext";
import {ProfileContext} from "../../Shared/Context/ProfileContext";
import {API} from "../../Shared/Constants";
import {NoResults} from "../../Shared/Search/NoResults";
import api from "../../Service/api";
import {Loading} from "../../Shared/State/Loading";
import {DeleteProject, GetProjects} from "../../Service/ProjectService";

export function ProjectBox() {
    const {user} = useContext(UserContext);
    const {profileID} = useContext(ProfileContext);

    const [data, setData] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        GetProjects(profileID).then(response => {
            setData(response);
            setIsLoaded(true);
        });
    }, []);

    return(
        <div>
            {isLoaded ? renderResults() : <Loading/>}
        </div>
    );

    function renderResults(){
        if (data.length === 0) {
            return (<NoResults/>)
        }

        return data.map(function (data) {
            const added = new Date(data['added']).toDateString();
            const description = data['description'];
            const link = data['link'];
            const name = data['name'];
            const projectID = data['id'];

            let image = 'data:image/jpeg;base64,' + data['image'];

            let canSeeProfileEdits = false;
            if(user !== null){
                const currentLoggedIn = user['Username'];
                if (currentLoggedIn === profileID) {
                    canSeeProfileEdits = true;
                }
            }

            return (
                <div id={projectID} className="user-projects-box">
                    <div className="course-container">
                        <div className="project">
                            <div className="project-card">
                                <img src={image} alt='profile image' className="project-image"/>

                                <div className="project-line"/>

                                <div className="user-profile-project-description-box">
                                    <h2>{name}</h2>
                                    <hr/>

                                    <h2>Description</h2>
                                    <p className="responsive-text">
                                        {description}
                                    </p>

                                    <h2>External link</h2>

                                    <a href={link} target="popup" className="responsive-text white">{link}</a>

                                    <p>
                                        <b>Added: {added}</b>
                                    </p>
                                </div>
                            </div>
                            {
                                canSeeProfileEdits ?
                                    <div className="project-button-box">
                                        <form action={"/project/edit/" + projectID}>
                                            <button type="submit" className="button-style-4">Edit</button>
                                        </form>

                                        <button onClick={() =>{
                                            if (window.confirm("Do you want to delete this project?")) {
                                                DeleteProject(projectID).then(() => document.getElementById(projectID).remove())
                                            }
                                        }} type="submit" className="button-style-2">Delete</button>
                                </div>

                                : null
                            }
                        </div>
                    </div>
                </div>
            );
        })
    }
}