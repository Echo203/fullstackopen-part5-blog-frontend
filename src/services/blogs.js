import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
  // axios.defaults.headers.common['Authorization'] = token;

}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const postBlog = async (blogObject) => {
  const config = {
    headers: { 'Authorization': token },
  }
  const res = await axios.post(baseUrl, blogObject, config)
  return res.data
}

const updateBlog = async (blogObject, id) => {
  const config = {
    headers: { 'Authorization': token },
  }
  const res = await axios.put(`${baseUrl}/${id}`, blogObject, config)
  return res.data
}

const deleteBlog = async (id) => {
  const config = {
    headers: { 'Authorization': token },
  }
  const res = await axios.delete(`${baseUrl}/${id}`, config)
  return res.data
}

export default { getAll, setToken, postBlog, updateBlog, deleteBlog }