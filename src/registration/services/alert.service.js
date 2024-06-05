import { BaseService } from "../../shared/services/base.service.js";

export class AlertService extends BaseService {
    constructor() {
        super("alerts");
    }

    getByTripId(tripId) {
        return this.getAll().then(response => {
            const alerts = response.data;
            return alerts.filter(alert => alert.tripId === Number(tripId));
        });
    }
}