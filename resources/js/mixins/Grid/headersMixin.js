export default {
    methods: {
        getHeaders(headers) {
            return headers ? headers.filter((header) => {return header.visible;}) : [];
        },
        getSortableHeaders(headers) {
            return headers ? headers.filter((header) => {return header.sortable !== false;}) : [];
        }
    }
}
