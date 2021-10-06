export const HUD = (attributes) => {
    console.log(attributes);
    const courseInfo = attributes.attributes;

    const name = courseInfo['name'];
    const credits = courseInfo['credits'];
    const added = courseInfo['added'];
    const country = courseInfo['country'];
    const city = courseInfo['city'];
    const university = courseInfo['university'];
    const link = courseInfo['link'];

    return (
        <div>
            <h3>
                {name}
            </h3>

            <div>
                <h4>
                    Link
                </h4>
            </div>

            <p>
                <a href={link} target="popup">{link}</a>
            </p>

            <hr/>

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

            <hr/>

            <div>
                <h5>
                    Added
                </h5>
            </div>

            <p>
                {added}
            </p>
        </div>
    );
}