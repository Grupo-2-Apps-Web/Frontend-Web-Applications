export class OngoingTrip{
    constructor(id, tripId, latitude, longitude, speed, distance){
        this.id = id;
        this.tripId = tripId;
        this.latitude = latitude;
        this.longitude = longitude;
        this.speed = speed;
        this.distance = distance;
    }
}