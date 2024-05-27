import {createRouter, createWebHistory} from "vue-router";
import ExpenseList from "../visualization/pages/expense-list.component.vue";
import ExpenseDescription from "../visualization/pages/expense-description.component.vue"
import TripList from "../visualization/pages/trip-list.component.vue";
import TripDescription from "../visualization/pages/trip-description.component.vue";
import BarGraph from "../visualization/pages/bargraph.component.vue";

import TravelList from "../visualization/pages/travel-list.component.vue";
import Map from "../visualization/pages/map.component.vue";


import Registration from "../registration/pages/registration.component.vue";

import RegisterTripComponent from "../registration/pages/register-trip.component.vue";
import RegisterExpenseComponent from "../registration/pages/register-expense.component.vue";
import AlertList from "../visualization/pages/alert-list.component.vue";
import ModifyTripComponent from "../registration/pages/modify-trip.component.vue";
import ModifyExpenseComponent from "../registration/pages/modify-expense.component.vue";
import ModifyRequestIdComponent from "../registration/pages/modify-request-id.component.vue";
import ConfigurationComponent from "../user/pages/configuration.component.vue";
import SubscriptionComponent from "../user/pages/subscription.component.vue";
import PaymentComponent from "../user/pages/payment.component.vue";

import FormRegister from '../user/pages/register.component.vue';
import FormLogin from '../user/pages/login.component.vue';
import FormRecoverAccount from '../user/pages/recover-account.component.vue';
import RegisterClientComponent from "../user/pages/register-client.component.vue";
import RegisterEntrepreneurComponent from "../user/pages/register-entrepreneur.component.vue";

import DriverList from "../visualization/pages/driver-list.component.vue";
import VehicleList from "../visualization/pages/vehicle-list.component.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/login' },
        { path: '/configuration', component: ConfigurationComponent },
        { path: '/subscription', component: SubscriptionComponent },
        { path: '/payment', component: PaymentComponent },
        { path: '/client', redirect: '/client/history'},
        { path: '/client/history', component: TripList },
        { path: '/client/history/:id', component: TripDescription },
        { path: '/client/expenses', component: ExpenseList },
        { path: '/client/expenses/:id', component: ExpenseDescription },
        { path: '/client/statistics', component: BarGraph },
        { path: '/client/gps', component: TravelList },
        { path: '/client/gps/:id', component: Map },
        { path: '/client/alerts/:id', component: AlertList },

        { path: '/entrepreneur', redirect: '/entrepreneur/register'},
        { path: '/entrepreneur/register', component: Registration },
        { path: '/entrepreneur/register/trip', component: RegisterTripComponent },
        { path: '/entrepreneur/register/expense', component: RegisterExpenseComponent },
        { path: '/entrepreneur/modify/trip', component: ModifyRequestIdComponent },
        { path: '/entrepreneur/modify/expense', component: ModifyRequestIdComponent },
        { path: '/entrepreneur/modify/trip/:id', component: ModifyTripComponent },
        { path: '/entrepreneur/modify/expense/:id', component: ModifyExpenseComponent },

        { path: '/entrepreneur/history', component: TripList },
        { path: '/entrepreneur/history/:id', component: TripDescription },
        { path: '/entrepreneur/gps', component: TravelList},
        { path: '/entrepreneur/drivers', component: DriverList},
        { path: '/entrepreneur/vehicles', component: VehicleList},
        { path: '/entrepreneur/gps/:id', component: Map},

        { path: '/login', component: FormLogin },
        { path: '/signup', component: FormRegister },
        { path: '/signup/client', component: RegisterClientComponent },
        { path: '/signup/entrepreneur', component: RegisterEntrepreneurComponent },
        { path: '/recover-account', component: FormRecoverAccount }
    ]
});

export default router;