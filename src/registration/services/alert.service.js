import { BaseService } from "../../shared/services/base.service.js";
import axios from "axios";

export class AlertService extends BaseService {
    constructor() {
        super("alerts");
    }

    async getByTripId(tripId) {
        this.setToken();
        let url = this.baseURL + '/trips/' + tripId + '/alerts';
        return axios.get(url, this.httpOptions);
    }
}