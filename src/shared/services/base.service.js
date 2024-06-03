import axios from "axios"

export class BaseService {
    constructor(endpoint) {
        this.baseURL = "https://cargoappwebservice.azurewebsites.net/api/v1";
        this.endpoint = endpoint;
    }

    endpointPath() {
        return `${this.baseURL}/${this.endpoint}`;
    }

    getOne(id){
        return axios.get(`${this.endpointPath()}/${id}`);
    }

    getAll(){
        return axios.get(this.endpointPath());
    }

    create(data){
        return axios.post(this.endpointPath(), data);
    }

    update(id, data){
        return axios.put(`${this.endpointPath()}/${id}`, data);
    }

    delete(id){
        return axios.delete(`${this.endpointPath()}/${id}`);
    }

}