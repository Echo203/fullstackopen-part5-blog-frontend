import axios from "axios";

const BASE_URL = '/api/login'

let token = null

const login = async (credentials) => {
    const res = await axios.post(BASE_URL, credentials)
    return res.data
}

const setToken = (newToken) => {
    token = `bearer ${newToken}`
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { login, setToken }