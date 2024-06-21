import { BaseService } from "../../shared/services/base.service.js";
import axios from "axios";

export class ConfigurationService extends BaseService {
    constructor() {
        super("configurations");
    }

    async getByUserId(userId) {
        this.setToken();
        let url = this.baseURL + '/users/' + userId + '/' + this.endpoint;
        return axios.get(url, this.httpOptions);
    }

}