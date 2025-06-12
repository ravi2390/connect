<template>
    <v-dialog
        v-model="dialog"
        max-width="600px"
    >
        <v-card>
            <v-card-title class="text-white bg-error-darken-2">
                {{ title }}
            </v-card-title>
            <v-card-text>
                <v-card-subtitle>
                    {{ message }}
                </v-card-subtitle>
                <v-container>
                    <v-row>
                        <v-col>
                            <ul>
                                <li
                                    v-for="(error, index) in errors"
                                    :key="index"
                                >
                                    {{ error[0] }}
                                </li>
                            </ul>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer />
                <v-btn
                    color="blue-darken-1"
                    variant="text"
                    @click="close()"
                >
                    Ok
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: 'MfpErrorDialog',
    props: {
        errorResponse: { type: Object, default: null },
    },
    data: () => ({
        dialog: false,
        title: 'Error',
        message: 'There was an error',
        errors: [],
    }),
    watch: {
        errorResponse(newErrorResponse) {
            this.title = newErrorResponse.statusText === 'Unprocessable Entity' ? 'Unable to Process' : newErrorResponse.statusText;
            this.message = newErrorResponse.data.message;
            this.errors = newErrorResponse.data.errors;
            this.dialog = !!this.errors;
        },
    },
    methods: {
        close() {
            this.dialog = false;
            this.title = 'Error';
            this.message = 'There was an error';
            this.errors = [];
        },
    },
};
</script>
