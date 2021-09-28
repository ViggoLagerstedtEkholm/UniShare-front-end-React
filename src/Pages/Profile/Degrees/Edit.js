import axios from "axios";
import {Redirect} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "../../Shared/Context/UserContext";
import {API} from "../../Shared/Constants";

function Edit(props) {
    const [isLoaded, setIsLoaded] = useState(false);
    const {user} = useContext(UserContext);
    const [name, setName] = useState('');
    const [fieldOfStudy, setFieldOfStudy] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [university, setUniversity] = useState('');

    const degreeID = props.match.params.degreeID;

    useEffect(() => {
        const getProject = async () => {
            await axios.get(API + "/degree/get", {
                params: {
                    degreeID: degreeID
                }
            }).then(
                response => {
                    console.log(response);
                    const data = response.data['data']['degree'];
                    setCity(data['city']);
                    setCountry(data['country']);
                    setEndDate(data['end_date']);
                    setFieldOfStudy(data['fieldOfStudy']);
                    setName(data['name']);
                    setStartDate(data['start_date']);
                    setUniversity(data['university']);

                }
            )
                .catch((error) => {
                    console.log(error);
                });
        }

        getProject().then(() => setIsLoaded(true));
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('degreeID', degreeID);
        formData.append('field_of_study', fieldOfStudy);
        formData.append('start_date', startDate);
        formData.append('end_date', endDate);
        formData.append('country', country);
        formData.append('city', city);
        formData.append('university', university);
        formData.append('name', name);

        const config = {
            headers: {
                'Accept': 'application/json'
            }
        };

        axios.post("/degree/update", formData, config).then(() => {
            const path = "/profile/" + user["userID"];
            props.history.push(path);
        }).catch(error => {
            console.log(error);
        });
    }

    const onNameChanged = (e) => {
        const name = e.target.value;
        setName(name);
    }

    const onFieldOfStudyChanged = (e) => {
        const fieldOfStudy = e.target.value;
        setFieldOfStudy(fieldOfStudy);
    }

    const onSetStartDate = (e) => {
        const startDate = e.target.value;
        setStartDate(startDate);
    }

    const onSetEndDate = (e) => {
        const endDate = e.target.value;
        setEndDate(endDate);
    }

    const onSetCountry = (e) => {
        const country = e.target.value;
        setCountry(country);
    }

    const onSetCity = (e) => {
        const city = e.target.value;
        setCity(city);
    }

    const onSetUniversity = (e) => {
        const university = e.target.value;
        setUniversity(university);
    }


    return (
        <div className="container">
            <div className="content-container">
                <div className="flex-item">
                    {isLoaded ?         <div className="user-input-form-box">
                        <form onSubmit={onSubmit}>
                            <h4>
                                Degree name
                            </h4>
                            <input className="user-input-text" type="text" placeholder="Degree name" value={name} onChange={onNameChanged}/>
                            <h4>
                                Field of study
                            </h4>
                            <input className="user-input-text" type="text" value={fieldOfStudy} onChange={onFieldOfStudyChanged}
                                   placeholder="Field of study"/>
                            <h4>
                                Start date
                            </h4>
                            <input className="user-input-text" type="date" value={startDate} onChange={onSetStartDate}/>
                            <h4>
                                End date
                            </h4>
                            <input className="user-input-text" type="date" value={endDate} onChange={onSetEndDate}/>
                            <h4>
                                Country
                            </h4>
                            <input className="user-input-text" type="text" value={country} onChange={onSetCountry}
                                   placeholder="Country"/>
                            <h4>
                                City
                            </h4>
                            <input className="user-input-text" type="text" value={city} onChange={onSetCity}
                                   placeholder="City"/>
                            <h4>
                                University
                            </h4>
                            <input className="user-input-text" type="text" value={university} onChange={onSetUniversity}
                                   placeholder="University"/>
                            <p>
                                <input className="button-style-1" type="submit"
                                       name="submit_project" value="Upload"/>
                            </p>
                        </form>
                    </div>: null}
                </div>
            </div>
        </div>
    );
}

export default Edit;
