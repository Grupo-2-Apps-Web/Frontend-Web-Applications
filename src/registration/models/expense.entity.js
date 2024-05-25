export class Expense {
    constructor(id, tripId, fuelAmount, fuelDescription, viaticsAmount, viaticsDescription, tollsAmount, tollsDescription){
        this.id = id;
        this.tripId = tripId;
        this.fuelAmount = fuelAmount;
        this.fuelDescription = fuelDescription;
        this.viaticsAmount = viaticsAmount;
        this.viaticsDescription = viaticsDescription;
        this.tollsAmount = tollsAmount;
        this.tollsDescription = tollsDescription;
    }
}