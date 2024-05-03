import { createStore } from 'vuex';

export default createStore({
    state: {
        isClient: localStorage.getItem('isClient') ? parseInt(localStorage.getItem('isClient')) : 0,
    },
    mutations: {
        setIsClient(state, value) {
            state.isClient = value;
            localStorage.setItem('isClient', value);
        }
    }
});