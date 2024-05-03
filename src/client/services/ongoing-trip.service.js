import axios from 'axios';

const http = axios.create({
    baseURL: 'https://my-json-server.typicode.com/salvadoorssalinas/cargoapp-api'
});

export class OnGoingTripService {
    getTrips() {
        return http.get("ongoingTrips");
    }
    getTripByID(id) {
        return http.get(`ongoingTrips?id=${id}`);
    }
}