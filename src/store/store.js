import { createStore } from 'vuex';

export default createStore({
    state: {
        user_id: localStorage.getItem('user_id') || null,
        user_type: localStorage.getItem('user_type') || null,
        isActive: localStorage.getItem('isActive') || false,
        theme: localStorage.getItem('theme') || 'Light',
        view: localStorage.getItem('view') || 'Grid',
        initialConfig: null,
        token: localStorage.getItem('token') || null,
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
        },
        SET_THEME(state, theme) {
            state.theme = theme;
            localStorage.setItem('theme', theme);
            this.commit('APPLY_THEME'); // Llama a la nueva mutación
        },
        APPLY_THEME(state) { // Nueva mutación para aplicar el tema
            document.body.className = state.theme;
        },
        SET_VIEW(state, view) { // nueva mutación
            state.view = view;
            localStorage.setItem('view', view);
        },
        SET_INITIAL_CONFIG(state) { // nueva mutación para establecer la configuración inicial
            state.initialConfig = {
                theme: state.theme,
                view: state.view,
            };
        },
        RESET_CONFIG(state) { // nueva mutación para restablecer la configuración
            if (state.initialConfig) {
                state.theme = state.initialConfig.theme;
                state.view = state.initialConfig.view;
                localStorage.setItem('theme', state.theme);
                localStorage.setItem('view', state.view);
                this.commit('APPLY_THEME'); // Llama a la nueva mutación
            }
        },
        setToken(token) { // nueva mutación para token
            localStorage.setItem('token', token);
            this.state.token = token;
        }
    },
    getters: {
        getTheme: state => state.theme,
        getView: state => state.view
    }
});