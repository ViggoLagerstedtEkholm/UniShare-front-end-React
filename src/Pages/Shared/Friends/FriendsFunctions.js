import axios from "axios";
import querystring from "querystring";

const config = {
    headers: {
        'Accept': 'application/json'
    }
};

export const FriendRequestSend = async (usersID) => {
    const params = {
        otherID: usersID
    }

    await axios.post("/request", querystring.stringify(params), config)
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

    await axios.post("/accept", querystring.stringify(params), config)
    .catch((error) => {
        console.log(error);
    });
}

export const RejectRequest = async (usersID) => {
    const params = {
        otherID: usersID
    }

    await axios.post("/reject", querystring.stringify(params), config)
    .catch((error) => {
        console.log(error);
    });
}

export const FriendRemove = async (usersID) => {
    const params = {
        otherID: usersID
    }

    await axios.post("/delete", querystring.stringify(params), config)
    .catch((error) => {
        console.log(error);
    });
}

export const GetPendingReceived = async () => {
    return await axios.get("/received/pending")
        .catch((error) => {
            console.log(error);
        });
}

export const GetPendingSent = async () => {
    return await axios.get("/sent/pending")
        .catch((error) => {
            console.log(error);
        });
}

export const GetFriends = async () => {
    return await axios.get("/get/friends")
        .catch((error) => {
            console.log(error);
        });
}
