const state = {
    stateTerritories: [],
};

const getters = {
    stateTerritories: state => state.stateTerritories
}

const actions = {
    getStateTerritories({ commit, state }) {
        if (state.stateTerritories.length === 0) {
            axios.get('/api/v2/StateTerritory?per_page=70').then((response) => {
                commit('setStateTerritories', response.data.data)
            });
        }
    }
};

const mutations = {
    setStateTerritories(state, sources) {
        state.stateTerritories = sources;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}
