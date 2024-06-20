import { BaseService } from "../../shared/services/base.service.js";
import axios from "axios";

export class ClientService extends BaseService {
    constructor() {
        super("clients");
    }

    async getByUserId(userId) {
        this.setToken();
        let url = this.baseURL + '/users/' + userId + '/clients';
        return axios.get(url, this.httpOptions);
    }
}