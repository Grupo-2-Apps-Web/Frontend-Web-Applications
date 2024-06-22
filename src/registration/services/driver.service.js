import { BaseService } from "../../shared/services/base.service.js";
import axios from "axios";

export class DriverService extends BaseService {
    constructor() {
        super("drivers");
    }

    async getByDNI(dni){
        const response = await this.getAll();
        const drivers = response.data;
        const driver = drivers.find(driver => driver.dni === dni);
        return driver || null;
    }

    async getDriversByEntrepreneurId(entrepreneurId) {
        this.setToken();
        let url = this.baseURL + '/entrepreneurs/' + entrepreneurId + '/' + this.endpoint;
        return axios.get(url, this.httpOptions);
    }

}