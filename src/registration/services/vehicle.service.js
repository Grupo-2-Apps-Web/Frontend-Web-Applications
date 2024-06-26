import { BaseService } from "../../shared/services/base.service.js";
import axios from "axios";

export class VehicleService extends BaseService {
    constructor() {
        super("vehicles");
    }

    async getByPlate(plate) {
        const response = await this.getAll();
        const vehicles = response.data;
        const vehicle = vehicles.find(vehicle => vehicle.plate === plate);
        return vehicle || null;
    }

    async getVehiclesByEntrepreneurId(entrepreneurId) {
        this.setToken();
        let url = this.baseURL + '/entrepreneurs/' + entrepreneurId + '/' + this.endpoint;
        return axios.get(url, this.httpOptions);
    }
}