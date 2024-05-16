import { createStore } from 'vuex';

export default createStore({
    state: {
        user_id: localStorage.getItem('user_id') || null,
        user_type: localStorage.getItem('user_type') || null,
        isActive: false,
    },
    mutations: {

        setUserId(state, value) { // Nueva mutación para user_id
            state.user_id = value;
            localStorage.setItem('user_id', value);
        },
        setUserType(state, value) { // Nueva mutación para user_type
            state.user_type = value;
            localStorage.setItem('user_type', value);
        },
        setIsActive(state, value) { // Nueva mutación para isActive
            state.isActive = value;
            localStorage.setItem('isActive', value);
        }
    }
});