const state = {
    contactStatuses: [],
};

const getters = {
    contactStatuses: state => state.contactStatuses
}

const actions = {
    getContactStatuses ({ commit, state }) {
        if (state.contactStatuses.length === 0) {
            axios.get('/api/v2/ContactStatus').then((response) => {
                commit('setContactStatuses', response.data.data)
            });
        }
    }
};

const mutations = {
    setContactStatuses(state, sources) {
        state.contactStatuses = sources;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}
