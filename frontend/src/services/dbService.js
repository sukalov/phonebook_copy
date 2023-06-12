import axios from 'axios';
const url = '/api/persons';

const getAll = () => {
    const result = axios.get(url)
    return result.then(res => res.data);
}

let token
const setToken = newToken => {
    if (newToken !== null) token = `Bearer ${newToken}`
    else token = null
}

const create = async newPerson => {
    const config = {headers: { Authorization: token },}
    const response = await axios.post(url, newPerson, config)
    return response.data
}

const update = async (person) => {
    const config = {headers: { Authorization: token }}
    const response = await axios.put(`${url}/${person.id}`, person, config)
    return response.data
}

const del = (person) => {
    const config = {headers: { Authorization: token }}
    const result = axios.delete(`${url}/${person.id}`, config)
    return result
}

// eslint-disable-next-line
export default {getAll, create, update, del, setToken}