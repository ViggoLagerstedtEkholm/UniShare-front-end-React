import {CourseContext} from "../../Shared/Context/CourseContext";
import {Add} from "./Add";
import FilterContent from "../../Shared/Search/FilterContent";
import {API} from "../../Shared/Constants";
import {ReviewBox} from "./ReviewBox";
import {useContext} from "react";
import {UserContext} from "../../Shared/Context/UserContext";

export const Review = () =>{
    const {courseID} = useContext(CourseContext);
    const {user} = useContext(UserContext);

    const startFilter = {
        Page: 1,
        Option: "Username",
        Order: "Descending",
        Search: null,
        ResultsPerPage: 7,
        CourseID: courseID
    }

    const selectOptions = new Map();
    selectOptions.set('Username', 'Username');
    selectOptions.set('Added', 'Added');
    selectOptions.set('Updated', 'Updated');

    return(
      <div>


          {user ?
          <div>
              <h2>Write a review</h2>
              <hr/>
              <Add/>
          </div>: null}

          <h2>Reviews</h2>
          <hr/>

          <FilterContent
              APIEndPoint={API + "/api/Search/reviews"}
              startFilter={startFilter}
              options={selectOptions}
              displayBox={ReviewBox}
              showFilterBox={false}
          />
      </div>
    );
}