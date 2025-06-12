<template>
    <v-container class="mobile-home-container mt-50">
        <v-layout>
            <v-row>
                <v-col cols="12" lg="8">
                    <announcements-component position="left"></announcements-component>
                    <activity-list-component></activity-list-component>
                </v-col>
<!--                <v-col cols="4">-->
<!--                <v-expansion-panels v-model="panel">-->
<!--                    <v-expansion-panel>-->
<!--                        <v-expansion-panel-header class="aft-news-header">-->
<!--                            <h4>AFT News</h4>-->
<!--                        </v-expansion-panel-header>-->
<!--                        <v-expansion-panel-content class="aft-news-content">-->
<!--                            <v-card class="v-card&#45;&#45;outlined v-sheet&#45;&#45;tile p-3">-->
<!--                                <div>-->
<!--                                    <p v-if="news.length>0">{{ data.error_message }}</p>-->
<!--                                    <div v-for="item in news.items" v-bind="item"-->
<!--                                                        :key="item.id"  class="aft-news-item">-->
<!--                                        <div class="aft-news-date">-->
<!--                                            <time>{{ item.date }}</time>-->
<!--                                        </div>-->
<!--                                        <div class="aft-news-title">-->
<!--                                            <span>-->
<!--                                                <b><a :href="'' + item.url" target="_blank">{{ item.title }}</a></b>-->
<!--                                            </span>-->
<!--                                        </div>-->
<!--                                        <div class="aft-news-description">-->
<!--                                            <p>{{ item.description }}</p>-->
<!--                                        </div>-->
<!--                                        <div class="aft-news-read-more">-->
<!--                                            <span>-->
<!--                                                <a :href="'' + item.url" target="_blank">Read More</a>-->
<!--                                            </span>-->
<!--                                        </div>-->
<!--                                        <v-divider></v-divider>-->
<!--                                    </div>-->
<!--                                </div>-->
<!--                            </v-card>-->
<!--                        </v-expansion-panel-content>-->
<!--                    </v-expansion-panel>-->
<!--                </v-expansion-panels>-->
<!--                </v-col>-->
                <v-col cols="12" lg="4">
                    <announcements-component position="right"></announcements-component>
                </v-col>
            </v-row>
        </v-layout>
    </v-container>
</template>

<script>
    import ActivitySummaryComponent from './Home/ActivitySummaryComponent';
import AnnouncementsComponent from './Home/AnnouncementsComponent';

    export default {
        name: "HomeComponent",

        components: {
            'announcements-component' : AnnouncementsComponent,
            'activity-list-component': ActivitySummaryComponent,
        },

        data: () => ({
            news: [],
            panel: 0
        }),

        mounted() {
            // this.getDataFromApi();
        },

        methods: {
            // getDataFromApi() {
            //     return axios.get("/api/v2/aft/news")
            //         .then(response => {
            //             this.news = response.data.data;
            //         })
            //         .finally(() => {
            //             this.loading = false
            //         });

            // }
        }
    }
</script>

<style>
    .aft-news-title a.v-list-item, .aft-news-read-more a.v-list-item {
        padding: 0;
    }
    .aft-news-read-more a {
        border: 1px solid;
        padding: 3px;
        font-size: 10px;
        letter-spacing: 1px;
        clear: both;
        text-transform: uppercase;
        color: #3f98c9 !important;
        text-decoration: none;
    }
    .aft-news-header {
        background-color: #e2eff8;
    }
    .aft-news-content .v-expansion-panel-content__wrap {
        padding: 0 !important;
    }
</style>
