import {useContext} from "react";
import {Graph} from '../../Shared/Graph/Graph';
import {Statistics} from "./Statistics";
import {Rating} from "./Rating";
import {Description} from "./Description";
import {UserContext} from "../../Shared/Context/UserContext";

export const Main = () => {
    const {user} = useContext(UserContext);

    return (
        <div className="course-content">
            <div className="course-container">
                <Statistics/>

                {
                    user ? <Rating/> : null
                }

                <Description/>

                <div className="graph-box course-info course-shadow">
                    <p>Ratings chart</p>
                    <Graph/>
                </div>
            </div>
        </div>
    );
}