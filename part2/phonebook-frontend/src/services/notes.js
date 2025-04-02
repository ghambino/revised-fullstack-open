import axios from 'axios';
const baseUrl = 'http://localhost:3050/persons';

const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then(response => response.data)
}

const create = (newObject) => {
    const request = axios.post(baseUrl, newObject);
    return request.then(response => response.data)
}

const erase = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then(response => response.data); 
}

const adjust = (id, adjustedData) => {
    const request = axios.put(`${baseUrl}/${id}`, adjustedData);
    return request.then(response => response.data);
}

const noteService = {
    getAll: getAll, 
    create: create,
    erase: erase,
    adjust: adjust
};
export default noteService