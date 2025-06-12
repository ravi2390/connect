const state = {
    contactSources: [],
};

const getters = {
    contactSources: state => state.contactSources
}

const actions = {
    getContactSources ({ commit, state }) {
        if (state.contactSources.length === 0) {
            axios.get('/api/v2/ContactSource?sort=DisplayOrder&per_page=1000').then((response) => {
                commit('setContactSources', response.data.data)
            });
        }
    }
};

const mutations = {
    setContactSources(state, sources) {
        state.contactSources = sources;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}
