const state = {
    user: {},
};

const getters = {
    selectedEntity: state => {
        return {
            type: state.user.profile.selected_entity.entity_type,
            id: state.user.profile.selected_entity.entity_id,
        }
    },
    selectedAffiliate: state => {
        return state.user.selectedAffiliate;
    },
    userAbilities: state => {
        let abilities = state.user.AuthUserAbilities;
        if (state.user.type === 'admin') {
            abilities.unshift({ AuthAbility: { name: 'Access Site Administration', type: 'admin', order: -1 }, order: -1 });
            return abilities;
        }
        return abilities;
    },
};

const actions = {
    async getUser({ commit }) {
        return new Promise((resolve, reject) => {
            axios.get("/api/v2/user")
                .then(response => {
                    commit('setUser', response.data.data);
                    resolve();
                })
        });
    },

    async setUserSelectedEntity({ commit }, entityId) {
        return new Promise((resolve, reject) => {
            axios.post("/api/v2/user/select-entity?scope=global", {
                entityId: entityId
            })
                .then(response => {
                    commit('setUser', response.data.data);
                    resolve();
                });
        });
    },
};

const mutations = {
    setUser(state, payload) {
        state.user = payload;
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}
