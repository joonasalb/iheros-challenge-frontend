import api from "./api";

const storeUser = async (data) => {
    try {
        const response = await api.post("/user/", data);
        return response.data;
    } catch (err) {
        return err.response.data;
    }
};

export { storeUser };
