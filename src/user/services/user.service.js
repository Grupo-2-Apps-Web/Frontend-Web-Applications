import { BaseService } from "../../shared/services/base.service.js";

export class UserService extends BaseService {
    constructor() {
        super("users");
    }

    async getUserByEmail(email) {
        const response = await this.getAll();
        const users = response.data;
        const user = users.find(user => user.userAuthentication.email === email);
        return user || null;
    }
}