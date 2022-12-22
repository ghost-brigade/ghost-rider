import {createApp} from "vue";
import App from "./App.vue";
import "./assets/styles/main.scss";
import "bootstrap";

// ICONS
import {library} from '@fortawesome/fontawesome-svg-core';
import {faHome, faMotorcycle, faMessage, faUser, faGhost, faClose} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';

library.add(faHome, faMotorcycle, faMessage, faUser, faGhost, faClose);


// ROUTES
import FRONT_router from "./routes";

// CREATE APP
createApp(App)
    .component("FontAwesomeIcon", FontAwesomeIcon)
    .use(FRONT_router)
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount("#app");
