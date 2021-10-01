import courseImage from '../../../images/books.png';

export const RatingsBox = ({results, filter}) => {
    const path = results['ratings'];
    const searchWord = filter['search'] ?? "";

    if(path.length === 0){
        return (<div><h4 className="review">No course results!</h4></div>)
    }

    return path.map(function (data) {
        const name = data['name'];
        const code = data['code'];
        const credits = data['credits'];
        const university = data['university'];
        const rating = data['rating'];
        const courseID = data['courseID'];
        const city = data['city'];

        const getHighlightedText = (text, highlight) =>{
            highlight = highlight.toString();
            const parts = text.toString().split(new RegExp(`(${highlight})`, 'gi'));
            return <span> { parts.map((part, i) =>
                <span key={i} style={part.toLowerCase() === highlight.toLowerCase() ? { 'background-color': 'rgba(255,234,0,0.59)' } : {} }>
            { part }
        </span>)
            } </span>;
        }

        return (
            <div className="content-card-body">
                <div className="content-user">
                    <div className="content-card-image">
                        <img src={courseImage} alt="USER IMAGE"/>
                    </div>

                    <div className="content-card-info">
                        <h4><b>Course information</b></h4>
                        <p><b>Name:</b> {getHighlightedText(name, searchWord)}</p>
                        <p><b>Credits:</b> {getHighlightedText(credits, searchWord)}</p>
                        <p><b>University: </b> {getHighlightedText(university, searchWord)}</p>
                        <p><b>Code: </b> {getHighlightedText(code, searchWord)}</p>
                        <p><b>City: </b> {getHighlightedText(city, searchWord)}</p>
                    </div>

                    <div className="content-card-info">
                        <h4><b>Score</b></h4>
                        <p><b>Score:</b> {rating}</p>
                    </div>

                    <div className="content-card-info-buttons">
                        <form action={"/courses/" + courseID} >
                            <button className="button-style-1" type="submit">Go to course</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    });
}
