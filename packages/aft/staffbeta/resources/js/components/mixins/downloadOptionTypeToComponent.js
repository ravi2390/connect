export default {
    methods: {
        downloadOptionTypeToComponent(type) {
            switch (type) {
            case 'checklist': return 'DownloadOptionCheckList';
            default: return 'DownloadOptionTextField';
            }
        },
    },
};
