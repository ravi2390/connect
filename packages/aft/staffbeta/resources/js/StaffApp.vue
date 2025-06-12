<template>
    <v-app>
        <main-navigation />
        <main-content />
    </v-app>
</template>

<script>
import MainNavigation from './components/global/MainNavigation';
import MainContent from './components/global/MainContent';

export default {
    name: 'StaffApp',
    components: {
        MainNavigation,
        MainContent,
    },
};
</script>
