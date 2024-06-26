import firebase from 'firebase/compat/app'
import 'firebase/compat/storage'
import {environment} from "../../environments/environment.js";

firebase.initializeApp(environment.firebaseConfig);

export class StorageService {
    storageRef = firebase.storage().ref();

    constructor() {}

    async uploadFile(name, imgBase64) {
        try {
            let response = await this.storageRef.child("images/" + name).putString(imgBase64, 'data_url');
            console.log(response);
            return response.ref.getDownloadURL();
        }
        catch (error) {
            console.error(error);
            return null;
        }
    }

}