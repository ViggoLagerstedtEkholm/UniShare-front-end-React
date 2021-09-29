import axios from "axios";
import {useContext, useState} from "react";
import {CourseContext} from "../../Shared/Context/CourseContext";
import {API} from "../../Shared/Constants";

export const AddReviewForm = ({review}) => {
    const doNotHaveExistingReview = review === null || review.data.data['result'] === null;
    const {courseID} = useContext(CourseContext);
    const [fulfilling, setFulfilling] = useState( doNotHaveExistingReview ? 1 : review.data.data['result']['fulfilling']);
    const [environment, setEnvironment] = useState(doNotHaveExistingReview ? 1 : review.data.data['result']['environment']);
    const [difficulty, setDifficulty] = useState(doNotHaveExistingReview? 1 : review.data.data['result']['difficulty']);
    const [grading, setGrading] = useState(doNotHaveExistingReview ? 1 : review.data.data['result']['grading']);
    const [literature, setLiterature] = useState(doNotHaveExistingReview ? 1 : review.data.data['result']['litterature']);
    const [overall, setOverall] = useState(doNotHaveExistingReview ? 1  : review.data.data['result']['overall']);
    const [text, setText] = useState(doNotHaveExistingReview ? "" : review.data.data['result']['text']);

    const onFulfillingChanged = (e) => {
        const fulfilling = e.target.value;
        setFulfilling(fulfilling);
    }

    const onEnvironmentChanged = (e) => {
        const environment = e.target.value;
        setEnvironment(environment);
    }

    const onDifficultyChanged = (e) => {
        const difficulty = e.target.value;
        setDifficulty(difficulty);
    }

    const onGradingChanged = (e) => {
        const grading = e.target.value;
        setGrading(grading);
    }

    const onLiteratureChanged = (e) => {
        const literature = e.target.value;
        setLiterature(literature);
    }

    const onOverallChanged = (e) => {
        const overall = e.target.value;
        setOverall(overall);
    }

    const onTextChanged = (e) => {
        const text = e.target.value;
        setText(text);
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('courseID', courseID);
        formData.append('fulfilling', fulfilling);
        formData.append('environment', environment);
        formData.append('difficulty', difficulty);
        formData.append('grading', grading);
        formData.append('literature', literature);
        formData.append('overall', overall);
        formData.append('text', text);

        await axios.post(API + "/review/upload", formData, { withCredentials: true }).then(() => {
            window.location.reload();
        }).catch(error => {
            console.log(error);
        });
    }

    return (
        <div>
            <div className="user-input-form-box">
                <form onSubmit={onSubmit}>
                    <div className="course-rate-box">
                        <div className="course-rate-cell">
                            <h4>Fulfilling</h4>
                            <select value={fulfilling} onChange={onFulfillingChanged}>
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
                            <select value={environment} onChange={onEnvironmentChanged}>
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
                            <select value={difficulty} onChange={onDifficultyChanged}>
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
                            <select value={grading} onChange={onGradingChanged}>
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
                            <select value={literature} onChange={onLiteratureChanged}>
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
                            <select value={overall} onChange={onOverallChanged}>
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

                    <h4>
                        Write a review
                    </h4>

                    <p>Word left to limit <b>{5000 - text.length}</b></p>
                    <textarea className="user-input-text" value={text} onChange={onTextChanged} maxLength={5000} placeholder="Text"/>
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
