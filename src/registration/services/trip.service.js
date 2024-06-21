import { BaseService } from "../../shared/services/base.service.js";
import axios from "axios";

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

    async getTripsByClientId(clientId) {
        this.setToken();
        let url = this.baseURL + '/clients/' + clientId + '/' + this.endpoint;
        return axios.get(url, this.httpOptions);
    }

    async getTripsByEntrepreneurId(entrepreneurId) {
        this.setToken();
        let url = this.baseURL + '/entrepreneurs/' + entrepreneurId + '/' + this.endpoint;
        return axios.get(url, this.httpOptions);
    }

}