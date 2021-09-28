import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {HUD} from "./HUD";
import {ProfileContext} from "../../Shared/Context/ProfileContext";
import {API} from "../../Shared/Constants";

function SideHUD() {
    const [HUDInfo, setHUDInfo] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    const {profileID} = useContext(ProfileContext);

    useEffect(async () => {
        await fetchData();
    }, [])

    async function fetchData() {
        await axios.get(API + "/profile/sideHUD", {
            params: {
                profileID: profileID
            }
        }).then(response => {
            setHUDInfo(response);
        });

        setIsLoaded(true);
    }

    return (
        <div className="user-profile">
            {isLoaded ? <HUD attributes={HUDInfo}/> : <h1>Loading...</h1>}
        </div>
    );
}

export default SideHUD;
