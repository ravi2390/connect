<template>
    <v-container>
        <v-row
            v-if="individualData
                && (individualData.submission_status_id === '2'
                    || individualData.submission_status_id === '3')
                && individualData.IndividualId"
        >
            <a :href="'/individuals/'+individualData.IndividualId">
                {{ fullName }}
            </a>
        </v-row>
        <v-row
            v-if="!individualData
                || (individualData.submission_status_id !== '2'
                    && individualData.submission_status_id !== '3')"
        >
            {{ fullName }}
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: 'FormSubmissionPreview',
    filters: {
        truncate: function (text, length, clamp) {
            const clmp = clamp || '...';
            const node = document.createElement('div');
            node.innerHTML = text;
            const content = node.textContent;
            return content.length > length ? content.slice(0, length) + clmp : content;
        },
    },
    props: {
        submission: { type: Object, required: true },
        individualData: { type: Object, required: false },
    },
    computed: {
        fullName() {
            let n = '';
            if (this.submission.firstName) { n += `${this.submission.firstName.data_value} `; }
            if (this.submission.middleName) { n += `${this.submission.middleName.data_value} `; }
            if (this.submission.lastName) { n += `${this.submission.lastName.data_value} `; }
            return n.trim();
        },
    },
};
</script>
