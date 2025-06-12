<template>
    <v-overlay
        opacity=".5"
        :model-value="loading"
        class="align-center justify-center"
        scrim="#FFF"
    >
        <v-progress-circular indeterminate :size="70" color="primary"></v-progress-circular>
    </v-overlay>
    <div class="d-md-flex ga-4">
        <v-card
            class="mb-8 d-md-flex flex-column flex-1-0-0"
            color="bprimary"
            v-for="list in lists"
            :key="list.id"
        >
            <v-card-title class="px-6">
                {{ list.label }}
            </v-card-title>
            <v-card-text class="px-6 flex-fill" v-html="list.description"></v-card-text>
            <v-card-actions class="px-6">
                <v-btn
                    @click="methodCall(list.action.method, list)"
                    :prepend-icon="list.action.icon"
                    variant="tonal"

                >
                    {{ list.action.label }}
                </v-btn>
            </v-card-actions>
        </v-card>
    </div>
    <download-options
        ref="downloadOptions"
        :list="listSelected"
        @ok="doOptionsOk"
    />
</template>

<script>
import DownloadOptions from "./custom/DownloadOptions";
export default {
    name: 'ViewLists',
    components: { DownloadOptions },
    data: () => ({
        loading: false,
        loadingUser: false,
        user: null,
        userAbilities: [],
        lists: [],
        listSelected: {},
    }),
    created() {
        this.getUser()
            .then(() => {
                this.getLists();
            })
    },
    methods: {
        getUser() {
            this.loadingUser = true;
            return axios.get('/api/v2/user')
                .then((response) => {
                    this.user = response.data.data;
                    this.userAbilities = this.user.AuthUserAbilities
                        .map((ability) => ability?.AuthAbility?.type)
                        .filter((ability) => ability);
                })
                .finally(() => {
                    this.loadingUser = false;
                });

        },
        getLists() {
            this.loading = true;
            return axios.get('/api/staff/lists')
                .then((response) => {
                    this.lists = [];
                    response.data.forEach((list) => {
                        if (list.action.icon === 'fas fa-cloud-download-alt') {
                            list.action.icon = 'fa-cloud-download';
                        }
                        if (list.action.icon === 'fas fa-filter') {
                            list.action.icon = 'fa-filter';
                        }
                        if (this.userAbilities.includes(list.ability)) {
                            this.lists.push(list);
                        }
                    })
                })
                .finally(() => {
                    this.loading = false;
                })
        },
        methodCall(name, list) {
            switch (name) {
                case 'download':
                    return this.download(list);
                case 'chooseOptions':
                    return this.chooseOptions(list);
                default: break;
            }
            alert('No method associated with ' + name);
            return null;
        },
        download(list, options) {
            this.loading = true;
            return axios({
                url: '/api/staff/lists/' + list.id,
                data: options,
                method: 'POST',
                responseType: 'blob',
            })
                .then((response) => {
                    const fileName = this.getFileNameFromHeader(response.headers);
                    const url = window.URL.createObjectURL(new Blob([response.data]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', fileName);
                    document.body.appendChild(link);
                    link.click();
                })
                .catch((error) => {
                    console.log(error);
                    alert('Download Failed');
                })
                .finally(() => {
                    this.loading = false;
                })
        },
        chooseOptions(list) {
            console.log('list', list);
            this.listSelected = list;
            this.$nextTick(function () {
                this.$refs.downloadOptions.show();
            });
        },
        doOptionsCancel() {
            console.log('options cancel');
        },
        doOptionsOk(list, options) {
            console.log('DO OPTIONS OK', list, options);
            let opts = {};
            options.forEach((option) => {
                opts[option.parameter] = (option.value);
            });
            console.log('OPTS', opts);
            this.download(list, opts);
        },
        getFileNameFromHeader(headers) {
            let filename = 'download.csv';
            if (headers) {
                const cd = headers['content-disposition'] ?? null;
                if (cd) {
                    let cdlist = cd.split(';');
                    cdlist = cdlist.map(Function.prototype.call, String.prototype.trim);
                    let cdobj = {};
                    cdlist.forEach((item) => {
                        const i = item.split('=')
                        cdobj[i[0]] = i[1];
                    });
                    if (cdobj.filename) {
                        filename = cdobj.filename;
                    }
                }
            }
            return filename;
        }
    },
};
</script>

<style scoped>
.text-white .card-text >>> a {
    color: white;
    text-decoration: underline;
}
</style>
