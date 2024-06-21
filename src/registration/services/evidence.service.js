import { BaseService } from "../../shared/services/base.service.js";
import axios from "axios";

export class EvidenceService extends BaseService {
    constructor() {
        super("evidences");
    }

    async getByTripId(tripId) {
        this.setToken();
        let url = this.baseURL + '/trips/' + tripId + '/' + this.endpoint;
        return axios.get(url, this.httpOptions);
    }
}