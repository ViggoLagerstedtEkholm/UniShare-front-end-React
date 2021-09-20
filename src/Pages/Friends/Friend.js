import axios from "axios";
import {useEffect, useState} from "react";
import {GetFriends, GetPendingReceived, GetPendingSent} from "../Shared/Friends/FriendsFunctions";
import {FriendList} from "./FriendList";
import {Received} from "./Received";
import {Sent} from "./Sent";

export function Friend (){
    const [isLoaded, setIsLoaded] = useState(false);
    const [friends, setFriends] = useState([]);
    const [received, setPendingReceived] = useState([]);
    const [sent, setPendingSent] = useState([]);

    useEffect(async () => {
        await getData();
    }, []);

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
                        <Received received={received}/>
                    </div>
                    <div className="column friend-columns">
                        <h1>Friends</h1>
                        <hr/>
                        <FriendList friends={friends}/>
                    </div>
                    <div className="column friend-columns">
                        <h1>Sent</h1>
                        <hr/>
                        <Sent sent={sent}/>
                    </div>
                </div>: <h4>Loading friends...</h4>
            }
        </div>

    );
}