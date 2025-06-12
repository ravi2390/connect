<template>
    <div id="dashboard">
        <announcements />
    </div>
</template>

<script>
import Announcements from './custom/Announcements.vue';

export default {
    name: 'ViewDashboard',
    components: { Announcements },
};
</script>
