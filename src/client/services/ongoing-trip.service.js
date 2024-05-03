import axios from 'axios';

const http = axios.create({
    baseURL: 'http://localhost:3000'
});

export class OnGoingTripService {
    getTrips() {
        return http.get("ongoingTrips");
    }
    getTripByID(id) {
        return http.get(`ongoingTrips?id=${id}`);
    }
}