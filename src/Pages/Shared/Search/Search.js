import axios from "axios";

export const Search = async (APIEndpoint, params, page) => {
    try {
        return await axios.get(APIEndpoint, {
            params,
        });
    } catch (error) {
        return null;
    }
}

export default Search;