import axios from 'axios';

const http = axios.create({
    baseURL: 'https://my-json-server.typicode.com/salvadoorssalinas/cargoapp-api'
});

export class TripService {
    getTrips() {
        return http.get("trips");
    }
    getTripByID(id) {
        return http.get(`trips?id=${id}`);
    }
}