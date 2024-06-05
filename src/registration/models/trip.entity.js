export class Trip {
    constructor(id, name, type, weight, loadLocation, loadDate, unloadLocation, unloadDate, driverId, vehicleId, clientId, entrepreneurId) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.weight = weight;
        this.loadLocation = loadLocation;
        this.loadDate = loadDate;
        this.unloadLocation = unloadLocation;
        this.unloadDate = unloadDate;
        this.driverId = driverId;
        this.vehicleId = vehicleId;
        this.clientId = clientId;
        this.entrepreneurId = entrepreneurId;
    }
}