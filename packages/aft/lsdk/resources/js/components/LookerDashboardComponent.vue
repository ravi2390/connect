<template>
  <v-container>
      <v-alert v-if="error" type="error" dismissible>
          {{ errorMessage }}
      </v-alert>
      <div v-else>
          <v-card class="v-card--outlined v-sheet--tile px-6">
              <h2>Looker Dashboard</h2>
              <iframe v-if="embedUrl" :src="embedUrl" frameborder="0"></iframe>
              <v-progress-circular v-else indeterminate color="primary"></v-progress-circular>
          </v-card>
      </div>
  </v-container>
</template>

<script>
export default {
  name: "LookerDashboardComponent",
  data() {
      return {
          embedUrl: null,
          error: false,
          errorMessage: '',
      };
  },
  mounted() {
      this.fetchEmbedUrl();
  },
  methods: {
      async fetchEmbedUrl() {
          const url = '/api/v2/looker/embed-url';
          
          try {
              const response = await axios.get(url, {
                  params: { dashboard_id: 17 }
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
</style>