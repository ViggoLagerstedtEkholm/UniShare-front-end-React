import api from "../../Service/api";

export const Search = async (APIEndpoint, params) => {
    try {
        return await api.post(APIEndpoint, params);
    } catch (error) {
        return error;
    }
}

export default Search;