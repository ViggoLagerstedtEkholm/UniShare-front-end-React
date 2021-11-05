import FilterContent from "../../Shared/Search/FilterContent";
import {CourseBox} from "./CourseBox";
import {API} from "../../Shared/Constants";
import {UserContext} from "../../Shared/Context/UserContext";
import {useContext} from "react";

const Courses = () => {
    const {user} = useContext(UserContext);

    const startFilter = {
        Page: 1,
        Option: "Rating",
        Order: "Descending",
        Search: "",
        ActiveDegreeUserId : user ? user.Id : null,
        ResultsPerPage: 7,
    }

    const selectOptions = new Map();
    selectOptions.set('Name', 'Name');
    selectOptions.set('Credits', 'Credits');
    selectOptions.set('Added', 'Added');
    selectOptions.set('Country', 'Country');
    selectOptions.set('City', 'City');
    selectOptions.set('University', 'University');
    selectOptions.set('Code', 'Code');
    selectOptions.set('Link', 'Link');
    selectOptions.set('Rating', 'Rating');

    return (
        <div className="container">
            <h2 className="logo">Courses</h2>
            <hr/>
            <FilterContent
                APIEndPoint={API + "/api/Search/courses"}
                startFilter={startFilter}
                options={selectOptions}
                displayBox={CourseBox}
                showFilterBox={false}
            />
        </div>
    );
}

export default Courses;