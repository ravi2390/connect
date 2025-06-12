<!-- eslint-disable vue/no-v-html -->
<template>
    <v-card :title="item.title" v-for="item in items" :key="item.id" variant="elevated">
        <v-card-text v-html="item.content"></v-card-text>
    </v-card>
</template>

<script>
import axios from 'axios';

export default {
    name: 'Announcements',
    data: () => ({
        items: [],
    }),
    mounted() {
        this.getAnnouncements();
    },
    methods: {
        getAnnouncements() {
            return axios.get('/api/staff/announcements')
                .then((response) => {
                    this.items = response.data;
                })
                .finally(() => {
                    //
                });
        },
    },
};
</script>
