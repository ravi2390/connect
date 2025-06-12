import api from '../../api/private';

const state = {
    user: {},
};

const getters = {
    selectedEntity: (stateObj) => ({
        type: stateObj.user.profile.selected_entity.entity_type,
        id: stateObj.user.profile.selected_entity.entity_id,
    }),
    selectedAffiliate: (stateObj) => stateObj.user.selectedAffiliate,
    userAbilities: (stateObj) => {
        const abilities = stateObj.user.AuthUserAbilities;
        if (stateObj.user.type === 'admin') {
            abilities.unshift({ AuthAbility: { name: 'Access Site Administration', type: 'admin', order: -1 }, order: -1 });
            return abilities;
        }
        return abilities;
    },
};

const actions = {
    async getUser({ commit }) {
        return new Promise((resolve) => {
            api.getUser()
                .then((response) => {
                    commit('setUser', response.data.data);
                    resolve();
                });
        });
    },

    async setUserSelectedEntity({ commit }, entityId) {
        return new Promise((resolve) => {
            api.setUserSelectedEntity({
                entityId,
            })
                .then((response) => {
                    commit('setUser', response.data.data);
                    resolve();
                });
        });
    },
};

const mutations = {
    setUser(stateObj, payload) {
        state.user = payload;
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
