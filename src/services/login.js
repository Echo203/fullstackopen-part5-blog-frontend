import axios from 'axios'

const BASE_URL = '/api/login'

const login = async (credentials) => {
  const res = await axios.post(BASE_URL, credentials)
  return res.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { login }