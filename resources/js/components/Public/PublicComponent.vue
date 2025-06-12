<template>
    <v-container class="mobile-home-container">
        <v-layout>
            <v-row>
                <v-col cols="12">
                     <h3>Announcements</h3>
                    <announcements-component></announcements-component>
                </v-col>
            </v-row>
        </v-layout>
    </v-container>
</template>

<script>
    import AnnouncementsComponent from './AnnouncementsComponent';

    export default {
        name: "PublicComponent",

        components: {
            'announcements-component' : AnnouncementsComponent,
        },

        data: () => ({
            panel: 0
        })
    }
</script>

