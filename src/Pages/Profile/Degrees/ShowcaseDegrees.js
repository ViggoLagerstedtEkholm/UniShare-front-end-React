import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {DegreesBox} from "./DegreesBox";
import {ProfileContext} from "../../Shared/Context/ProfileContext";
import {API} from "../../Shared/Constants";
import {Loading} from "../../Shared/State/Loading";

function ShowcaseDegrees() {
    const [attributes, setAttributes] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const {profileID} = useContext(ProfileContext);

    useEffect(async () => {
        await fetchData();
    }, [isLoaded])

    async function fetchData() {
        await axios.get(API + "/degree/get/all",{
            params: {
                profileID: profileID
            }
        }).then(response => {
            setAttributes(response);
            setIsLoaded(true);
        });
    }

    return (
        <div>
            {isLoaded ?  <DegreesBox attributes={attributes}/>: <Loading/>}
        </div>
    );
}

export default ShowcaseDegrees;
