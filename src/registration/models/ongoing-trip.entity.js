export class OngoingTrip{
    constructor(id, latitude, longitude, speed, distance, tripId){
        this.id = id;
        this.latitude = latitude;
        this.longitude = longitude;
        this.speed = speed;
        this.distance = distance;
        this.tripId = tripId;
    }
}