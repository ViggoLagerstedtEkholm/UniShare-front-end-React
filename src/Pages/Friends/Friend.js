import axios from "axios";
import {useEffect, useState} from "react";
import {GetFriends, GetPendingReceived, GetPendingSent} from "../Shared/Friends/FriendsFunctions";
import {FriendList} from "./FriendList";
import {Received} from "./Received";
import {Sent} from "./Sent";
import {Link} from "react-router-dom";

export function Friend() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [friends, setFriends] = useState([]);
    const [received, setPendingReceived] = useState([]);
    const [sent, setPendingSent] = useState([]);
    const [update, setUpdate] = useState(1);
    useEffect(async () => {
        await getData();
    }, [update]);

    const onUpdate = () => {
        setUpdate(update + 1);
    }

    async function getData() {
        const friends = await GetFriends().then(response => {
            console.log(response);
            setFriends(response.data);
        });

        const received = await GetPendingReceived().then(response => {
            setPendingReceived(response.data);
        });

        const sent = await GetPendingSent().then(response => {
            setPendingSent(response.data);
        });

        Promise.all([friends, received, sent]).then(() => {
            setIsLoaded(true);
        });
    }

    return (
        <div className="container">
            {
                isLoaded ?
                    <div className="row">
                        <div className="column friend-columns">
                            <h1>Received</h1>
                            <hr/>
                            {
                                received.length !== 0 ? <Received received={received} onUpdate={onUpdate}/> :
                                    <h4>No received requests.</h4>
                            }
                        </div>
                        <div className="column friend-columns">
                            <h1>Friends</h1>
                            <hr/>
                            {
                                friends.length !== 0 ? <FriendList friends={friends} onUpdate={onUpdate}/> :
                                    <h4>No friends. Please visit <Link to={"/search/people"}> Search friends </Link> To add friends!</h4>
                            }
                        </div>
                        <div className="column friend-columns">
                            <h1>Sent</h1>
                            <hr/>
                            {
                                sent.length !== 0 ? <Sent sent={sent} onUpdate={onUpdate}/> : <h4>No sent requests.</h4>
                            }
                        </div>
                    </div> : <h4>Loading friends...</h4>
            }
        </div>

    );
}