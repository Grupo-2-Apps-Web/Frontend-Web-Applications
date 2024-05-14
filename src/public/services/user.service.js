import axios from 'axios';
import { Client } from '../models/client.entity.js';
import { Entrepreneur } from '../models/entrepreneur.entity.js';

const http = axios.create({
    baseURL: 'http://localhost:3000'
});

export class UserService {
    getUsers() {
        return http.get("users");
    }
    getUserById(id) {
        return http.get(`users/${id}`);
    }
    addUser(user) {
        return http.post("users", user);
    }
    async saveUser(user, type, logoImage='') {
        // Obtén el último id de la lista de usuarios
        const usersResponse = await http.get("users");
        const usersData = usersResponse.data;
        const lastUser = usersData[usersData.length - 1];
        user.id = lastUser ? String(Number(lastUser.id) + 1) : "1";

        // Agrega al tipo de usuario correspondiente
        if (type === 1) {
            // Obtén el último id de la lista de clientes
            const clientsResponse = await http.get("clients");
            const clientsData = clientsResponse.data;
            const lastClient = clientsData[clientsData.length - 1];
            const clientId = lastClient ? String(Number(lastClient.id) + 1) : "1";
            let client = new Client(clientId, user.id);
            await http.post("clients", client);
        }
        else {
            // Obtén el último id de la lista de emprendedores
            const entrepreneursResponse = await http.get("entrepreneurs");
            const entrepreneursData = entrepreneursResponse.data;
            const lastEntrepreneur = entrepreneursData[entrepreneursData.length - 1];
            const entrepreneurId = lastEntrepreneur ? String(Number(lastEntrepreneur.id) + 1) : "1";
            let entrepreneur = new Entrepreneur(entrepreneurId, logoImage, user.id);
            await http.post("entrepreneurs", entrepreneur);
        }

        // Envía la solicitud POST para agregar el nuevo usuario
        return this.addUser(user);

    }
    setUser(id, user) {
        return http.put(`users/${id}`, user);
    }
}