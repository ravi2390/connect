<template>
    <v-expansion-panel v-on:group:selected="onExpand">
        <v-expansion-panel-title>
            Quick Comments and Assessments
        </v-expansion-panel-title>
        <v-expansion-panel-text>
            <FlipCard :flipped="flipped">
                <template #front>
                    <v-card>
                        <v-card-text>
                            <v-data-table
                                :headers="getHeaders(headers)"
                                :items="quickComments"
                                :items-length="totalQuickComments"
                                :items-per-page="-1"
                                :loading="loading"
                                class="elevation-1"
                                :hide-default-footer="true"
                            >
                                <template v-slot:[`item.Rating`]="{ item }">
                                    <v-chip
                                        variant="elevated"
                                        :color="item?.IndividualAssessment?.Rating ? 'primary' : 'default'"
                                    >
                                       {{ item?.IndividualAssessment?.Rating ?? 'N/A' }}
                                    </v-chip>
                                </template>
                                <template v-slot:[`item.IndividualQuickComment`]="{ item }">
                                    <span>
                                        {{ item.IndividualQuickComment }}
                                    </span>
                                </template>
                                <template v-slot:[`item.SubmittedByIndividual`]="{ item }">
                                    <span v-if="item.SubmittedByIndividual">
                                        {{ item.SubmittedByIndividual.FirstName }} {{ item.SubmittedByIndividual.LastName }}
                                    </span>
                                </template>
                                <template v-slot:[`item.IndividualAssessment`]="{ item }">
                                    <span v-if="item.IndividualAssessment">
                                        {{ item.IndividualAssessment.AssessmentContactType.AssessmentContactTypeName }}
                                    </span>
                                </template>
                                <template v-slot:[`item.ContactDate`]="{ item }">
                                    <span>
                                        {{ $filters.formatDate(item.CommentDate) }}
                                    </span>
                                </template>
                                <template v-slot:[`item.actions`]="{ item }">
                                    <span>
                                        <v-btn @click="onShowActions(item)">View</v-btn>
                                    </span>
                                </template>
                            </v-data-table>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="primary" @click="flipOn()" variant="elevated">ADD</v-btn>
                        </v-card-actions>
                    </v-card>
                    <v-dialog v-model="showDialog" width="500">
                        <v-card>
                            <v-card-text>
                                <v-row>
                                    <v-col class="text-right">
                                        <v-btn size="small" color="default" @click="onCloseActionsBtn()">Back</v-btn>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col>
                                        <v-data-table
                                            :headers="getHeaders(actionHeaders)"
                                            :items="computedAction"
                                            :loading="loading"
                                            :mobile-breakpoint=992
                                            class="elevation-1 mobile-global-card-table"
                                            :hide-default-footer="true"
                                            :items-per-page="-1"
                                        >
                                            <template v-slot:[`item.yes`]="{ item }">
                                                <v-icon v-if="item.yes" size="lg" icon="mdi:mdi-check-circle" color="green" />
                                            </template>
                                            <template v-slot:[`item.no`]="{ item }">
                                                <v-icon v-if="item.no" size="lg" icon="mdi:mdi-close-circle" color="red" />
                                            </template>
                                        </v-data-table>
                                    </v-col>
                                </v-row>
                            </v-card-text>
                        </v-card>
                    </v-dialog>
                </template>
                <template #back>
                    <v-form ref="form" v-model="valid" validate-on="submit" @submit.prevent="onSave">
                        <v-card>
                            <v-card-text>
                                <v-row>
                                    <v-col>
                                        <div class="data-container">
                                            <div class="data-tag">Comment:</div>
                                            <div class="data-value">
                                                <v-textarea variant="outlined" v-model="addingComment.IndividualQuickComment" :rules="[rules.requireOne]"></v-textarea>
                                            </div>
                                        </div>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col>
                                        <v-menu
                                            title="Contact Date:"
                                            v-model="menu1"
                                            :close-on-content-click="true"
                                            :offset="40"
                                            transition="scale-transition"
                                            min-width="290px"
                                        >
                                            <template v-slot:activator="{ props }">
                                                <v-text-field
                                                    v-model="addingComment.CommentDate"
                                                    hint="YYYY-MM-DD"
                                                    v-bind="props"
                                                    variant="underlined"
                                                ></v-text-field>
                                            </template>
                                            <v-date-picker @update:model-value="updateCommentDate" />
                                        </v-menu>
                                    </v-col>
                                    <v-col>
                                        <IndividualAutocomplete
                                            v-model="addingComment.SubmittedByIndividualId"
                                            individual=""
                                            :affiliateId="affiliateId"
                                            :label="'Submitted By'"
                                            :affiliateParentFilter="true"
                                            :rules="[rules.required]"
                                        />
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col>
                                        <v-label>Assessment Rating:</v-label>
                                        <div>
                                            <v-rating
                                                v-model="addingAssessment.Rating"
                                                length="5"
                                                hover
                                            >
                                                <template v-slot:item="props">
                                                    <v-chip
                                                        class="ma-1"
                                                        size="large"
                                                        :color="props.value === addingAssessment.Rating ? 'primary' : 'default'"
                                                        variant="elevated"
                                                    >
                                                        {{ props.index === 0 ? 'N/A' : props.index }}
                                                    </v-chip>
                                                </template>
                                            </v-rating>
                                        </div>
                                    </v-col>
                                    <v-col>
                                        <v-label>Contact Type</v-label>
                                        <v-select
                                            :items="assessmentContactTypes"
                                            item-title="AssessmentContactTypeName"
                                            item-value="AssessmentContactTypeId"
                                            v-model="addingAssessment.AssessmentContactTypeId"
                                            :rules="[rules.requiredWithAssessment]"
                                            variant="underlined"
                                        />
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col>
                                        <v-label>Actions</v-label>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="6" md="4" lg="2">
                                        <v-radio-group
                                            v-model="addingAction.Action1"
                                        >
                                            <v-label>1</v-label>
                                            <v-radio label="yes" value="1"></v-radio>
                                            <v-radio label="refused" value="0"></v-radio>
                                        </v-radio-group>
                                    </v-col>
                                    <v-col cols="6" md="4" lg="2">
                                        <v-radio-group
                                            v-model="addingAction.Action2"
                                        >
                                            <v-label>2</v-label>
                                            <v-radio label="yes" value="1"></v-radio>
                                            <v-radio label="refused" value="0"></v-radio>
                                        </v-radio-group>
                                    </v-col>
                                    <v-col cols="6" md="4" lg="2">
                                        <v-radio-group
                                            v-model="addingAction.Action3"
                                        >
                                            <v-label>3</v-label>
                                            <v-radio label="yes" value="1"></v-radio>
                                            <v-radio label="refused" value="0"></v-radio>
                                        </v-radio-group>
                                    </v-col>
                                    <v-col cols="6" md="4" lg="2">
                                        <v-radio-group
                                            v-model="addingAction.Action4"
                                        >
                                            <v-label>4</v-label>
                                            <v-radio label="yes" value="1"></v-radio>
                                            <v-radio label="refused" value="0"></v-radio>
                                        </v-radio-group>
                                    </v-col>
                                    <v-col cols="6" md="4" lg="2">
                                        <v-radio-group
                                            v-model="addingAction.Action5"
                                        >
                                            <v-label>5</v-label>
                                            <v-radio label="yes" value="1"></v-radio>
                                            <v-radio label="refused" value="0"></v-radio>
                                        </v-radio-group>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col>
                                        <v-btn color="default" @click="resetRadios()">Reset</v-btn>
                                    </v-col>
                                </v-row>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="default" @click="onCancel()" variant="elevated">Cancel</v-btn>
                                <v-btn color="green" type="submit" variant="elevated">Save</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-form>
                </template>
            </FlipCard>
        </v-expansion-panel-text>
    </v-expansion-panel>
</template>

<script>
    import FlipCard from "../../Common/Card/FlipCard";
    import headersMixin from "../../../mixins/Grid/headersMixin";
    import IndividualAutocomplete from "../../Affiliate/Partial/IndividualAutocomplete";
    import {format} from "date-fns";

    export default {
        name: "QuickCommentsComponent",
        mixins: [headersMixin],
        components: {
            FlipCard,
            IndividualAutocomplete
        },
        props: {
            individual: {
                type: Object,
                default: {}
            }
        },
        data() {
            return {
                menu1: false,
                flipped: false,
                showDialog: false,
                headers: [
                    {title: 'Rating', value: 'Rating', visible: true, sortable: false},
                    {title: 'Comment', value: 'IndividualQuickComment', visible: true, sortable: false},
                    {title: 'Contact Date', value: 'ContactDate', visible: true, sortable: false},
                    {title: 'Contact Type', value: 'IndividualAssessment.AssessmentContactType.AssessmentContactTypeName', visible: true, sortable: false},
                    {title: 'Submitted By', value: 'SubmittedByIndividual', visible: true, sortable: false},
                    {title: 'Actions', value: 'actions', visible: true, sortable: false}
                ],
                quickComments: [],
                totalQuickComments: 0,
                loading: false,
                assessmentContactTypes: [],
                addingAssessment: this.newAssessment(),
                addingComment: this.newComment(),
                addingAction: this.newAction(),
                rules: {
                    required: value => !!value || 'Required.',
                    requireOne: () => this.addingComment.IndividualQuickComment !== '' || this.addingAssessment.Rating!==null || this.addingAction.Action1!==null || this.addingAction.Action2!==null || this.addingAction.Action3!==null || this.addingAction.Action4!==null || this.addingAction.Action5!==null || 'Comment or Assessment or Action Required',
                    requiredWithAssessment: value => !!this.addingAssessment.Rating? !!value || 'Required.':true
                },
                valid: true,
                affiliateId: this.getAffiliateId(),
                action: null,
                actionHeaders: [
                    {title: 'Actions', value: 'actions', visible: true, sortable: false},
                    {title: 'Yes', value: 'yes', visible: true, sortable: false},
                    {title: 'No', value: 'no', visible: true, sortable: false},
                ]
            }
        },
        computed: {
            computedAction: function computedAction() {
                const actions = [];
                if (this.action) {
                    actions.push({actions: '1', yes: this.action.Action1, no:this.action.Action1==null || this.action.Action1==="" ?null:!this.action.Action1});
                    actions.push({actions: '2', yes: this.action.Action2, no:this.action.Action2==null || this.action.Action2==="" ?null:!this.action.Action2});
                    actions.push({actions: '3', yes: this.action.Action3, no:this.action.Action3==null || this.action.Action3==="" ?null:!this.action.Action3});
                    actions.push({actions: '4', yes: this.action.Action4, no:this.action.Action4==null || this.action.Action4==="" ?null:!this.action.Action4});
                    actions.push({actions: '5', yes: this.action.Action5, no:this.action.Action5==null || this.action.Action5==="" ?null:!this.action.Action5});
                }
                return actions;
            }
        },
        mounted() {
            this.id = this.$route.params.id;
            this.addingAssessment.IndividualId = this.addingComment.IndividualId = this.addingAction.IndividualId = this.id;
            axios.get('/api/v2/assessmentContactType')
                .then((response) => {
                    this.assessmentContactTypes = response.data.data;
                });
        },
        methods: {
            getDataFromApi() {
                this.loading = true;
                axios.get('/api/v2/aggregate/individual/individualQuickComment/'+this.id+'?scope=global')
                    .then(response => {
                        this.quickComments = response.data.data;
                        this.totalQuickComments = response.data.meta.total;
                    })
                    .finally(() => {
                        this.loading = false;
                    });

            },
            getActionsFromApi(id) {
                this.loading = true;
                axios.get('/api/v2/aggregate/individual/action/'+id+'?scope=global')
                .then(response => {
                    this.action = response.data.data;

                })
                .finally(() => {
                        this.loading = false;
                    });
            },
            onExpand({ value }) {
                if (value) {
                    this.getDataFromApi();
                }
            },
            onShowActions(item) {
                console.log(item);
                this.action = null;
                this.showDialog = true;
                this.getActionsFromApi(item.IndividualQuickCommentId);
            },
            onCloseActionsBtn() {
                console.log('close actions')
                this.showDialog=false;
            },
            async onSave(event) {
                this.loading = true;
                const results = await event;
                this.loading = false;
                if (!results.valid) {
                    return;
                }
                if (this.addingComment.IndividualQuickComment.length === 0) {
                    this.addingComment.IndividualQuickComment = "no comment";
                }
                axios
                    .post('/api/v2/IndividualQuickComment', this.addingComment)
                    .then((res) => {
                        const comment = res.data.data;
                        if (this.addingAssessment.Rating && this.addingAssessment.Rating>=1) {
                            this.addingAssessment.Rating = this.addingAssessment.Rating-1;
                            this.addingAssessment.IndividualQuickCommentId = comment.IndividualQuickCommentId;
                            this.addingAssessment.ContactDate = comment.CommentDate;
                            this.addingAssessment.SubmittedByIndividualId = comment.SubmittedByIndividualId;
                            axios
                                .post('/api/v2/individualAssessment', this.addingAssessment)
                                .then(() => {
                                    this.getDataFromApi();
                                    this.flipped = false;
                                });
                        }else{
                             this.getDataFromApi();
                             this.flipped = false;
                        }
                        if (this.addingAction.Action1!==null || this.addingAction.Action2!==null || this.addingAction.Action3!==null || this.addingAction.Action4!==null || this.addingAction.Action5!==null) {
                            this.addingAction.IndividualQuickCommentId = comment.IndividualQuickCommentId;
                            this.addingAction.ActionDate = comment.CommentDate;
                            this.addingAction.SubmittedByIndividualId = comment.SubmittedByIndividualId;
                            axios
                                .post('/api/v2/action', this.addingAction)
                                .then((res) => {
                                    this.action = res.data.data;
                                });
                        }
                        if (!this.addingAssessment.Rating) {
                            this.getDataFromApi();
                            this.flipped = false;
                        }
                    })
                ;
            },
            onCancel() {
                this.flipped=false;
            },
            newAssessment() {
                return {
                    IndividualId: this.id,
                    Rating: null,
                    ContactDate: new Date().toISOString().slice(0, 10),
                    SubmittedByIndividualId: null,
                    AssessmentContactTypeId: null,
                    IndividualQuickCommentId: 0,
                };
            },
            newComment() {
                return {
                    IndividualQuickComment: '',
                    IndividualId: this.id,
                    CommentDate: new Date().toISOString().slice(0, 10),
                    SubmittedByIndividualId: null
                };
            },
            newAction() {
                return {
                    SubmittedByIndividualId: null,
                    IndividualId: this.id,
                    IndividualQuickCommentId: 0,
                    Action1: null,
                    Action2: null,
                    Action3: null,
                    Action4: null,
                    Action5: null,
                    ActionDate: null,
                };
            },
            getRatingText(rating) {
                if (rating === 1) {
                    return 'N/A';
                }
                return rating-1;
            },
            getAffiliateId() {
                return this.$store.getters['user/selectedAffiliate'].AffiliateId;
            },
            resetRadios() {
                this.addingAction.Action1 = null;
                this.addingAction.Action2 = null;
                this.addingAction.Action3 = null;
                this.addingAction.Action4 = null;
                this.addingAction.Action5 = null;
                this.addingAssessment.Rating = null;
            },
            flipOn() {
                this.flipped=true;
                this.addingAssessment = this.newAssessment();
                this.addingComment = this.newComment();
                this.addingAction = this.newAction();
            },
            updateCommentDate(date) {
                this.addingComment.CommentDate = format(date, 'yyyy-MM-dd');
            },
        }
    }
</script>

<style scoped>
    .font-size-large {
        font-size: large;
    }

</style>
