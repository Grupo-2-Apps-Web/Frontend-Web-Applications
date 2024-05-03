import axios from 'axios';

const http = axios.create({
    baseURL: 'http://localhost:3000'
});

export class ExpenseService {
    getExpensesByID(id) {
        return http.get(`expenses?id=${id}`);
    }
    setExpense(id, expense) {
        return http.put(`expenses/${id}`, expense);
    }
    addExpense(expense) {
        return http.post("expenses", expense);
    }
}