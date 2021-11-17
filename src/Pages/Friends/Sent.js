import userImage from '../../images/ProfileDefault.png';
import {useEffect, useState} from "react";
import {CancelSentRequest, GetPendingSent} from "../Service/FriendService";
import {Loading} from "../Shared/State/Loading";
import {Link} from "react-router-dom";

export function Sent () {
    const [sent, setSent] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect( () => {
         GetPendingSent().then(response => {
            setSent(response);
            setIsLoaded(true);
        });
    }, []);

    return (
        <div>
            {isLoaded ?
                <div>
                    {renderSent()}
                </div> : <Loading/>
            }
        </div>
    );

    function renderSent() {
        console.log(sent);

        if(sent.length === 0){
            return (
              <h4>
                  No sent requests!
              </h4>
            );
        }

        return sent.map(function (data) {
            const username = data['username'];
            const usersId = data['userId'];

            let image = 'data:image/jpeg;base64,' + data['image'];
            if (!data['image']) {
                image = userImage;
            }

            return (
                <div className="friend-pending">
                    <div className="row">
                        <div className="content-card-image">
                            <img src={image} alt="User"/>
                        </div>

                        <div className="column friend-columns">
                            <p>Username: {username}</p>
                        </div>

                    </div>
                    <div className="row">
                        <div className="column friend-columns">
                            <Link className="button-style-4" to={"/profile/" + username}>Profiles</Link>
                        </div>

                        <div className="column friend-columns">
                            <button className="button-style-2" onClick={() => {
                                CancelSentRequest(usersId).then(() => window.location.reload());
                            }}>Remove</button>
                        </div>
                    </div>
                </div>
            )
        });
    }
}