<template>
    <v-container class="file-uploader">

        <h1><span>Connect File Uploader</span></h1>

        <h2>Upload Instructions</h2>
        <p>Please complete the following preprocessing steps prior to uploading to ensure your file is processed correctly.</p>

        <ol>
            <li class="list-title">Combine Files and Sheets
                <ul>
                    <li>If multiple files or sheets are received, consolidate all records into one sheet of one document.</li>
                    <li>Align columns with similar information. Combine header names as needed.</li>
                    <li>Save file in a supported format (xls or csv).</li>
                </ul>
            </li>
            <li class="list-title">Complete Required Information
                <p class="list-text">All records must include the following information</p>
                <ul>
                    <li><strong>First Name</strong> and <strong>Last Name</strong></li>
                    <li><strong>Employer ID</strong> and <strong>Unit ID</strong>
                        <ul>
                            <li>Employer and Unit IDs can be found in the <a href="https://awa.knack.aft.org/gsd#entity-clean-up/?view_141_filters=%5B%7B%22field%22%3A%22field_215%22%2C%22operator%22%3A%22is%22%2C%22value%22%3A%221%22%7D%5D"><span>GSD</span> <i class="fa fa-external-link"></i></a> or <a href="http://hq-sqldev01/Reports/report/ConnectReportProd/EntityList"><span>entity report</span> <i class="fa fa-external-link"></i></a>. If unsure, contact the affiliate administrator.</li>
                        </ul>
                    </li>
                    <li><strong>Union Relationship</strong> and <strong>Dues Category</strong>
                        <ul>
                            <li>Valid Union Relationships include: Member, Potential Member, Retired Member, Agency Fee Payer, Other. If Union Relationship is missing, default to Potential Member. If unsure, contact the relevant state lead.</li>
                            <li>Valid Dues Categories include: Full Dues, Half Dues, Leave of Absence/Laid Off, etc. If Dues Category is missing, default to Full Dues, unless the majority of other members utilize a different category.</li>
                            <li>If only a few records are incomplete, apply the most recently-used Union Relationship and Dues Category information from Connect.</li>
                        </ul>
                    </li>
                    <li><strong>Local Job Class Name</strong>
                        <ul>
                            <li>If Local Job Class cannot be determined, default to "Unknown Job Class."</li>
                        </ul>
                    </li>
                </ul>
            </li>
            <li class="list-title">Clarify Ending Relationships
                <ul>
                    <li><strong>End Date</strong> and <strong>Stop Reason</strong>
                        <ul>
                            <li>For records with Union Relationships that are ending, include both an End Date and a Stop Reason.</li>
                        </ul>
                    </li>
                    <li><strong>Retiring Members</strong>
                        <ul>
                            <li>Assign retiring members a "Retired Member" Union Relationship - rather than simply ending their Union Relationship - in order to ensure continuation of benefits.</li>
                        </ul>
                    </li>
                </ul>
            </li>
            <li class="list-title">Retain Unique Identifiers
                <ul>
                    <li>Where possible, provide a unique identifier for each record to ensure accurate tracking and data integrity.</li>
                    <li>Examples of Unique Identifiers include: Employee ID, Member ID, GUID, Work Email, etc.</li>
                </ul>
            </li>
        </ol>

        <aside v-if="enableLauncherOptions" class="advanced">
            <h2 @click="showLauncherOptions = !showLauncherOptions"><span>Advanced Options</span><span class="expand"><i class="fa fa-chevron-down"></i></span></h2>
            <div class="expanded-options" :hidden="!showLauncherOptions">
                <div>
                    <input type="checkbox" id="toggleDebugging" v-model="enableDebugging" />
                    <label for="toggleDebugging">Enable debugging</label>
                </div>
                <div>
                    <input type="checkbox" id="toggleLauncherOptions" v-model="enableLauncherOptions" />
                    <label for="toggleLauncherOptions">Enable launcher options</label>
                </div>
                <div :hidden="!enableLauncherOptions">
                    <form id="launcher-options"> </form>
                </div>
            </div>
        </aside>

        <div class="downloads" v-if="isFileDownloadable">
            <v-btn class="download-last" :disabled="buttonAlwaysDisabled" :hidden="buttonAlwaysDisabled" @click="downloadCSVFromJson('ExportFile.csv')">Download Last CSV</v-btn>
            <v-btn color="primary" :disabled="!isFileDownloadable" @click="downloadCSVFromOneSchema()">Download Imported CSV from OneSchema</v-btn><br /><br />
        </div>

        <div>
            <v-btn color="primary" class="primary-button" icon @click="launchOneSchema('mfu_v1')">Upload File</v-btn><br /><br />
        </div>
    </v-container>
</template>

<script>
import { cloneDeep } from "lodash-es";
import { useOneSchemaImporter } from "@oneschema/vue"
import axios from "axios";

export default {
    name: "OneSchemaFileValidationComponent",
    data() {
        return {
            importerEnv: null,
            lambdaEnv: null,
            importerOptions: {},
            importerVariables: {},
            formDataEntries: null,
            launchParams: {},
            embedId: null,
            jsonArrayData: null,
            jsonColumns: null,
            orderedColumns: null,
            isFileDownloadable : false,
            buttonAlwaysDisabled : true,
            importedFileUrl: null,
            enableLauncherOptions : true,
            showLauncherOptions : false,
            enableDebugging: false,
            allColumns: [],
            validationHooks: {},
            columnsToUpdate: {},
            columnsToAdd: {},
            templateOverrides: {},
            lookupListsRaw: {},
            lookupLists: {},
            lookupListsColumnMap: {},
        }
    },
    setup() {
        const importer = useOneSchemaImporter();
        return {
            importer,
        }
    },
    created() {
        /**
         * Populate the lookup lists variables.
         */
        this.lookupListsColumnMap = {
            "PrefixName": "prefix",
            "SuffixName": "suffix",
            "GenderName": "gender",
            "HomeAddressState": "stateTerritory",
            "UnionRelationshipTypeName": "unionRelationshipType",
            "HomeAddressCountry": "country",
            "IndividualDeactivationReasonName": "individualDeactivationReason",
        }
        this.fetchLookupLists()

        /**
         * All columns in Template.
         *
         * @type {string[]}
         */
        this.allColumns = [
            "AffiliateNumber",
            "AffiliateName",
            "EmployeeId",
            "FullName",
            "PrefixName",
            "PreferredName",
            "FirstName",
            "MiddleName",
            "LastName",
            "OriginalLastName",
            "SuffixName",
            "HomeAddress",
            "HomeAddressStreet1",
            "HomeAddressStreet2",
            "HomeAddressStreet3",
            "HomeAddressCity",
            "HomeAddressState",
            "HomeAddressZip",
            "HomeAddressZipPlus4",
            "HomeAddressCountry",
            "HomeAddressLatitude",
            "HomeAddressLongitude",
            "DateOfBirth",
            "UnionRelationshipTypeName",
            "UnionRelationshipTypeId",
            "UnionRelationshipStartDate",
            "UnionRelationshipEndDate",
            "HomePhoneNumber",
            "MobilePhoneNumber",
            "WorkPhoneNumber",
            "WorkPhoneExtension",
            "HomeEmail",
            "WorkEmail",
            "aftdb_staging_name",
            "aftdbimportstagingid",
            "fileid",
            "AffiliateId",
            "AffiliateGuid",
            "ChapterName",
            "ChapterId",
            "ChapterGuid",
            "EmployerName",
            "EmployerId",
            "EmployerGuid",
            "LocalAgreementName",
            "LocalAgreementId",
            "UnitName",
            "UnitId",
            "UnitGuid",
            "IndividualId",
            "IndividualGuid",
            "MemberId",
            "LocalUniqueId",
            "SuffixId",
            "PrefixId",
            "GenderName",
            "GenderId",
            "LocalDuesCategoryName",
            "LocalDuesCategoryId",
            "LocalDuesAmount",
            "StatePerCapitaName",
            "StatePerCapitaId",
            "NationalPerCapitaName",
            "NationalPerCapitaId",
            "PaymentMethodName",
            "PaymentMethodId",
            "PaymentFrequencyName",
            "PaymentFrequencyId",
            "IndividualHomeAddressId",
            "HomeStateTerritoryId",
            "CountyName",
            "CountyId",
            "EmploymentStartDate",
            "EmploymentEndDate",
            "EmploymentHireDate",
            "StopReason",
            "IndividualDeactivationReasonName",
            "IndividualDeactivationReasonId",
            "LocalJobClassName",
            "LocalJobClassId",
            "LocalJobClassGuid",
            "LocalJobClassCode",
            "PaidThroughDate",
            "NationalJobClassName",
            "NationalJobClassId",
            "NationalJobClassGuid",
            "JobTitleName",
            "JobTitleId",
            "JobDescription",
            "WorkLocationCode",
            "WorkLocationName",
            "WorkLocationId",
            "WorkLocationGuid",
            "WorkLocationTypeName",
            "WorkLocationTypeId",
            "WorkLocationAddressId",
            "WorkLocationAddressLine1",
            "WorkLocationAddressLine2",
            "WorkLocationCity",
            "WorkLocationStateTerritoryName",
            "WorkLocationStateTerritoryCode",
            "WorkLocationStateTerritoryId",
            "WorkLocationPostalCode",
            "WorkStructureName",
            "WorkStructureId",
            "WorkStructureGuid",
            "WorkStructureTypeName",
            "WorkStructureTypeId",
            "WorkStructureCode",
            "RoomNumber",
            "RetirementEffectiveDate",
            "SubjectName",
            "SubjectId",
            "IsPoliticallyActive",
            "IsRegisteredVoter",
            "PoliticalPartyName",
            "PoliticalPartyId",
            "CongressionalDistrict",
            "StateSenateDistrict",
            "StateHouseDistrict",
            "ResidentialSchoolDistrict",
            "IndividualComment",
            "IndividualCommentId",
            "IndividualCopeId",
            "BillHighwayId",
            "CopeAmount",
            "CopePaymentFrequencyId",
            "CopePaymentMethodId",
            "RecordType",
            "WorkLocationArea",
            "IndividualRecordType",
            "UnionRelationshipRecordType",
            "EmploymentRecordType",
            "RecordProcessStatus",
            "AffiliateAssignedId",
            "IsWorking",
            "IsPubliclyAccessible",
            "EthnicityName",
            "EthnicityId",
            "ContactRestrictionName",
            "ContactRestrictionId",
            "WorkShift",
            "HomeAddressIsPreferred",
            "unioncode",
            "DayOfBirth",
            "MonthOfBirth",
            "YearOfBirth",
            "DoNotChangeAfterDate",
            "StopMemberNotOnFile",
            "StopPotentialMemberNotOnFile",
            "LeaveEmploymentNotOnFile",
            "HelpRequestTicketNumber",
            "test_column"
        ]
        this.validationHooks = {
            completeAffiliateData: {
                checked: true,
                labelSuffix: "",
                definition: {
                    name: "completeAffiliateData",
                    url: "{{api_gateway_base_url}}/muse/completeAffiliateData/",
                    secret_key: "{{api_gateway_secret}}",
                    batch_size: 100,
                    column_keys: [
                        "AffiliateNumber",
                        "EmployerId",
                        "EmployerName",
                        "JobTitleId",
                        "JobTitleName",
                        "LocalDuesCategoryId",
                        "LocalDuesCategoryName",
                        "LocalJobClassId",
                        "LocalJobClassName",
                        "UnitId",
                        "UnitName",
                        "WorkLocationId",
                        "WorkLocationName",
                        "WorkStructureId",
                        "WorkStructureName"
                    ]
                }
            },
            applyMemberLogic: {
                checked: true,
                labelSuffix: "",
                definition: {
                    name: "applyMemberLogic",
                    url: "{{api_gateway_base_url}}/muse/applyMemberLogic/",
                    secret_key: "{{api_gateway_secret}}",
                    batch_size: 1000,
                    column_keys: [
                        "AffiliateNumber",
                        "AffiliateNumber",
                        "UnionRelationshipTypeName",
                        "UnionRelationshipTypeId",
                        "UnionRelationshipEndDate",
                        // TODO: LocalDuesCategory is also handled in completeAffiliateData - reconcile to one.
                        "LocalDuesCategoryName",
                        "LocalDuesCategoryId",
                        "LocalDuesAmount",
                        "StopReason",
                        "IndividualDeactivationReasonName",
                        "IndividualDeactivationReasonId",
                    ]
                }
            },
            // @deprecated Replaced with a code hook. Enabled for testing Lambda connectivity.
            nameParserWebhook: {
                checked: false,
                labelSuffix: "(deprecated, may be used to test Lambda connectivity without external requests to Connect API)",
                definition: {
                    name: "nameParserWebhook",
                    url: "{{api_gateway_base_url}}/muse/nameParserWebhook/",
                    secret_key: "{{api_gateway_secret}}",
                    batch_size: 5000,
                    column_keys: [
                        "FullName",
                        "FirstName",
                        "MiddleName",
                        "LastName",
                        "OriginalLastName",
                        "PrefixName",
                        "SuffixName",
                        "PreferredName",
                    ]
                }
            }
        }
        this.columnsToUpdate = {
            HomeAddressState: {
                checked: true,
                labelSuffix: "(getLookupList)",
                definition: {
                    key: "HomeAddressState",
                    data_type: 'PICKLIST',
                    validation_options: {}
                }
            },
            PrefixName: {
                checked: true,
                labelSuffix: "(getLookupList)",
                definition: {
                    key: "PrefixName",
                    data_type: 'PICKLIST',
                    validation_options: {}
                }
            },
            SuffixName: {
                checked: true,
                labelSuffix: "(getLookupList)",
                definition: {
                    key: "SuffixName",
                    data_type: 'PICKLIST',
                    validation_options: {}
                }
            },
            GenderName: {
                checked: true,
                labelSuffix: "(getLookupList)",
                definition: {
                    key: "GenderName",
                    data_type: 'PICKLIST',
                    validation_options: {}
                }
            },
            UnionRelationshipTypeName: {
                checked: true,
                labelSuffix: "(getLookupList)",
                definition: {
                    key: "UnionRelationshipTypeName",
                    data_type: 'PICKLIST',
                    validation_options: {}
                }
            },
            HomeAddressCountry: {
                checked: true,
                labelSuffix: "(getLookupList)",
                definition: {
                    key: "HomeAddressCountry",
                    data_type: 'PICKLIST',
                    validation_options: {}
                }
            },
            IndividualDeactivationReasonName: {
                checked: true,
                labelSuffix: "(getLookupList)",
                definition: {
                    key: "IndividualDeactivationReasonName",
                    data_type: 'PICKLIST',
                    validation_options: {}
                }
            },
            // workLocationNamePicklistTest: {
            //     checked: false,
            //     labelSuffix: "(Dev Example)",
            //     definition: {
            //         key: "WorkLocationName",
            //         data_type: 'PICKLIST',
            //         validation_options: {
            //             values: [
            //                 "KTONE - 101 Gage KDOT",
            //                 "KTTDI - 121 W 21st",
            //                 "KTMAT - 2300 Van Buren KDOT"
            //             ]
            //         }
            //     }
            // },
            // localDuesCategoryNamePicklistTest: {
            //     checked: false,
            //     labelSuffix: "(Dev Example)",
            //     definition: {
            //         key: "LocalDuesCategoryName",
            //         data_type: 'PICKLIST',
            //         validation_options: {
            //             picklist_options: [
            //                 {
            //                     value: "Full Dues",
            //                     alternative_names: ["Full", "Nope"]
            //                 },
            //                 {
            //                     value: "Half Dues"
            //                 }
            //             ]
            //         }
            //     }
            // }
            // EmployerId: {
            //     checked: false,
            //     labelSuffix: "(Dev)",
            //     textInput: true,
            //     definition: {
            //         key: "EmployerId",
            //         // default_value: "",
            //     }
            // },
            // UnitId: {
            //     checked: false,
            //     labelSuffix: "(Dev)",
            //     textInput: true,
            //     definition: {
            //         key: "UnitId",
            //         // default_value: "",
            //     }
            // },
            // UnitName: {
            //     checked: false,
            //     labelSuffix: "(Dev)",
            //     textInput: true,
            //     definition: {
            //         key: "UnitName",
            //         // default_value: "",
            //     }
            // },

            // START: FPC controller field definitions.
            // DoNotChangeAfterDate: {
            //     checked: false,
            //     labelSuffix: "(Dev)",
            //     textInput: true,
            //     definition: {
            //         key: "DoNotChangeAfterDate",
            //         default_value: "",
            //     }
            // },
            // StopMemberNotOnFile: {
            //     checked: false,
            //     labelSuffix: "(Dev)",
            //     textInput: true,
            //     definition: {
            //         key: "StopMemberNotOnFile",
            //         data_type: 'PICKLIST',
            //         default_value: "",
            //         validation_options: {
            //             values: [
            //                 "0",
            //                 "1"
            //             ]
            //         }
            //     }
            // },
            // StopPotentialMemberNotOnFile: {
            //     checked: false,
            //     labelSuffix: "(Dev)",
            //     textInput: true,
            //     definition: {
            //         key: "StopPotentialMemberNotOnFile",
            //         data_type: 'PICKLIST',
            //         default_value: "",
            //         validation_options: {
            //             values: [
            //                 "0",
            //                 "1"
            //             ]
            //         }
            //     }
            // },
            // LeaveEmploymentNotOnFile: {
            //     checked: false,
            //     labelSuffix: "(Dev)",
            //     textInput: true,
            //     definition: {
            //         key: "LeaveEmploymentNotOnFile",
            //         data_type: 'PICKLIST',
            //         default_value: "",
            //         validation_options: {
            //             values: [
            //                 "0",
            //                 "1"
            //             ]
            //         }
            //     }
            // },
            // HelpRequestTicketNumber: {
            //     checked: false,
            //     labelSuffix: "(Dev)",
            //     textInput: true,
            //     definition: {
            //         key: "HelpRequestTicketNumber",
            //         default_value: "",
            //     }
            // },
            // END: FPC controller field definitions.

            // test_column: {
            //     checked: false,
            //     labelSuffix: "(Dev)",
            //     textInput: true,
            //     definition: {
            //         key: "test_column",
            //         default_value: "test column default value",
            //     }
            // }
        }
        this.templateOverrides = {
            validation_hooks_to_add: this.validationHooks,
            columns_to_update: this.columnsToUpdate,
            // columns_to_add: this.columnsToAdd,
            // columns_to_remove: this.columnsToRemove,,
        }
        this.importerVariables = {
            importerEnv: {
                tag: 'select',
                name: 'importerEnv',
                id: 'importerEnv',
                options: {
                    default: "Default",
                    // prod: "Production",
                    stage: "Staging",
                    dev: "Development",
                },
            },
            importMethod: {
                tag: 'select',
                name: 'importMethod',
                id: 'importMethod',
                options: {
                    webhook: "Webhook",
                    default: "File Download",
                },
            },
            // @todo Disabled for now. Enable if we need to select lambdaEnv from a code hook - TBD.
            // lambdaEnv: {
            //     tag: 'select',
            //     name: 'lambdaEnv',
            //     id: 'lambdaEnv',
            //     options: {
            //         // prod: "Production",
            //         stage: "Staging",
            //         dev: "Development",
            //     },
            // },
            disableTransformAmounts: {
                tag: 'input',
                type: 'checkbox',
                checked: false,
                value: true,
                name: 'disableTransformAmounts',
                id: 'disableTransformAmounts',
            },
            disableTransformPhoneNumbers: {
                tag: 'input',
                type: 'checkbox',
                checked: false,
                value: true,
                name: 'disableTransformPhoneNumbers',
                id: 'disableTransformPhoneNumbers',
            },
            disableTransformSplitNames: {
                tag: 'input',
                type: 'checkbox',
                checked: false,
                value: true,
                name: 'disableTransformSplitNames',
                id: 'disableTransformSplitNames',
            },
            disableTransformSplitFullAddress: {
                tag: 'input',
                type: 'checkbox',
                checked: false,
                value: true,
                name: 'disableTransformSplitFullAddress',
                id: 'disableTransformSplitFullAddress',
            },
        }
    },
    mounted() {
        this.buildLauncherOptionsForm()
    },
    methods: {
        /**
         * Pre-fetch the static lookup lists that do not rely on the affiliate number.
         */
        fetchLookupLists() {
            let fetchLookupListsPayload = { "returnScope": Object.values(this.lookupListsColumnMap) }
            axios.post('/api/v2/custom/oneschema/fetchLookupLists', fetchLookupListsPayload)
                .then((response) => {
                    // Save the raw data from the response.
                    this.lookupListsRaw = response.data
                    this.enableDebugging && console.log('lookupListsRaw:', this.lookupListsRaw);
                    // Create usable lookupLists picklists.
                    Object.entries(response.data).forEach(([scope, items]) => {
                        // Refer to OneSchema documentation for picklist format variations:
                        // - https://docs.oneschema.co/docs/per-customer-overrides-v2#picklist-overrides
                        // Provide alternative names:
                        // - If the lookup list includes a code, use code as value and provide alternative names.
                        // - For suffixes that have periods, include an alternative name that does not (helps OneSchema map picklist values).
                        let keyName = (items[0]?.hasOwnProperty('code') || scope === 'suffix') ? 'picklist_options' : 'values'
                        this.lookupLists[scope] = {}
                        this.lookupLists[scope][keyName] = []
                        items.forEach(item => {
                            if (keyName === 'picklist_options') {
                                if (scope === 'suffix') {
                                    let noDotName = item.name.replaceAll('.', '')
                                    this.lookupLists[scope][keyName].push({
                                        value: item.name,
                                        ...(item.name !== noDotName) && { alternative_names: [noDotName] },
                                    })
                                }
                                else {
                                    this.lookupLists[scope][keyName].push({
                                        value: item.code,
                                        alternative_names: [item.name],
                                    })
                                }
                            }
                            else {
                                this.lookupLists[scope][keyName].push(item.name)
                            }
                        })
                    })
                    this.enableDebugging && console.log('lookupLists:', this.lookupLists);
                })
                .catch(error => {
                    console.log('fetchLookupLists error:', error.response);
                })
                .finally(() => {
                });
        },
        /**
         * Add the pre-fetched lookup lists to OneSchema template overrides.
         */
        setLookupLists() {
            // Set the lookup lists as picklists in OneSchema template overrides.
            Object.entries(this.lookupListsColumnMap).forEach(([column, scope]) => {
                if (this.columnsToUpdate.hasOwnProperty(column) && this.lookupLists.hasOwnProperty(scope)) {
                    this.columnsToUpdate[column].definition.validation_options = this.lookupLists[scope] || []
                }
            })
            this.templateOverrides.columns_to_update = this.columnsToUpdate
            this.enableDebugging && console.log('setLookupLists lookupLists:', this.lookupLists);
            this.enableDebugging && console.log('setLookupLists templateOverrides:', this.templateOverrides);
        },
        /**
         * Allow setting the OneSchema Importer and Lambda environments to use.
         *
         * This is primarily used to allow flexibility to developers, testers,
         * and demos to get by with minimal environments. However, it can also
         * be used on local to more easily test code changes between environments.
         */
        setImporterEnvs() {
            // Default uses the environment variables. Selecting another option will use temporarily available values.
            // @todo This will no longer be functional once we deploy more-secure values for dev and stage, unless we re-factor.
            this.importerEnv = this.importerOptions.payload.importerEnv || "default";
            // lambdaEnv may be used in code hooks; however, webhooks depend on importerEnv through OneSchema variables.
            this.lambdaEnv = this.importerOptions.payload.lambdaEnv || "stage";
        },
        /**
         * Prepare options for use in Laravel and OneSchema importer launch config.
         */
        buildImporterOptions() {
            this.setImporterEnvs();
            // Pass env separate from payload, since env is used by OneSchemaController::GenerateImporterPayload()
            this.importerOptions["importerEnv"] = this.importerEnv
            // Add default values to payload, similar to template overrides. For example, set values
            // for columns like UnitId and EmployerId in a code hook.
            // todo These are not currently active on the form. If needed, uncomment them in this.templateOverrides.columns_to_update.
            if (this.formDataEntries.has("columns_to_update_UnitId_default_value")) {
                this.importerOptions.payload["UnitId"] = this.formDataEntries.get("columns_to_update_UnitId_default_value")
            }
            if (this.formDataEntries.has("columns_to_update_EmployerId_default_value")) {
                this.importerOptions.payload["EmployerId"] = this.formDataEntries.get("columns_to_update_EmployerId_default_value")
            }
        },
        /**
         * Generate the OneSchema importer with custom launch config from Laravel.
         */
        async generateOneSchemaImporterLaunchParams() {
            this.buildImporterOptions();
            return await axios.post(`/api/v2/custom/oneschema/generateImporterPayload`, this.importerOptions)
                .then((response) => {
                    this.enableDebugging && console.log('From axios', response.data);
                    this.enableDebugging && console.log('importerOptions', this.importerOptions)
                    this.launchParams.importConfig = response.data.importConfig
                    this.launchParams.userJwt = response.data.userJwt
                })
                .catch(error => {
                    console.log('generateOneSchemaImporterLaunchParams error:', error.response);
                })
                .finally(() => {
                })
        },
        /**
         * Build config, launch OneSchema importer, and act on events.
         *
         * @param templateKey
         */
        async launchOneSchema(templateKey) {
            this.isFileDownloadable = false;
            this.embedId = null;
            this.enableDebugging && console.log('launchOneSchema Clicked:', templateKey);

            // Build the OneSchema launch params.
            this.launchParams = {
                templateKey: templateKey,
                templateOverrides: this.buildTemplateOverrides(templateKey),
            }
            // Generate the OneSchema importer utilizing the generateImporterPayload endpoint.
            // NOTE: generateOneSchemaImporter needs to run after buildTemplateOverrides
            //       (because buildTemplateOverrides calls getLauncherOptions)
            await this.generateOneSchemaImporterLaunchParams();

            // Importer errors when passing a reactive object. Use cloneDeep to pass a copy.
            const importerParams = cloneDeep(this.launchParams);
            // Launch OneSchema importer.
            this.importer.launch(importerParams);

            // Handle OneSchema events.
            this.importer.on('launched', (data) => {
                this.enableDebugging && console.log('on launched', data)
                // TODO: When converting to vuetify, consider using sessionToken when relaunching under the right conditions.
                // this.sessionToken = data.sessionToken
            })
            this.importer.on('success', (data) => {
                this.enableDebugging && console.log('on success', data);
                // Prepare variables to build the download file and show the download link.
                if (data.count > 0) {
                    this.embedId = data.embed_id
                    this.jsonArrayData = data.records;
                    this.jsonColumns = data.columns.map(column => column.template_column_key)
                    this.orderedColumns = this.allColumns.filter((element) => this.jsonColumns.includes(element))
                    this.isFileDownloadable = true;
                }
            });
            this.importer.on('cancel', () => {
                // Close and clean up the importer. Otherwise, additional iframes may persist.
                this.importer.removeAllListeners()
            });
            this.importer.on('error', (message) => {
                // Output error messages. Do not require this.enableDebugging in this case.
                console.error('oneschema importer error', message);
            });
        },
        /**
         * Build the launcher options form to allow varying the OneSchema importer launch config.
         *
         * NOTE: It may be useful to always enable developers to vary config
         * passed to OneSchema importer, however the form should be minimized
         * for most users prior to launch.
         */
        buildLauncherOptionsForm() {
            let launcherOptionsForm = document.getElementById("launcher-options");
            launcherOptionsForm.setAttribute("style", "display:flex;flex-direction:column")

            // Add template overrides sections.
            Object.entries(this.templateOverrides).forEach(([name, overrides]) => {
                let groupTitle = document.createElement('h3')
                groupTitle.innerText = name
                launcherOptionsForm.appendChild(groupTitle)

                Object.entries(overrides).forEach(([label, override]) => {
                    this.enableDebugging && console.log(name, label);

                    let id = name.concat('_', label)
                    let checkBox = document.createElement('input')
                    checkBox.setAttribute('type', 'checkbox')
                    checkBox.setAttribute('name', name)
                    checkBox.setAttribute('id', id)
                    checkBox.setAttribute('value', label)
                    if (override.checked) {
                        checkBox.setAttribute('checked', 'checked')
                    }
                    let checkBoxLabel = document.createElement('label')
                    checkBoxLabel.setAttribute('for', id)
                    checkBoxLabel.innerHTML = label.concat(' ', override.labelSuffix)
                    checkBoxLabel.setAttribute("style", "margin-left:10px")

                    let inputDiv = document.createElement('div')
                    inputDiv.appendChild(checkBox)
                    inputDiv.appendChild(checkBoxLabel)
                    if (override.textInput) {
                        let textInputId = id.concat('_', 'default_value')
                        let textInput = document.createElement('input')
                        textInput.setAttribute('type', 'text')
                        textInput.setAttribute('name', textInputId)
                        textInput.setAttribute('id', textInputId)
                        // textInput.setAttribute('placeholder', "default value")
                        textInput.value = override.definition.default_value || ""
                        textInput.setAttribute("style", "margin-left:10px;padding:0 5px;border:1px solid #ccc;")
                        inputDiv.appendChild(textInput)
                    }
                    launcherOptionsForm.appendChild(inputDiv)
                });
            })

            // Add variables section.
            let groupTitle = document.createElement('h3')
            groupTitle.innerText = "Configuration"
            launcherOptionsForm.appendChild(groupTitle)
            Object.entries(this.importerVariables).forEach(([name, attributes]) => {
                let element = document.createElement(attributes.tag)
                if (attributes.type) {
                    element.setAttribute('type', attributes.type)
                }
                if (attributes.value) {
                    element.setAttribute('value', attributes.value)
                }
                element.setAttribute('id', attributes.id)
                element.setAttribute('name', attributes.name)
                element.setAttribute("style", "margin-left:10px;padding:0 5px;border:1px solid #ccc;")
                if (attributes.options) {
                    Object.entries(attributes.options).forEach(([key, value]) => {
                        const option = document.createElement('option')
                        option.value = key
                        option.text = value.toString()
                        element.add(option)
                    })
                }
                if (attributes.checked) {
                    element.setAttribute('checked', 'checked')
                }

                let elementLabel = document.createElement('label')
                elementLabel.setAttribute('for', attributes.id)
                elementLabel.innerHTML = name //.concat(' ', attributes.labelSuffix)
                elementLabel.setAttribute("style", "margin-left:10px")

                let elementDiv = document.createElement('div')
                elementDiv.appendChild(element)
                elementDiv.appendChild(elementLabel)

                launcherOptionsForm.appendChild(elementDiv)
            })

            this.enableDebugging && console.log(launcherOptionsForm)
        },
        /**
         * Get all launcher options for use as OneSchema config and template overrides.
         *
         * @param overrides
         */
        getLauncherOptions(overrides) {
            this.importerOptions = {}
            let payload = {}

            let form_data = new FormData(document.querySelector("#launcher-options"))
            this.formDataEntries = new Map(form_data.entries())

            this.enableDebugging && console.log('formDataEntries', this.formDataEntries)
            this.enableDebugging && console.log('templateOverrides', this.templateOverrides)

            for (const [ key, value ] of form_data.entries()) {
                this.enableDebugging && console.log(key + ': is ' + value)
                if (this.importerVariables.hasOwnProperty(key)) {
                    payload[key] = value
                }
                if (!overrides.hasOwnProperty(key)) {
                    continue
                }
                if (!key.endsWith('_default_value') && this.templateOverrides[key][value]) {
                    let definition = {...this.templateOverrides[key][value].definition}
                    let defaultTextInput = [key, value, 'default_value'].join('_')
                    let defaultValue = this.formDataEntries.get(defaultTextInput)
                    if (defaultValue !== undefined && defaultValue.length > 0) {
                        definition['default_value'] = defaultValue
                    }
                    else {
                        delete definition.default_value
                    }
                    overrides[key].push(definition)
                }
            }
            this.importerOptions.payload = payload
            this.enableDebugging && console.log("importerOptions in getLauncherOptions:", this.importerOptions)
        },
        /**
         * Build the template overrides to include in OneSchema importer launch config.
         *
         * @param templateKey
         *   Currently unused, but potentially very useful if we need to vary based on template.
         */
        buildTemplateOverrides(templateKey) {
            let selectedOverrides = {
                // columns_to_add: [],
                columns_to_update: [],
                // columns_to_remove: [],
                validation_hooks_to_add: []
            }
            // Add selected template overrides.
            if (this.enableLauncherOptions) {
                // Lookup Lists are pre-fetched. setLookupLists adds them to the template overrides.
                this.setLookupLists()
                // Get all launcher options from the form and elsewhere.
                this.getLauncherOptions(selectedOverrides)
            }
            this.enableDebugging && console.log("selectedOverrides:", selectedOverrides)
            return selectedOverrides
        },
        /**
         * Build a CSV from OneSchema importer success event.
         *
         * @param filename
         *
         * @deprecated Remove in cleanup.
         */
        downloadCSVFromJson(filename) {
            if (this.jsonArrayData) {
                let arrayOfJson = this.jsonArrayData;
                // console.log('downloadCSVFromJson:', arrayOfJson);
                // convert JSON to CSV
                const replacer = (key, value) => value === null ? '' : value // specify how you want to handle null values here
                const header = this.orderedColumns
                let csv = arrayOfJson.map(row => header.map(fieldName =>
                    JSON.stringify(row[fieldName], replacer)).join(','))
                csv.unshift(header.join(','))
                csv = csv.join('\r\n')

                // Create link and download
                let link = document.createElement('a');
                link.setAttribute('href', 'data:text/csv;charset=utf-8,%EF%BB%BF' + encodeURIComponent(csv));
                link.setAttribute('download', filename);
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        },
        /**
         * Download the finalized CSV directly from OneSchema.
         */
        downloadCSVFromOneSchema() {
            if (!this.embedId) {
                this.enableDebugging && console.log('downloadCSVFromOneSchema:', 'embedId not found');
                return;
            }
            axios.get('/api/v2/custom/oneschema/getImportedFileUrl/' + this.embedId)
                .then((response) => {
                    // Get the imported file url.
                    this.importedFileUrl = response.data?.url || '';
                    this.enableDebugging && console.log('importedFileUrl:', this.importedFileUrl);

                    // Create link and download
                    let link = document.createElement('a');
                    link.setAttribute('href', this.importedFileUrl);
                    link.style.visibility = 'hidden';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                })
                .catch(error => {
                    console.log('downloadCSVFromOneSchema error:', error.response);
                })
                .finally(() => {
                });
        }
    }
}
</script>

<style scoped>
.file-uploader .primary-button,
.file-uploader .secondary-button {
    background-color: ghostwhite;
    border-radius: 3px;
    box-shadow: 2px 3px 14px 5px rgba(58, 67, 86, 0.1);
    padding: 1.25rem 3.75rem;
    height: auto;
    width: auto;
}
.file-uploader .primary-button {
    background-color: #28A745;
    /* FIXME: Upstream v-button has an !important that we need to override with another... */
    color: white !important;
}
.file-uploader ol {
    width: 90%;
    margin: 0 auto;
}
.file-uploader ol > .list-title {
    font-size: 1.5rem;
    letter-spacing: 2%;
    line-height: 2.7rem;
    font-weight: bold;
}
.file-uploader ol > .list-title,
.file-uploader h2 {
    margin-top: 2.5rem;
}
.file-uploader h1 {
    font-size: 3rem;
    line-height: 4.8rem;
    margin: 2rem auto;
    display: flex;
    justify-content: space-between;
}
.file-uploader h1 span {
    flex-grow: 1;
}
.file-uploader .list-text {
    font-size: 1rem;
    line-height: 1.75rem;
    font-weight: normal;
    letter-spacing: 0%;
    margin-bottom: 0.2rem;
}
.file-uploader li {
    font-size: 1rem;
    font-weight: normal;
    letter-spacing: 2%;
    line-height: 1.75rem;
}
.file-uploader ul li {
    list-style-type: disc;
}
.file-uploader .advanced {
    border-radius: 3px;
    border-bottom: 1px solid rgba(212, 212, 212, 1);
    box-shadow: 0px 3px 4px 0px rgba(0, 0, 0, 0.25), 0px 0px 2px 0px rgba(0, 0, 0, 0.25);
    padding: 0.75rem 1.25rem;
    height: auto;
    width: auto;
    margin: 3.5rem auto;
    cursor: pointer;
}
.file-uploader .advanced h2 {
    margin: 0;
    font-size: 1.35rem;
    line-height: 2.20rem;
    display: flex;
    justify-content: space-between;
}
.file-uploader .advanced .expand {
    color: #686E71;
}
.file-uploader .advanced .expanded-options {
    margin-top: 1rem;
}
.file-uploader .downloads .download-last {
    /* FIXME: Upstream v-button has an !important that we need to override with another... */
    background: white !important;
    border: 1px solid green;
    box-shadow: none;
    color: green;
    padding: 1.25rem 3rem;
}
.file-uploader .downloads {
    display: inline-flex;
    flex-direction: column;
    gap: 1rem;
}
.file-uploader a {
    color: #0056B3;
}
.file-uploader a > span {
    text-decoration: underline;
}
</style>
