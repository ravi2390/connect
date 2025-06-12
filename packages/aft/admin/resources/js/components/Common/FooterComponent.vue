<template>
    <v-footer app>
        <span>{{ currentDateTime }}</span>
    </v-footer>
</template>

<script>
    export default {
        data: () => ({
            currentDateTime: '',
        }),
        created() {
            setInterval(this.getCurrentTime, 1000);
            this.getCurrentTime();
        },
        methods: {
            getCurrentTime() {
                const now = new Date();
                const y = now.getFullYear();
                const m = now.getMonth() + 1;
                const d = now.getDate();
                this.currentDateTime = new Date();

            }
        }
    }
</script>
