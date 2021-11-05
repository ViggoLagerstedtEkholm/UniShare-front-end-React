import {useEffect, useState} from "react";
import Collapsible from "react-collapsible";
import axios from "axios";
import {API} from "../Shared/Constants";
import Message from "../Shared/Files/Message";
import {Loading} from "../Shared/State/Loading";
import api from "../Service/api";

export function ActiveDegree() {
    const [activeDegreeID, setActiveDegreeID] = useState();
    const [degrees, setDegrees] = useState([]);
    const [message, setMessage] = useState('');
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect( () => {
        getDegreeData().then(() => setIsLoaded(true));
    }, [isLoaded])

    const getDegreeData = async () => {
        await api.get(API + "/api/Settings/degrees").then(response => {
            console.log(response.data);
            setDegrees(response.data);
        }).catch(error => {
            console.log(error);
        });

        await api.get(API + "/api/Settings/degrees/active").then(response => {
            console.log(response);
            setActiveDegreeID(response.data);
        }).catch(error => {
            console.log(error);
            setActiveDegreeID(null);
        });
    }

    const validate = (e) =>{
        e.preventDefault();

        if(activeDegreeID){
            onSubmit();
        }
    }

    const onSubmit = () =>{
        const formData = new FormData();
        formData.append('ActiveDegreeId', activeDegreeID);

        api.post(API + "/api/Settings/update/active", formData).then(() => {
            alert('Updated active degree');
        }).catch(error => {
            console.log(error);
        });
    }

    function populateDegrees() {
        return degrees.map(function (data) {
            const name = data['name'];
            const degreeID = data['id'];


            if (degreeID === activeDegreeID) {
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

                        <select id="degrees" name="activeDegreeID" value={activeDegreeID}
                                onChange={(e) =>{
                                    setActiveDegreeID(e.target.value);
                                }}>
                            <option value={-1} selected="selected">None</option>

                            {populateDegrees()}
                        </select>

                        </div>

                <button id="update" type="submit" className="button-style-4">Update active degree</button>
            </form>
            : <Loading/>}

        </Collapsible>
    );
}