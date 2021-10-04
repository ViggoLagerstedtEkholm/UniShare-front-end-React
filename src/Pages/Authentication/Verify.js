import {useEffect, useState} from "react";
import axios from "axios";
import {API} from "../Shared/Constants";
import {Link, useHistory} from "react-router-dom";

export function Verify(props) {
    const email = props.match.params.email;
    const hash = props.match.params.hash;
    const [isVerified, setIsVerified] = useState(false);
    let history = useHistory();

    useEffect(async () => {
        verify().then(() => {

        });
    },[]);

    const verify = async () =>{
        const data = new FormData();
        data.append('email', email);
        data.append('hash', hash);

        await axios.post(API + "/verify", data).then(response => {
            console.log(response);
            setIsVerified(true);
        })
        .catch((error) => {
            console.log(error);
            console.log(error.response);
        });
    }

    return (
        <div className="container">
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