export const PeopleBox = (results) => {
    const path = results.results['users'];
    if(path.length === 0){
        return (<div><h4 className="review">No people results!</h4></div>)
    }

    return path.map(function (data) {
        const firstname = data['userFirstName'];
        const lastname = data['userLastName'];
        const username = data['userDisplayName'];
        const visits = data['visits'];
        let image = data['userImage'];
        const usersID = data['usersID'];
        const lastOnline = data['lastOnline'];

        if(image === ""){
            image = "/images/user.png";
        }else{
            image = 'data:image/jpeg;base64,' + image;
        }

        return (
            <div className="content-card-body">
                <div className="content-user">
                    <div className="content-card-image">
                        <img src={image}  alt="USER IMAGE"/>
                    </div>

                    <div className="content-card-info">
                        <h4><b>Personal information</b></h4>
                        <p><b>First name:</b> {firstname}</p>
                        <p><b>Last name:</b> {lastname}</p>
                        <p><b>Username: </b> {username}</p>
                    </div>

                    <div className="content-card-info">
                        <h4><b>Personal information</b></h4>
                        <p><b>Visits:</b> {visits}</p>
                        <p><b>Last online:</b> {lastOnline}</p>
                    </div>

                    <div className="content-card-info-buttons">
                        <form action={'/profile/' + usersID} method="get">
                            <button className="button-style-1" type="submit">Profile</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    });
}
