import { BaseService } from "../../shared/services/base.service.js";
import axios from "axios";

export class ClientService extends BaseService {
    constructor() {
        super("clients");
    }

    async getByUserId(userId) {
        this.setToken();
        let url = this.baseURL + '/users/' + userId + '/' + this.endpoint;
        return axios.get(url, this.httpOptions);
    }

    async getByRuc(ruc) {
        const response = await this.getAll();
        const clients = response.data;
        const client = clients.find(client => client.ruc === ruc);
        return client || null;
    }
}