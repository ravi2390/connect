import axios from 'axios';

const api = {
    STATE_LIST: 'api/v3/memberforms/state',
    STATE_FORMS: 'api/v3/memberforms/state',
    COUNTRY_LIST: 'api/v3/memberforms/countries',
    FORM_SHOW: 'api/v3/memberforms/form',
    FORM_SUBMIT: 'api/v3/memberforms/form',
    FORM_ID_CUSTOM_URL: 'api/v3/memberforms/form-url/get-form-id-custom-url',
    SEARCH: '/api/v3/memberforms/search',
    ACCESS: '/api/v3/memberforms/search',
};

const defaultOptions = {
    something: 'nothing',
};

export default {
    name: 'PublicApi',
    install(options) {
        const opts = { ...defaultOptions, ...options };
        console.log('private api installed', opts);
    },
    getListOfStates() {
        return axios({
            method: 'get',
            url: api.STATE_LIST,
            baseURL: '/',
        });
    },
    getForms(state) {
        return axios({
            method: 'get',
            url: `${api.STATE_FORMS}/${state}`,
            baseURL: '/',
        });
    },
    getListOfCountries() {
        return axios({
            method: 'get',
            url: api.COUNTRY_LIST,
            baseURL: '/',
        });
    },
    getForm(id) {
        return axios({
            method: 'get',
            url: `${api.FORM_SHOW}/${id}`,
            baseURL: '/',
        });
    },
    sendFormData(id, field) {
        return axios({
            method: 'POST',
            url: `${api.FORM_SUBMIT}/${id}`,
            baseURL: '/',
            data: field,
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
        });
    },
    getFormIdByCustomUrl(affiliateNumber, customUrl) {
        return axios({
            method: 'POST',
            url: `${api.FORM_ID_CUSTOM_URL}`,
            baseURL: '/',
            data: { affiliateNumber, customUrl },
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
        });
    },
    search(type, search, args) {
        return axios.post(api.SEARCH, {
            type,
            text: search,
            ...args,
        });
    },
    access(type, id) {
        return axios.get(`${api.ACCESS}/${type}/${id}`);
    },
};
