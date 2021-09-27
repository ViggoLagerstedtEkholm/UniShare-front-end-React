import userImage from "../../images/user.png";

export const ShowcaseUser = (data) => {
    const arrayData = data['data']['data'];
    const firstname = arrayData['firstName'];
    const lastname = arrayData['lastName'];
    const email = arrayData['email'];
    const visits = arrayData['visits'];
    const lastOnline = arrayData['lastOnline'];
    let image = arrayData['image'];
    const ID = arrayData['userID'];

    if (image === "") {
        image = userImage;
    } else {
        image = 'data:image/jpeg;base64,' + image;
    }

    return (
        <div className="startpage-display-user">
            <div className="content-card-body">
                <div className="content-user">
                    <div className="content-card-image">
                        <img src={image} alt="USER IMAGE"/>
                    </div>

                    <span className="vertical-line"/>

                    <div className="content-card-info">
                        <h4><b>Personal information</b></h4>
                        <p><b>First name:</b> {firstname}</p>
                        <p><b>Last name:</b> {lastname}</p>
                        <p><b>Email: </b>{email}</p>
                    </div>

                    <span className="vertical-line"/>

                    <div className="content-card-info">
                        <h4><b>Profile information</b></h4>
                        <p><b>Visits:</b> {visits}</p>
                        <p><b>Last online:</b> {lastOnline}</p>
                    </div>
                    <span className="vertical-line"/>

                    <div className="content-card-info-buttons">
                        <form action={'/profile/' + ID}>
                            <button className="button-style-4" type="submit">Profile</button>
                        </form>
                    </div>
                    <span className="vertical-line"/>
                </div>
            </div>
        </div>
    )
}

