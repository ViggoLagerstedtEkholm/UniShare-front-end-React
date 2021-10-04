import userImage from "../../images/user.png";
import axios from "axios";
import {API} from "../Shared/Constants";
import {useEffect, useState} from "react";

export const ShowcaseUser = (userID) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [profile, setProfile] = useState(null);
    const ID = userID.ID;

    useEffect(async () => {
        fetchData().then(() => setIsLoaded(true));
    }, [])

    const fetchData = async () => {
        const options = {
            params:{
                userID: ID
            },
            withCredentials: true
        }

        await axios.get(API + '/get/user', options).then(response => {
            console.log(response);
            setProfile(response.data['data']);
        }).catch(error => {
            console.log(error.response);
        });
    }

    return (
        <div className="startpage-display-user">
            <div className="content-card-body">
                {isLoaded ?
                <div className="content-user">
                    <div className="content-card-image">
                        <img
                            src={profile['image'] === "" ? userImage : 'data:image/jpeg;base64,' + profile['image']}
                            alt="USER IMAGE"/>
                    </div>

                    <span className="vertical-line"/>

                    <div className="content-card-info">
                        <h4><b>Personal information</b></h4>
                        <p><b>First name:</b> {profile['firstName']}</p>
                        <p><b>Last name:</b> {profile['lastName']}</p>
                        <p><b>Email: </b>{profile['email']}</p>
                    </div>

                    <span className="vertical-line"/>

                    <div className="content-card-info">
                        <h4><b>Profile information</b></h4>
                        <p><b>Visits:</b> {profile['visits']}</p>
                        <p><b>Last online:</b> {profile['lastOnline']}</p>
                    </div>
                    <span className="vertical-line"/>

                    <div className="content-card-info-buttons">
                        <form action={'/profile/' + profile['ID']}>
                            <button className="button-style-4" type="submit">Profile</button>
                        </form>
                    </div>
                    <span className="vertical-line"/>
                    </div> : <h4>Loading user...</h4>
                }
            </div>
        </div>
    )
}

