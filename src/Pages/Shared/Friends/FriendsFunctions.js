import axios from "axios";
import querystring from "querystring";
import {API} from "../Constants";

const config = {
    headers: {
        'Accept': 'application/json'
    }
};

export const FriendRequestSend = async (usersID) => {
    const params = {
        otherID: usersID
    }

    await axios.post(API + "/request", querystring.stringify(params), config)
    .catch((error) => {
        console.log(error);
        alert('Error!');
    });
}

export const AcceptRequest = async (usersID) =>{
    console.log("ID: " + usersID);
    const params = {
        otherID: usersID
    }

    await axios.post(API + "/accept", querystring.stringify(params), config)
    .catch((error) => {
        console.log(error);
    });
}

export const RejectRequest = async (usersID) => {
    const params = {
        otherID: usersID
    }

    await axios.post(API + "/reject", querystring.stringify(params), config)
    .catch((error) => {
        console.log(error);
    });
}

export const FriendRemove = async (usersID) => {
    const params = {
        otherID: usersID
    }

    await axios.post(API + "/delete", querystring.stringify(params), config)
    .catch((error) => {
        console.log(error);
    });
}

export const GetPendingReceived = async () => {
    return await axios.get(API + "/received/pending")
        .catch((error) => {
            console.log(error);
        });
}

export const GetPendingSent = async () => {
    return await axios.get(API + "/sent/pending")
        .catch((error) => {
            console.log(error);
        });
}

export const GetFriends = async () => {
    return await axios.get(API + "/get/friends")
        .catch((error) => {
            console.log(error);
        });
}
