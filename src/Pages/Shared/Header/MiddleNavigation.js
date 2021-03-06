import {Link} from "react-router-dom";

export const MiddleNavigation = () =>{
    return(
        <div id="header2">
            <ul className="nav-links">
                <li>
                    <Link to="/search/people">People</Link>
                </li>
                <li>
                    <Link to="/search/courses">Courses</Link>
                </li>
                <li>
                    <Link to="/courses/request/add">Request course</Link>
                </li>
            </ul>
        </div>
    );
}