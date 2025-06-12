<template>
    <v-container fluid>
        <h2>Reports (Choose a report to view)</h2>
        <div v-if="dashboardList.length">
            <v-flex column d-flex>
                <v-layout wrap>
                    <v-flex
                        v-for="(dashboard, index) in dashboardList"
                        :key="index"
                        md4
                    >
                        <div 
                            v-html="dashboard.thumbnailImage" 
                            style="
                                overflow: hidden !important;
                                height: 180px;
                                padding-left: 90px;
                            "
                            class="dashboard-img"
                        >
                        </div>
                        <v-card
                            class="mx-auto card-container d-flex align-center justify-center"
                            color="#3490dc"
                            min-height="200"
                            width="300"
                            v-on:click="fetchEmbedUrl(dashboard.id)"
                            :class="selectedDashboardId == dashboard.id ? 'green':''"
                        >
                            <div>
                                <!-- <v-img
                                    :src=dashboard.thumbnailImage
                                    :aspect-ratio="undefined"
                                /> -->
                                <v-card-title class="text-white text-center">
                                    {{ dashboard.title }}
                                </v-card-title>
                                <v-card-text class="text-white text-center text-caption">
                                    views: {{ dashboard.view_count }}
                                </v-card-text>
                            </div>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-flex>
        </div>
        <div v-else-if="listError">
            <v-alert type="error" closable>
                {{ listErrorMessage }}
            </v-alert>
        </div>
        <v-progress-circular v-else indeterminate color="primary"></v-progress-circular>
        <div v-if="search">
            <v-alert v-if="error" type="error" closable>
            {{ errorMessage }}
            </v-alert>
            <div v-else>
                <v-card class="v-card--outlined v-sheet--tile px-6">
                    <iframe v-if="embedUrl" :src="embedUrl" frameborder="0"></iframe>
                    <v-progress-circular v-else indeterminate color="primary"></v-progress-circular>
                </v-card>
            </div>
        </div>
    </v-container>
  </template>
  
  <script>
  export default {
    name: "LookerDashboardComponent",
    data() {
        return {
            dashboardList: [],
            embedUrl: null,
            error: false,
            errorMessage: '',
            listError: false,
            listErrorMessage: '',
            search: false,
            selectedDashboardId: null,
        };
    },
    mounted() {
        this.fetchDashboardList();
    },
    methods: {
          async fetchDashboardList() {
              const url = '/api/v2/looker/search-dashboard';
              
              try {
                  const response = await axios.get(url, {
                      params: { folder_id: 25 }
                  });
                  if (response.data && response.data.status === 'success' && response.data.url) {
                      this.dashboardList = response.data.url;
                  } else {
                      throw new Error(response.data.message || 'Invalid response format');
                  }
              } catch (error) {
                  this.listError = true;
                  this.listErrorMessage = 'Error fetching dashboard List';
                  console.error('Error details:', error);
              }
        },
        async fetchEmbedUrl(dashboardId) {
            this.search = true;
            this.selectedDashboardId = dashboardId;
            const url = '/api/v2/looker/embed-url';
            
            try {
                const response = await axios.get(url, {
                    params: { dashboard_id: dashboardId }
                });
                if (response.data && response.data.status === 'success' && response.data.url) {
                    this.embedUrl = response.data.url;
                } else {
                    throw new Error(response.data.message || 'Invalid response format');
                }
            } catch (error) {
                this.error = true;
                this.errorMessage = 'Error fetching embed URL: ' + (error.response?.data?.message || error.message);
                console.error('Error details:', error);
            }
        },
    }
  }
  </script>
  
  <style scoped>
  #main-container .container {
    max-width: 98vw !important;
  }
  
  iframe {
    border: none;
    width: 100%;
    height: 120vh;
  }

  .dashboard-img svg {
    width: 500px !important;
    height: 180px !important;
  }

  .v-card__title.text-h4.text-white {
    padding-bottom: 20%;
  }
  .flex.md4 {
    padding: 30px;
  }

  </style>