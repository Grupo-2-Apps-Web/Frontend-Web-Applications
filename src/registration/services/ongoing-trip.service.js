import { BaseService } from "../../shared/services/base.service.js";

export class OnGoingTripService extends BaseService {
    constructor() {
        super("ongoing_trips");
    }

    async getByTripId(tripId) {
        const response = await this.getAll();
        const trips = response.data;
        const trip = trips.find(trip => trip.tripId === tripId);
        return trip || null;
    }
}