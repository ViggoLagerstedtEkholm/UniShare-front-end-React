import axios from "axios";

export const Search = async (APIEndpoint, params) => {
    try {
        return await axios.get(APIEndpoint, {
            params,
            withCredentials: true
        });
    } catch (error) {
        return null;
    }
}

export default Search;