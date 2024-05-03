import axios from 'axios';

const http = axios.create({
    baseURL: 'https://my-json-server.typicode.com/salvadoorssalinas/cargoapp-api'
});

export class TripService {
    getTrips() {
        return http.get("trips");
    }
    getTripsByID(id) {
        return http.get(`trips/${id}`);
    }
    addTrip(trip) {
        return http.post("trips", trip);
    }
    async saveTrip(trip) {
        // Obtén el último id de la lista de viajes y añade 1 para el nuevo viaje
        const tripsResponse = await http.get("trips");
        const tripsData = tripsResponse.data;
        const lastTrip = tripsData[tripsData.length - 1];
        trip.id = lastTrip ? String(Number(lastTrip.id) + 1) : "1";

        // Genera automáticamente el trip.name incrementándolo
        if (lastTrip && /\d+$/.test(lastTrip.name)) {
            const lastTripNameNumber = Number(lastTrip.name.replace('Viaje #MA', ''));
            trip.name = 'Viaje #MA' + String(lastTripNameNumber + 1);
        } else {
            trip.name = 'Viaje #MA254';
        }

        // Envía la solicitud POST para agregar el nuevo viaje
        return this.addTrip(trip);
    }
    setTrip(id, trip) {
        return http.put(`trips/${id}`, trip);
    }
}