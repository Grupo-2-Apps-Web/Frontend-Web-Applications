import { BaseService } from "../../shared/services/base.service.js";

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
}