export default {
    data() {
       return {
           uploadUrl: "/admin/api/content-block/uploadFile",
        }
    },
    methods: {
        uploadFiles(filesToUpload) {
            const formData = new FormData();
            formData.append('upload', filesToUpload[0]);
            axios.post(this.uploadUrl, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
                .then(response => {
                    const { url, fileName } = response.data;
                    this.contentblock.content += `<p><a target="_blank" href="${url}">${fileName}</a></p>`;
                });
        },
    },
}
