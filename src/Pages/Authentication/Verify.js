import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {VerifyEmail} from "../Service/AuthenticationService";
import {Loading} from "../Shared/State/Loading";

export function Verify(props) {
    const query = new URLSearchParams(props.location.search);

    const Id = query.get('Id');
    const Token = query.get('Token');

    const [isVerified, setIsVerified] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(async () => {
        const credentials = {
            Id : Id,
            Token : Token
        }

        VerifyEmail(credentials).then(() => {
            setIsVerified(true);
            setIsLoaded(true);

        }).catch(() =>{
            setIsVerified(false);
            setIsLoaded(true);
        });

    },[]);

    return (
        <div className="container">
            {
                isLoaded ? null : <Loading/>
            }

            {
                isVerified ?
                    <div>
                        <h2>Email is verified!</h2>
                        <Link to={"/login"} className="button-style-4">Login</Link>
                    </div>
                    :
                    <h2>Email is not verified</h2>
            }
        </div>
    );
}