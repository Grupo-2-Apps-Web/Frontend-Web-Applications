import { BaseService } from "../../shared/services/base.service.js";

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
}