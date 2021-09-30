import {useEffect, useState} from "react";
import axios from "axios";
import {SettingsForm} from "./SettingsForm";
import {API} from "../Shared/Constants";

function Settings() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [degrees, setDegrees] = useState([]);
    const [settings, setSettings] = useState(null);
    const [activeID, setActiveID] = useState(null);

    useEffect( () => {
        getSettings().then(() => setIsLoaded(true));
    }, [])

    async function getSettings() {
        await axios.get(API + '/settings/get', {withCredentials: true}).then(response => {
            setSettings(response['data']['data']);
        }).catch(error => {
            console.log(error);
        });

        await axios.get(API + "/degree/get/settings", {withCredentials: true}).then(response =>{
            setDegrees(response['data']);
        }).catch(error =>{
            console.log(error);
        });

        await axios.get(API + "/degree/get/active", {withCredentials: true}).then(response =>{
            setActiveID(response['data']);
        }).catch(error =>{
            console.log(error);
        });
    }

    return (
        <div className="container">
            {
                isLoaded ?<SettingsForm settings={settings} degrees={degrees} activeID={activeID}/> : <h4>Loading settings...</h4>
            }
        </div>
    );
}

export default Settings;