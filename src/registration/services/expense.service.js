import { BaseService } from "../../shared/services/base.service.js";
import axios from "axios";

export class ExpenseService extends BaseService {
    constructor() {
        super("expenses");
    }

    async getByTripId(tripId){
        this.setToken();
        let url = this.baseURL + '/trips/' + tripId + '/' + this.endpoint;
        return axios.get(url, this.httpOptions);
    }

}