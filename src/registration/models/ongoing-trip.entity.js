export class OngoingTrip{
    constructor(id, trip_id, latitude, longitude, speed, distance){
        this.id = id;
        this.trip_id = trip_id;
        this.latitude = latitude;
        this.longitude = longitude;
        this.speed = speed;
        this.distance = distance;
    }
}