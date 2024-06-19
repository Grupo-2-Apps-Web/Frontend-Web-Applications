import axios from "axios"

export class BaseService {
    httpOptions = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    }

    constructor(endpoint) {
        this.baseURL = "http://localhost:5293/api/v1";
        this.endpoint = endpoint;
    }

    endpointPath() {
        return `${this.baseURL}/${this.endpoint}`;
    }

    getOne(id){
        return axios.get(`${this.endpointPath()}/${id}`, this.httpOptions);
    }

    getAll(){
        return axios.get(this.endpointPath(), this.httpOptions);
    }

    create(data){
        return axios.post(this.endpointPath(), data, this.httpOptions);
    }

    update(id, data){
        return axios.put(`${this.endpointPath()}/${id}`, data, this.httpOptions);
    }

    delete(id){
        return axios.delete(`${this.endpointPath()}/${id}`, this.httpOptions);
    }

}