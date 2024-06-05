export class Expense {
    constructor(id, fuelAmount, fuelDescription, viaticsAmount, viaticsDescription, tollsAmount, tollsDescription, tripId){
        this.id = id;
        this.fuelAmount = fuelAmount;
        this.fuelDescription = fuelDescription;
        this.viaticsAmount = viaticsAmount;
        this.viaticsDescription = viaticsDescription;
        this.tollsAmount = tollsAmount;
        this.tollsDescription = tollsDescription;
        this.tripId = tripId;
    }
}