import courseImage from '../../../images/books.png';

export const HUD = (attributes) => {
    const courseInfo = attributes.attributes.data[0];

    const name = courseInfo['name'];
    const credits = courseInfo['credits'];
    const duration = courseInfo['duration'];
    const added = courseInfo['added'];
    const country = courseInfo['country'];
    const city = courseInfo['city'];
    const university = courseInfo['university'];

    return (
        <div>
            <div className="user-profile">
                <div className="user-image">
                    <img src={courseImage} alt="USER IMAGE"/>
                </div>

                <hr/>

                <div>
                    <h3>
                        Course name
                    </h3>
                </div>

                <p>
                    {name}
                </p>

                <div>
                    <h3>
                        Credits
                    </h3>
                </div>

                <p>
                    {credits}
                </p>

                <div>
                    <h3>
                        Duration (YEARS)
                    </h3>
                </div>

                <p>
                    {duration}
                </p>

                <div>
                    <h3>
                        Added
                    </h3>
                </div>

                <p>
                    {added}
                </p>

                <div>
                    <h3>
                        Country
                    </h3>
                </div>

                <p>
                    {country}
                </p>

                <div>
                    <h3>
                        City
                    </h3>
                </div>

                <p>
                    {city}
                </p>

                <div>
                    <h3>
                        University
                    </h3>
                </div>

                <p>
                    {university}
                </p>

                <p>
                    Sell literature here!
                </p>
            </div>
        </div>
    );
}