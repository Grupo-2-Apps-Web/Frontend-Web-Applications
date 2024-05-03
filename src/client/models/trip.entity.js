export class Trip {
    constructor(id, name, loadDate, unloadDate, loadLocation, unloadLocation, driver, trailerPlate, tractorPlate, company, ruc, evidence) {
        this.id = id;
        this.name = name;
        this.loadDate = loadDate;
        this.unloadDate = unloadDate;
        this.loadLocation = loadLocation;
        this.unloadLocation = unloadLocation;
        this.driver = driver;
        this.trailerPlate = trailerPlate;
        this.tractorPlate = tractorPlate;
        this.company = company;
        this.ruc = ruc;
        this.evidence = evidence;
    }
}