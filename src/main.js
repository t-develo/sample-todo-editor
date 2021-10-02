import Vue from "vue";
import App from "./App.vue";
import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";
import axios from 'axios';

Vue.use(PrimeVue);
Vue.use(ToastService);
Vue.config.productionTip = false;
Vue.prototype.$axios = axios;

import "primevue/resources/themes/saga-blue/theme.css"; //theme
import "primevue/resources/primevue.min.css"; //core css
import "primeicons/primeicons.css"; //icons
import "primeflex/primeflex.css";

import Card from "primevue/card";
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Toast from "primevue/toast";
Vue.component("Card", Card);
Vue.component("TabView", TabView);
Vue.component("TabPanel", TabPanel);
Vue.component("Button", Button);
Vue.component("InputText", InputText);
Vue.component("Toast", Toast);

new Vue({
    render: (h) => h(App),
}).$mount("#app");
