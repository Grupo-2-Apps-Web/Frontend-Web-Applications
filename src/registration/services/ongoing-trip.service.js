import { BaseService } from "../../shared/services/base.service.js";

export class OnGoingTripService extends BaseService {
    constructor() {
        super("ongoing-trips");
    }

    async getByTripId(tripId) {
        const response = await this.getAll();
        const trips = response.data;
        const foundTrip = trips.find(trip => trip.tripId === Number(tripId));
        return foundTrip || null;
    }
}