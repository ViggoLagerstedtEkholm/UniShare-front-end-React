import axios from "axios";
import {Redirect} from "react-router-dom";
import {useContext, useState} from "react";
import {UserContext} from "../../Shared/Context/UserContext";
import {ProfileContext} from "../../Shared/Context/ProfileContext";
import querystring from "querystring";

function ProjectBox(results) {
    const {user} = useContext(UserContext);
    const {profileID} = useContext(ProfileContext);

    console.log(results.results.data['projects']);
    const path = results.results.data['projects'];
    if (path.length === 0) {
        return (<div><h4 className="review">No projects!</h4></div>)
    }

    return path.map(function (data, i) {
        const added = data['added'];
        const description = data['description'];
        const link = data['link'];
        const name = data['name'];
        const projectID = data['projectID'];

        let image = 'data:image/jpeg;base64,' + data['image'];

        let canSeeProfileEdits = false;
        if(user !== null){
            const currentLoggedIn = user['userID'];
            if (currentLoggedIn === profileID) {
                canSeeProfileEdits = true;
            }
        }

        const onDelete = async () => {
            const params = {
                projectID: projectID
            }

            const config = {
                headers: {
                    'Accept': 'application/json'
                }
            };

            await axios.post("/project/delete", querystring.stringify(params), config).then(response => {
                console.log(response);
                document.getElementById(projectID).remove();
                }
            )
            .catch((error) => {
                alert('Error!');
            });
        }

        return (
            <div id={projectID} className="user-projects-box">
                <div className="course-container">
                    <div className="project">
                        <div className="project-card">
                            <img src={image} alt='profile image' className="project-image"/>

                            <div className="project-line"/>

                            <div className="user-profile-project-description-box">
                                <h2>Name</h2>
                                <p>{name}</p>

                                <h2>Description</h2>
                                <p className="project-description">
                                    {description}
                                </p>

                                <h2>External link</h2>

                                <a href={link}>{link}</a>

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

                                    <button onClick={onDelete} type="submit" className="button-style-2">Delete</button>
                            </div>

                            : null
                        }
                    </div>
                </div>
            </div>
        );
    })
}

export default ProjectBox;