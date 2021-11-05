import {useContext, useState} from "react";
import {CourseContext} from "../../Shared/Context/CourseContext";
import {validText} from "../../Shared/RegEx/Review";
import {AddReview} from "../../Service/ReviewService";

export const ReviewForm = ({review}) => {
    const doNotHaveExistingReview = review === null || review.data === null || review.data === "";
    const {courseID} = useContext(CourseContext);
    const [fulfilling, setFulfilling] = useState(doNotHaveExistingReview ? 1 : review.data['fulfilling']);
    const [environment, setEnvironment] = useState(doNotHaveExistingReview ? 1 : review.data['environment']);
    const [difficulty, setDifficulty] = useState(doNotHaveExistingReview ? 1 : review.data['difficulty']);
    const [grading, setGrading] = useState(doNotHaveExistingReview ? 1 : review.data['grading']);
    const [literature, setLiterature] = useState(doNotHaveExistingReview ? 1 : review.data['litterature']);
    const [overall, setOverall] = useState(doNotHaveExistingReview ? 1 : review.data['overall']);
    const [text, setText] = useState(doNotHaveExistingReview ? "" : review.data['text']);

    const validate = (e) => {
        e.preventDefault();

        const textError = checkText(e.target.text.value);

        if(!textError){
            onSubmit();
        }
    }

    const onSubmit = () => {
        const review = {
            CourseID : courseID,
            Fulfilling : fulfilling,
            Environment : environment,
            Difficulty : difficulty,
            Grading : grading,
            Literature : literature,
            Overall : overall,
            Text : text
        }

        AddReview(review).then(() => window.location.reload())
    }

    const checkText = (text) => {
        let error;
        if (!validText.test(text)) {
            error = true;
            document.getElementById("text").style.background = "rgb(250,138,131)";
        } else {
            error = false;
            document.getElementById("text").style.background = "white";
        }
        return error;
    }

    return (
        <div>
            <div className="title-bar">
                <form onSubmit={validate}>
                    <div className="course-rate-box">
                        <div className="course-rate-cell">
                            <h4>Fulfilling</h4>
                            <select value={fulfilling} onChange={(e) => {
                                setFulfilling(e.target.value);
                            }}>
                                <option value="1">1 (Default)</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                            </select>
                        </div>

                        <div className="course-rate-cell">
                            <h4>Environment</h4>
                            <select value={environment} onChange={(e) =>{
                                setEnvironment(e.target.value);
                            }}>
                                <option value="1">1 (Default)</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                            </select>
                        </div>

                        <div className="course-rate-cell">
                            <h4>Difficulty</h4>
                            <select value={difficulty} onChange={(e) =>{
                                setDifficulty(e.target.value);
                            }}>
                                <option value="1">1 (Default)</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                            </select>
                        </div>

                        <div className="course-rate-cell">
                            <h4>Grading</h4>
                            <select value={grading} onChange={(e) =>{
                                setGrading(e.target.value);
                            }}>
                                <option value="1">1 (Default)</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                            </select>
                        </div>

                        <div className="course-rate-cell">
                            <h4>Literature</h4>
                            <select value={literature} onChange={(e) =>{
                                setLiterature(e.target.value);
                            }}>
                                <option value="1">1 (Default)</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                            </select>
                        </div>

                        <div className="course-rate-cell">
                            <h4>Overall</h4>
                            <select value={overall} onChange={(e) =>{
                                setOverall(e.target.value);
                            }}>
                                <option value="1">1 (Default)</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                            </select>
                        </div>
                    </div>

                    <p>Word left to limit <b>{5000 - text.length}</b></p>
                    <textarea
                        id="text"
                        className="user-input-text" value={text}
                        maxLength={5000}
                        placeholder="Text"
                        onChange={(e) =>{
                            setText(e.target.value);
                            checkText(e.target.value);
                        }}
                    />
                    <p>
                        <input className="button-style-1" type="submit" name="submit_project" value="Upload"/>
                    </p>
                </form>
            </div>
            <div className="review-info">
                <ul>
                    <li>
                        1. The review needs to be at least 200 characters long.
                    </li>
                    <li>
                        2. Enter the score by picking 1-10 from the dropdown menus.
                    </li>
                    <li>
                        3. Do not spam or use any bad language, this will result in a temporary or a permanent ban.
                    </li>
                    <li>
                        4. Your review can be updated if you post it, but you can only have a total of 1 review per
                        course!
                    </li>
                </ul>
            </div>
        </div>
    );
}
