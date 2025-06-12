import axios from 'axios';

const api = {
    TEMPLATE_LIST: '/api/v3/memberforms/admin/template',
    MEMBER_FORM_ASSIGN: '/api/v3/memberforms/admin/member-form-assign',
    TEMPLATE_SHOW: '/api/v3/memberforms/admin/template',
    FORM_LIST: '/api/v3/memberforms/admin/form',
    FORM_SHOW: '/api/v3/memberforms/admin/form',
    VIEW_FORM_SHOW: '/api/v3/memberforms/admin/view-form',
    FORM_CREATE: '/api/v3/memberforms/admin/form/create',
    SUBMISSION_LIST: '/api/v3/memberforms/admin/submission',
    SUBMISSION_LISTV2: '/api/v3/memberforms/admin/submissionV2',
    URL_REDIRECT_LIST: '/api/v3/memberforms/admin/url-redirect',
    URL_REDIRECT_CREATE: '/api/v3/memberforms/admin/url-redirect/create',
    DUES_MAPPING_LIST: '/api/v3/memberforms/admin/dues-mapping',
    DUES_MAPPING_CREATE: '/api/v3/memberforms/admin/dues-mapping/create',
    GET_BILLHIGHWAY_BILLINGTYPES: '/api/v3/memberforms/admin/dues-mapping/getBillHighwayBillingTypes',
    CREATE_DUES_CATEGORY: '/api/v3/memberforms/admin/create-dues-category',
    GET_DUES_MAPPING: '/dues-mapping/getBillHighwayBillingTypes/{affiliateId}',
    GET_NATIONAL_PER_CAPITA: '/national-per-capita/getNationalPerCapita',
    ARCHIVE_FORM: '/api/v3/memberforms/admin/archive-form',
    UNARCHIVE_FORM: '/api/v3/memberforms/admin/unarchive-form',
    DOWNLOAD_SUBMISSIONS: '/api/v3/memberforms/admin/submission/download/csv/all',
    SUBMISSION_SHOW: '/api/v3/memberforms/admin/submission',
    SUBMISSION_DETAILS: '/api/v3/memberforms/admin/submission-details',
    RESEND_EMAIL: '/api/v3/memberforms/admin/resend-email',
    SUBMISSION_DUPLICATE: '/api/v3/memberforms/admin/mark-submission-as-duplicate',
    UPDATE_INDIVIDUALID: '/api/v3/memberforms/admin/submission-update-individual',
    PROCEED_COPE: '/api/v3/memberforms/admin/submission-proceed-cope',
    EDUES_ENROLLMENT: '/api/v3/memberforms/admin/edues-enrollment',
    SUBMISSION_COPE: '/api/v3/memberforms/admin/mark-submission-as-cope',
    SUBMISSION_NOTAMEMBER: '/api/v3/memberforms/admin/mark-submission-as-notamember',
    SUBMISSION_NEW: '/api/v3/memberforms/admin/mark-submission-as-new',
    SUBMISSION_QR_CODE: '/api/v3/memberforms/admin/submission-qr-code',
    DOWNLOAD_QR_CODE: '/api/v3/memberforms/admin/download-qr-code',
    SEARCH: '/api/v3/memberforms/admin/search',
    ACCESS: '/api/v3/memberforms/admin/search',
    DEFAULT_AFFILIATES: '/api/v2/search/affiliate?scope=global',
    GET_USER: '/api/v2/user',
    SELECTED_ENTITY: '/api/v2/user/select-entity?scope=global',
    UPLOAD_LOGOS: '/api/v3/memberforms/admin/upload-logos',
    FORM_CLONE_TO_DATAFORM: '/api/v3/memberforms/admin/form/clone-to-dataform',
    UPDATE_DATAFORM_SUBMISSION: '/api/v3/memberforms/admin/submission/update-dataform-submission',
    HAS_NEW_SUBMISSION_FOR_DUES: '/api/v3/memberforms/admin/submission/has-new-submission-for-dues',
};

const defaultOptions = {
    something: 'nothing',
};

export default {
    name: 'PrivateApi',
    install(Vue, options) {
        const opts = { ...defaultOptions, ...options };
        console.log('private api installed', opts);
    },
    templateList(affiliateId) {
        return axios.post(api.TEMPLATE_LIST, { affiliateId });
    },
    templateShow(id) {
        return axios.get(`${api.TEMPLATE_SHOW}/${id}`);
    },
    getMemberFormAssign(id) {
        return axios.get(`${api.MEMBER_FORM_ASSIGN}/${id}`);
    },
    formList(affiliateId) {
        return axios.post(api.FORM_LIST, { affiliateId });
    },
    formShow(id) {
        return axios.get(`${api.FORM_SHOW}/${id}`);
    },
    formCreate(data) {
        return axios.post(`${api.FORM_CREATE}`, data);
    },
    formDelete(id) {
        return axios.delete(`${api.FORM_SHOW}/${id}`);
    },
    formArchive(id) {
        return axios.post(`${api.ARCHIVE_FORM}`, { id });
    },
    formUnarchive(id) {
        return axios.post(`${api.UNARCHIVE_FORM}`, { id });
    },
    formCloneToDataForm(id) {
        return axios.post(`${api.FORM_CLONE_TO_DATAFORM}`, { id });
    },
    dataFormSubmissionUpdate(id) {
        return axios.put(`${api.UPDATE_DATAFORM_SUBMISSION}`, { id });
    },
    submissionList(affiliateId, formId, type, firstName, lastName) {
        return axios.post(api.SUBMISSION_LIST, {
            affiliateId, formId, type, firstName, lastName,
        });
    },
    submissionListV2(affiliateId, formId, type, firstName, lastName) {
        return axios.post(api.SUBMISSION_LISTV2, {
            affiliateId, formId, type, firstName, lastName,
        });
    },
    submissionDelete(id) {
        return axios.delete(`${api.SUBMISSION_SHOW}/${id}`);
    },
    urlRedirectList(affiliateName) {
        return axios.post(api.URL_REDIRECT_LIST, {
            affiliateName,
        });
    },
    urlRedirectCreate(data) {
        return axios.post(`${api.URL_REDIRECT_CREATE}`, data);
    },
    urlRedirectDelete(id) {
        return axios.delete(`${api.URL_REDIRECT_LIST}/${id}`);
    },
    duesMappingCreate(data) {
        return axios.post(`${api.DUES_MAPPING_CREATE}`, data);
    },
    createDuesCategory(data) {
        return axios.post(`${api.CREATE_DUES_CATEGORY}`, data);
    },
    uploadLogos(data) {
        return axios.post(`${api.UPLOAD_LOGOS}`, data);
    },
    duesMappingList(affiliateId) {
        return axios.post(api.DUES_MAPPING_LIST, {
            affiliateId,
        });
    },
    downloadSubmissions(affiliateId, formId, type, firstName, lastName, onDownloadProgress, selfV) {
         
        selfV.downloadingCancelToken = axios.CancelToken.source();
        return axios.request({
            url: api.DOWNLOAD_SUBMISSIONS,
            method: 'POST',
            responseType: 'blob',
            cancelToken: selfV.downloadingCancelToken.token,
            params: {
                affiliateId, formId, type, firstName, lastName,
            },
            onDownloadProgress: function (event) {
                onDownloadProgress(event);
            },
        });
    },
    submissionShow(id) {
        return axios.get(`${api.SUBMISSION_SHOW}/${id}`);
    },
    submissionDetails(id) {
        return axios.get(`${api.SUBMISSION_DETAILS}/${id}`);
    },
    resendEmail(id) {
        return axios.get(`${api.RESEND_EMAIL}/${id}`);
    },
    individualList(url) {
        return axios.get(url);
    },
    contentBlocks(url) {
        return axios.get(url);
    },
    markSubmissionAsDuplicate(id) {
        return axios.post(`${api.SUBMISSION_DUPLICATE}/${id}`);
    },
    updateIndividualId(id, individualId, status) {
        return axios.post(`${api.UPDATE_INDIVIDUALID}/${id}`, { IndividualId: individualId, status });
    },
    proceedCope(id, individualId, status, affiliateId) {
        return axios.post(`${api.PROCEED_COPE}/${id}`, { IndividualId: individualId, status, affiliateId });
    },
    eduesEnrollment(id, individualId, affiliateId, source) {
        return axios.post(`${api.EDUES_ENROLLMENT}`,
            {
                IndividualId: individualId, AffiliateId: affiliateId, SubmissionId: id, Source: source,
            });
    },
    markSubmissionAsCope(id) {
        return axios.post(`${api.SUBMISSION_COPE}/${id}`);
    },
    markSubmissionAsNotAMember(id) {
        return axios.post(`${api.SUBMISSION_NOTAMEMBER}/${id}`);
    },
    markSubmissionAsNew(id) {
        return axios.post(`${api.SUBMISSION_NEW}/${id}`);
    },
    submissionDownload(id) {
        return axios.request({
            url: `${api.SUBMISSION_SHOW}/${id}/download`,
            method: 'GET',
            responseType: 'blob',
        })
            .then((response) => {
                const cd = response.headers['content-disposition'].split('; ');
                const disposition = [];
                cd.forEach((item) => {
                    const t = item.split('=');
                    if (t[1]) { t[1] = t[1].replace(/^"(.+)"$/, '$1'); }
                    disposition[t[0]] = t[1];
                });
                const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = downloadUrl;
                link.setAttribute('download', disposition.filename);
                document.body.appendChild(link);
                link.click();
                link.remove();
            })
            .finally(() => {

            });
    },
    submissionQrCode(url) {
        return axios.post(`${api.SUBMISSION_QR_CODE}?url=${url}`);
    },
    downloadQrCode(url) {
        return axios.request({
            url: `${api.DOWNLOAD_QR_CODE}?url=${url}`,
            method: 'POST',
            responseType: 'blob',
        });
    },
    search(type, search, args) {
        return axios.post(api.SEARCH, {
            type,
            text: search,
            ...args,
        });
    },
    loadDefaultAffiliates(args) {
        return axios.post(api.DEFAULT_AFFILIATES, args);
    },
    getUser() {
        return axios.get(api.GET_USER);
    },
    getNationalPerCapita() {
        return axios.get(api.GET_NATIONAL_PER_CAPITA);
    },
    setUserSelectedEntity(args) {
        return axios.post(api.SELECTED_ENTITY, args);
    },
    access(type, id) {
        return axios.get(`${api.ACCESS}/${type}/${id}`);
    },
    getBillHighwayBillingTypes(affiliateId) {
        return axios.get(`${api.GET_BILLHIGHWAY_BILLINGTYPES}/${affiliateId}`);
    },
    hasNewSubmissionForDues(affiliateId) {
        return axios.get(`${api.HAS_NEW_SUBMISSION_FOR_DUES}/${affiliateId}`);
    },
    getFormActions() {
        return {
            create: 'create',
            clone: 'clone',
            edit: 'edit',
            editConfirmation: 'editConfirmation',
            cloneToDataForm: 'cloneToDataForm',
        };
    },
    getForm(id) {
        return axios.get(`${api.VIEW_FORM_SHOW}/${id}`);
    },
};
