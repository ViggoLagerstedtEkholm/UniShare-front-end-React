import FilterContent from "../../Shared/Search/FilterContent";
import {PeopleBox} from "./PeopleBox";
import {API} from "../../Shared/Constants";
import {useContext} from "react";
import {UserContext} from "../../Shared/Context/UserContext";

const People = () => {
    const {user} = useContext(UserContext);

    const startFilter = {
        Page: 1,
        Option: "Visits",
        Order: "Descending",
        Search: "",
        ResultsPerPage: 7,
        CurrentUserId: user ? user.Id : null,
    }

    const selectOptions = new Map();
    selectOptions.set('Username', 'Username');
    selectOptions.set('Visits', 'Visits');
    selectOptions.set('Last online', 'LastSeenDate');
    selectOptions.set('First name', 'Firstname');
    selectOptions.set('Last name', 'Lastname');
    selectOptions.set('Joined', 'Joined');

    return (
        <div className="container">
            <h2 className="logo">People</h2>
            <hr/>
            <FilterContent
                APIEndPoint={API + "/api/Search/users"}
                startFilter={startFilter}
                options={selectOptions}
                displayBox={PeopleBox}
                showFilterBox={false}
            />
        </div>
    );
}

export default People;