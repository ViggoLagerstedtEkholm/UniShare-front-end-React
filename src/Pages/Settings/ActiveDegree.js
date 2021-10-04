import {useEffect, useState} from "react";
import Collapsible from "react-collapsible";
import axios from "axios";
import {API} from "../Shared/Constants";
import Message from "../Shared/Files/Message";

export function ActiveDegree() {
    const [activeDegreeID, setActiveDegreeID] = useState();
    const [degrees, setDegrees] = useState([]);
    const [message, setMessage] = useState('');
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect( () => {
        getDegreeData().then(() => setIsLoaded(true));
    }, [isLoaded])

    const getDegreeData = async () => {
        await axios.get(API + "/degree/get/active", {withCredentials: true}).then(response => {
            setActiveDegreeID(response['data']);
        }).catch(error => {
            console.log(error);
        });

        await axios.get(API + "/degree/get/settings", {withCredentials: true}).then(response => {
            setDegrees(response['data']);
        }).catch(error => {
            console.log(error);
        });
    }

    const validate = (e) =>{
        e.preventDefault();
        console.log("ID" + activeDegreeID);

        if(activeDegreeID){
            onSubmit();
        }
    }

    const onSubmit = () =>{
        const formData = new FormData();
        formData.append('activeDegreeID', activeDegreeID);

        axios.post(API + "/settings/update/active/degree", formData, {withCredentials: true}).then(() => {
            alert('Updated active degree');
        }).catch(error => {
            setMessage(error.response);
        });
    }

    function populateDegrees() {
        return degrees.map(function (data) {
            const isActive = data['isActive'];
            const name = data['name'];
            const degreeID = data['degreeID'];

            if (isActive) {
                return (
                    <option value={degreeID} selected="selected">{name} - Active</option>
                )
            } else {
                return (
                    <option value={degreeID}>{name}</option>
                )
            }
        });
    }

    return (
        <Collapsible trigger="Change Active Degree">
            {message ? <Message msg={message}/> : null}

            <p>
                Select degree, if you don't have one go to Profile->Degrees->Upload new degree
            </p>

            {isLoaded ?
                    <form onSubmit={validate}>
                        <div className="project-card">

                        <select id="degrees" name="activeDegreeID"
                                onChange={(e) =>{
                                    setActiveDegreeID(e.target.value);
                                }}>
                            {populateDegrees()}
                        </select>

                        </div>

                <button id="update" type="submit" className="button-style-4">Update active degree</button>
            </form>
            : <h4>Loading degrees.</h4>}

        </Collapsible>
    );
}