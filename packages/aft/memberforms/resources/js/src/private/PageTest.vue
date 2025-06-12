<template>
    <div>
        Private Test!
        <div
            v-for="(source, index) in sources"
            :key="index"
        >
            {{ source.label }}
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'PageTest',
    data: () => ({
        sources: null,
    }),
    created() {
        axios.get('/api/v3/memberforms/admin/test/sources')
            .then((response) => {
                console.log(response.data);
                this.sources = response.data;
            });
    },
};
</script>
