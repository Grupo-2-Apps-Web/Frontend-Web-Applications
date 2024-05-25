export class Trip {
    constructor(id, name, type, weight, load_location, load_date, unload_location, unload_date, driver_id, vehicle_id, client_id, entrepreneur_id) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.weight = weight;
        this.load_location = load_location;
        this.load_date = load_date;
        this.unload_location = unload_location;
        this.unload_date = unload_date;
        this.driver_id = driver_id;
        this.vehicle_id = vehicle_id;
        this.client_id = client_id;
        this.entrepreneur_id = entrepreneur_id;
    }
}