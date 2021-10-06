import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {HUD} from "./HUD";
import {ProfileContext} from "../../Shared/Context/ProfileContext";
import {API} from "../../Shared/Constants";
import {Loading} from "../../Shared/State/Loading";

function SideHUD() {
    const [HUDInfo, setHUDInfo] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    const {profileID} = useContext(ProfileContext);

    useEffect(async () => {
        await fetchData();
    }, [])

    async function fetchData() {
        await axios.get(API + "/profile/get", {
            params: {
                profileID: profileID
            }
        }).then(response => {
            setHUDInfo(response);
        });

        setIsLoaded(true);
    }

    return (
        <div className="profile-side-information">
            {isLoaded ? <HUD attributes={HUDInfo}/> : <Loading/>}
        </div>
    );
}

export default SideHUD;
