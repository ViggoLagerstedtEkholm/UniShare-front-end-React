import {useContext, useEffect, useState} from "react";
import {Loading} from "../Shared/State/Loading";
import {UserContext} from "../Shared/Context/UserContext";
import {Link} from "react-router-dom";
import {FetchImage, FetchUser} from "../Service/UserService";
import userImage from '../../images/ProfileDefault.png';

export const ShowcaseUser = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [profile, setProfile] = useState(null);
    const {user} = useContext(UserContext);
    const [image, setImage] = useState(false);
    const [imageIsLoaded, setImageIsLoaded] = useState(false);

    useEffect(async () => {
        FetchUser(user.Username).then(response => {
            setProfile(response);
            setIsLoaded(true);
        });

        FetchImage(user.Username).then(response => {
            if(response.data){
                setImage(`data:image/jpeg;base64,${response.data}`);
            }
            else{
                setImage(userImage);
            }
            setImageIsLoaded(true);
        });
    }, [])

    return (
        <div>
            {
            profile ?  <div className="startpage-display-user">
               <div className="content-card-body">
                   {isLoaded ?
                       <div className="card-info">
                           <div className="content-card-image">
                               {
                                   imageIsLoaded ?
                                       <img src={image}
                                       alt="USER IMAGE"/> : null
                               }
                           </div>

                           <span className="vertical-line"/>

                           <div className="content-card-info">
                               <h4><b>Personal information</b></h4>
                               <p><b>First name:</b> {profile['firstname']}</p>
                               <p><b>Last name:</b> {profile['lastname']}</p>
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
                               <Link className="button-style-4" to={'/profile/' + user['Username']}>Profile</Link>
                           </div>
                           <span className="vertical-line"/>
                       </div> : <Loading/>
                   }
               </div>
           </div> : null
        }
        </div>
    )
}

