const state = {
    items: {},
};

const getters = {
    itemsByUrl: (state) => (url) => {
        return state.items.hasOwnProperty(url) ? state.items[url] : [];
    }
}

const actions = {
    async getItems({ commit, state }, url) {

        return new Promise((resolve, reject) => {
            if (!state.items.hasOwnProperty(url)) {
                axios.get(url).then((response) => {
                    commit('setItems', { url, items: response.data.data })
                    resolve();
                });
            } else {
                resolve();
            }
        });
    }
};

const mutations = {
    setItems(state, {url, items}) {
        if (!state.items.hasOwnProperty(url)) {
            state.items[url] = items;
        }
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}
