export class Expense {
    constructor(id, trip_id, fuel_amount, fuel_description, viatics_amount, viatics_description, tolls_amount, tolls_description){
        this.id = id;
        this.trip_id = trip_id;
        this.fuel_amount = fuel_amount;
        this.fuel_description = fuel_description;
        this.viatics_amount = viatics_amount;
        this.viatics_description = viatics_description;
        this.tolls_amount = tolls_amount;
        this.tolls_description = tolls_description;
    }
}