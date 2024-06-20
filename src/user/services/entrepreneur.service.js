import { BaseService } from "../../shared/services/base.service.js";
import axios from "axios";

export class EntrepreneurService extends BaseService {
    constructor() {
        super("entrepreneurs");
    }

    async getByUserId(userId) {
        this.setToken();
        let url = this.baseURL + '/users/' + userId + '/entrepreneurs';
        return axios.get(url, this.httpOptions);
    }
}