import { BaseService } from "../../shared/services/base.service.js";

export class ExpenseService extends BaseService {
    constructor() {
        super("expenses");
    }

    async getByTripId(tripId){
        const response = await this.getAll();
        const expenses = response.data;
        const expense = expenses.find(expense => expense.tripId === tripId);
        return expense || null;
    }

}