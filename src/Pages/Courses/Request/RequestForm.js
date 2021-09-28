import Form from "react-validation/build/form";
import axios from "axios";
import {API} from "../../Shared/Constants";

export function RequestForm() {

    const uploadRequest = async (e) => {
        e.preventDefault();

        const name = e.target.name.value;
        const credits = e.target.credits.value;
        const duration = e.target.duration.value;
        const country = e.target.country.value;
        const city = e.target.city.value;
        const university = e.target.university.value;
        const description = e.target.description.value;

        const formData = new FormData();
        formData.append('name', name);
        formData.append('credits', credits);
        formData.append('duration', duration);
        formData.append('country', country);
        formData.append('city', city);
        formData.append('university', university);
        formData.append('description', description);

        const config = {
            headers: {
                'Accept': 'application/json'
            }
        };

        await axios.post(API + "/request/upload", formData, config).then(response => {
            window.location.reload();
        }).catch(error => {
            console.log(error);
        });
    }


    return (
        <div className="user-input-form-box">
            <h3> Enter course</h3>
            <form onSubmit={uploadRequest}>
                <input className="user-input-text" type="text" name="name" placeholder="Course name"/>
                <input className="user-input-text" type="number" name="credits" placeholder="Credits"/>
                <input className="user-input-text" type="number" name="duration"
                       placeholder="Duration (months)"/>
                <input className="user-input-text" type="text" name="country" placeholder="Country"/>
                <input className="user-input-text" type="text" name="city" placeholder="City"/>
                <input className="user-input-text" type="text" name="university"
                       placeholder="@University"/>
                <textarea id="description" className="user-input-text" name="description"
                          placeholder="Enter description"/>
                <p>
                    <input className="button-style-1" type="submit" name="submit_project" value="Upload"/>
                </p>
            </form>
        </div>
    );
}