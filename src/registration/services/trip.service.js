import { BaseService } from "../../shared/services/base.service.js";

export class TripService extends BaseService {
    constructor() {
        super("trips");
    }

    async getOneByTripId(id){ //Created this function to avoid an error in modify
        const response = await this.getAll();
        const trips = response.data;
        const trip = trips.find(trip => trip.id === Number(id));
        return trip || null;
    }

    async getTripsByClientId(client_id) {
        const response = await this.getAll();
        const trips = response.data;
        return trips.filter(trip => trip.client_id === client_id);
    }

    async getTripsByEntrepreneurId(entrepreneur_id) {
        const response = await this.getAll();
        const trips = response.data;
        return trips.filter(trip => trip.entrepreneur_id === entrepreneur_id);
    }

}