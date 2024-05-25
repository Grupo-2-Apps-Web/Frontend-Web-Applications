import axios from 'axios';

const http = axios.create({
    baseURL: 'http://localhost:3000'
});

export class ConfigurationService {
    getConfigurationById(id) {
        return http.get(`configurations/${id}`);
    }

    updateConfiguration(id, data) {
        return http.put(`configurations/${id}`, data);
    }
}