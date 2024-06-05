import { BaseService } from "../../shared/services/base.service.js";

export class ClientService extends BaseService {
    constructor() {
        super("clients");
    }

    async getByUserId(userId) {
        const response = await this.getAll();
        const clients = response.data;
        const client = clients.find(entrepreneur => entrepreneur.userId === userId);
        return client || null;
    }
}