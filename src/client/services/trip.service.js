import axios from 'axios';

const http = axios.create({
    baseURL: 'http://localhost:3000'
});

export class TripService {
    getTrips() {
        return http.get("trips");
    }
    getTripByID(id) {
        return http.get(`trips?id=${id}`);
    }
}