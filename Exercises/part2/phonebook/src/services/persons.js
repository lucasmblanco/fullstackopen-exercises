import axios from "axios";

const personsUrl = '/api/persons'

function getPersons() {
    return axios.get(personsUrl).then(response => response.data)
}

function create(person) {
    return axios.post(personsUrl, person)
}

function remove(id){
    return axios.delete(`${personsUrl}/${id}`)
}

function editNumber(id, person) {
    return axios.put(`${personsUrl}/${id}`, person)
}

export {getPersons, create, remove, editNumber}