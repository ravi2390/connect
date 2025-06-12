import { createStore } from 'vuex'

import userModule from './modules/user'
import contactSource from "./modules/contactSource";
import contactStatus from "./modules/contactStatus";
import stateTerritory from "./modules/stateTerritory";
import gridFilter from "./modules/gridFilter";

export default createStore({
    modules: {
        user: userModule,
        contactSource: contactSource,
        contactStatus: contactStatus,
        stateTerritory: stateTerritory,
        filters: gridFilter
    },
    state: {
        //
    },
    getters: {
        //
    },
    actions: {
        //
    },
    mutations: {
        //
    },
})
