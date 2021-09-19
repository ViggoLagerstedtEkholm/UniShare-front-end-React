import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {CourseContext} from "../../Shared/Context/CourseContext";

import Message from "../../Shared/Files/Message";
import {HUD} from "./HUD";

export const SideHUD = () => {
    const [HUDInfo, setHUDInfo] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [message, setMessage] = useState('');
    const {courseID} = useContext(CourseContext);

    useEffect(async () => {
        await fetchData();
    }, [])

    async function fetchData() {
        try {
            const response = await axios.get("/course/get", {
                params: {
                    courseID: courseID
                }
            })

            setHUDInfo(response);
            setIsLoaded(true);
        } catch (error) {
            setMessage("Could not load data.");
        }
    }

    return (
        <div className="user-profile">
            {message ? <Message msg={message}/> : null}
            {isLoaded ? <HUD attributes={HUDInfo}/> : <h1>Loading...</h1>}
        </div>
    );
}