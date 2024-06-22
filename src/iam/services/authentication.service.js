import {BaseService} from "../../shared/services/base.service.js";
import axios from "axios";

export class AuthenticationService extends BaseService {
    constructor() {
        super("authentication");
    }

    signUp(username, password) {
        const user = {
            "username": username,
            "password": password
        };
        return axios.post(`${this.endpointPath()}/sign-up`, user);
    }

    signIn(username, password) {
        const user = {
            "username": username,
            "password": password
        };

        return axios.post(`${this.endpointPath()}/sign-in`, user);
    }

    setToken(token) {
        localStorage.setItem('token', token);
    }

}