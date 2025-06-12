import axios from 'axios';

const api = {
    REPORTS_LIST:       '/api/v3/reports/',
    REPORT_OPTIONS:     '/api/v3/reports/options',
    REPORT_SHOW:        '/api/v3/reports/show',
    REPORT_DOWNLOAD:    '/api/v3/reports/download',
    emptyPromise:       () => Promise.resolve({ data: '...' }),
};

const defaultOptions = {
    something: 'nothing',
};

export default {
    name: 'ReportsApi',
    install(Vue, options) {
        const opts = { ...defaultOptions, ...options };
        console.log('reports api installed', opts);
    },
    makeParams(parameters) {
        let params = [];
        for (let prop in parameters) {
            if (parameters.hasOwnProperty(prop)) {
                params.push(encodeURI(prop + '=' + parameters[prop]));
            }
        }
        params.join('&');
        return params;
    },
    reportsList(path) {
        return axios.get(api.REPORTS_LIST + path);
    },
    reportGetOptions(path) {
        if (path === '') { return api.emptyPromise(); }
        return axios.get(api.REPORT_OPTIONS + path);
    },
    reportGet(path, parameters) {
        if (path === '') { return api.emptyPromise(); }
        console.log('AXIOS SHOW POST PARAMETERS', parameters);
        return axios.post(api.REPORT_SHOW + path, { parameters: parameters });
    },
    reportDownload(path, parameters) {
        if (path === '') { return api.emptyPromise(); }
        console.log('AXIOS DOWNLOAD POST PARAMETERS', parameters);
        const params = this.makeParams(parameters);
        console.log('DOWNLOAD URL', api.REPORT_DOWNLOAD + path + '?' + params);
        return axios.request({ url: api.REPORT_DOWNLOAD + path + '?' + params, method: 'GET', responseType: 'blob' })
    },
};
