import { BaseService } from "../../shared/services/base.service.js";

export class EntrepreneurService extends BaseService {
    constructor() {
        super("entrepreneurs");
    }

    async getByUserId(userId) {
        const response = await this.getAll();
        const entrepreneurs = response.data;
        const entrepreneur = entrepreneurs.find(entrepreneur => entrepreneur.user_id === Number(userId));
        return entrepreneur || null;
    }
}