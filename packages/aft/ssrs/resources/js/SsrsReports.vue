<template>
    <v-app>
        <reports-navigation v-model="reportPath"></reports-navigation>
        <report-view :path="reportPath"></report-view>
    </v-app>
</template>

<script>
import ReportsNavigation from './components/ReportsNavigation.vue';
import ReportView from './components/ReportView.vue';

export default {
    name: 'SsrsReportsComponent',
    components: { ReportsNavigation, ReportView },
    data: () => ({
        reportPath: '',
    }),
};
</script>
