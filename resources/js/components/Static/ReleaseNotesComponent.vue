<template>
    <v-container>

       <v-row>
            <v-col>
                <v-card class="v-card--outlined v-sheet--tile p-4">
                    <h1>Release Notes [Sprint 14]</h1><br>
                    <h4>Milestone</h4><br>
                    - Migration of 500 locals from 1.0 into 2.0’s AFTDB with no errors.<br><br>
                    <h4>New Features</h4><br>
                    - Addition of new accordions on the Affiliate record:<br>
                        a. Dues Categories<br>
                        b. Staff Roles<br>
                        c. Committees<br>
                        d. Contact Information<br>
                    - Enhancement of accordions on the Employer record:<br>
                        a. Added Work Structure Type, Structure Code, and Parent Structure</br>
                        b. Added Work Location Type, Location Code, and Parent Location<br>
                    - Addition of new accordions on the Individual record:<br>
                        a. Union Roles<br>
                        b. Assessment Ratings<br>
                        c. Quick Comments<br>
                    - Updated the list of filters available on the Individual listing page so that data can be filtered on this set of fields<br>
                    - Developed the filter panel on the Employer listing so that it appears on the listing page. The filtering functionality has not been implemented yet.<br>
                    - Added display controls to allow the user to choose which columns on the Employer Listing to expose: GUID, Employer Name, Employer Type, Phone, Address, Affiliate Name, Email Address, Parent Name, and Code.<br><br>
                    <h4>Improvements</h4><br>
                    - Fixed the pagination so that it functions on the listing pages<br>
                    - Enhanced the Unit Report to display the individual’s details<br>
                    - Enhance Officers Admin Report:<br>
                        a. Display officer counts including the unique individuals under an officer role<br>
                        b. Display officers based on the hierarchy of roles<br>
                    - Enhanced the Assessment Report:<br>
                        a. View comments for the assessments<br>
                        b. Count individuals based on comments<br>
                </v-card>
            </v-col>
        </v-row>

       <v-row>
            <v-col>
                <v-card class="v-card--outlined v-sheet--tile p-4">
                    <h1>Release Notes [Sprint 13]</h1><br>
                    <h4>New Features</h4><br>
                    - Added the ability to show/hide columns on the Affiliate Listing page so that users can choose which columns they want to view.<br>
                    - Updated the Affiliate, Individuals, and Employers Details pages to dynamically pull in data for the summary and specific accordion sections.<br>
                    - Created new Assessment Ratings report in Sisense.<br><br>
                    <h4>Improvements</h4><br>
                    - Migrated 500 affiliates from 1.0 into 2.0’s AFTDB with minor errors.<br>
                    - Updated the filters on the Affiliate and Individual Listing pages so that users can filter data using the left panel.<br>
                    - Incorporated updates into the Officers admin report within Sisense per feedback from Sprint 12.<br>
                </v-card>
            </v-col>
        </v-row>

        <v-row>
            <v-col>
                <v-card class="v-card--outlined v-sheet--tile p-4">
                    <h1>Release Notes [Sprint 12]</h1><br>
                    <h4>New Features</h4><br>
                    - Added Related Data for Affiliates, Individuals, and Employers to display in the listing pages (ie. Grid Views) as new columns<br>
                    - Implemented filtering functionality on the listing pages for Affiliates, Individuals, and Employers<br>
                    - Implemented the accordion component to allow the system to display detailed data using expand/collapse functionality<br>
                    - Created display template for Affiliates, Individuals, and Employers Records<br>
                    - Dynamically pull migrated data in to display on the details pages for Affiliates<br><br>
                    <h4>Improvements</h4><br>
                    - Updated the display of the Connect 2.0 UI to more closely match the styling on Connect 1.0<br>
                    - Updated data structure for contact information so that it could display on the UI of listing pages and detail pages<br>
                    - Updated sorting logic for Full Name in the Individual Listing<br>
                    - Enhancements to the back-end structure to improve performance of the UI
                </v-card>
            </v-col>
        </v-row>

        <v-row>
            <v-col>
                <v-card class="v-card--outlined v-sheet--tile p-4">
                    <h1>Release Notes [Sprint 11 - 12/6/2019]</h1><br>
                    <h4>New Features</h4><br>
                    - Affiliate record includes an officer section that identifies each officer's name, their local role title, and the national role title.<br>
                    - Global header and footer have been added and styled with the AFT branding to have the Connect 1.0 wrapper. Note that not all links are functioning at the moment and serve as placeholders until the functionality for those pages are developed.<br>
                    - Responsive mobile header and menu has been added to allow users to navigate from a mobile device. Note that not all links are functioning at the moment and serve as placeholders until the functionality for those pages are developed.<br>
                    - Integrated a more robust grid component for the Affiliate listing pages that will enable the build of sorting, paginating, and filtering of data.<br>
                    - Enhancements to Unit Report, Add/Drop Report using filters and visualizations. These reports are only accessible in the Sisense Platform. <br><br>
                    <h4>Improvements</h4><br>
                    - Fixed the display errors on the Affiliate Record page. All record pages for Affiliates, Individuals, and Employers should be accessible and display their migrated data.<br><br>
                    <h4>Improvements</h4><br>
                    - Migration data from 1.0 to AFTDB now includes 60 locals total.
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        name: "ReleaseNotesComponent",
        data: () => ({})

    }
</script>

<style scoped>

</style>
