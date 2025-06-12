<template>
    <v-container>

        <v-row>
            <v-col>
                <v-card class="v-card--outlined v-sheet--tile p-4">
                    <h3>What's New!</h3>
                    <p><strong>Quicker Reporting</strong> – When you add or edit individual records, you can expect to see that updated information displayed on the grid right away. You can make changes to records and export those changes the next time you use the filters.</p>
                    <p><strong>Fewer Clicks to Update Information</strong> – Our new “flip card” editing feature lets you update contact information, union relationships, and employment details from a single page.</p>
                    <p><strong>Units</strong> – Regular affiliates with multiple employer contracts or bargaining units will now see that information displayed as Units. Federated locals will continue have access to their separate chartered chapters.</p>
                    <p><strong>Retirees</strong> – There are new options for how to manage your retired members! In addition to keeping retirees in special unit (not chapter!) of your local or moving them to the AFT national retiree-at-large local, you can now decide to share information about your retired members with a separate chartered retiree local or state federation.</p>
                    <p><strong>Organizing Actions</strong> – Quick Comments now features a place to connect Assessment ratings to a Yes or Refused response for up to 5 placeholder “Organizing Actions.” These can be actions like signing a petition, pledging to vote yes in a contract campaign, taking a photo holding a union sign – it’s up to you to decide what makes sense for your local.</p>
                </v-card>
            </v-col>
        </v-row>

       <v-row>
            <v-col>
                <v-card class="v-card--outlined v-sheet--tile p-4">
                    <h3>Continued Support</h3>
                    <p><strong>Member Information</strong> – You can continue to update contact information, relationship status, and employment details for members, retired members, potential members, agency fee payers, and associated friends of the union.</p>
                    <p><strong>Individuals Grid</strong> – You can also continue to filter your bargaining units and display or export customized lists as needed. The gears now allow you to check which fields you want to see and make that change immediately without having to save a preset group.</p>
                    <p><strong>Officers and Committees</strong> – Affiliates will be able to add and remove individuals to current officer roles, as well as modify individuals on our standard list of committees or any committees you were already using in Connect.</p>
                </v-card>
            </v-col>
        </v-row>

        <v-row>
            <v-col>
                <v-card class="v-card--outlined v-sheet--tile p-4">
                    <h3>On Hold</h3>
                    <p><strong>Employment and Affiliate Structures</strong> – While you will still be able to manage employment information and dues categories for individual bargaining unit members on their records, you won’t be able to add new worksites or dues categories until fall 2020. If you need modifications before then, contact us using the Feedback link and we can update it for you.</p>
                    <p><strong>User Management</strong> – All users who had accounts in Connect 1.0 will still be able to log in with their existing email addresses and passwords. Adding new users locally will be put on hold until Back to School 2020. If you need a new user before then, contact us using the Feedback link and we can create an account for you.</p>
                    <p><strong>Forms & Events</strong> – We’ve heard lots of feedback from users about problems with reporting on the Forms and Events features in Connect 1.0. To give our team time to work on modifications to those features, we’ve temporarily removed them. We expect that improved Forms and Events will return in time for Back to School 2020!</p>
                    <p><strong>Chapter Permissions</strong> – Current users can have access to an affiliate’s entire membership list. We anticipate that federated locals with chapter-level users will be able to restore that limited access in late 2020.</p>
                    <p><strong>Custom Fields</strong> – Custom fields will no longer be available in Connect 2.0. If you were actively using custom fields and have not yet had a conversation with the AFT field data staff person assigned to your state to figure out the best place for that data to be stored, you can contact us using the Feedback link.</p>
                </v-card>
            </v-col>
        </v-row>

        <v-row>
            <v-col>
                <v-card class="v-card--outlined v-sheet--tile p-4">
                    <h3>Coming Soon</h3>
                    <p><strong>Groups</strong> – Groups is our anticipated replacement for keeping track of non-bargaining unit supporters and other organizations that your members belong to. Look for more details about this feature in time for Back to School 2020.</p>
                    <p><strong>Grades/Steps/Compensation</strong> – In late 2020, you’ll be able to add detailed information about members’ compensation status under your bargaining contracts.</p>
                </v-card>
            </v-col>
        </v-row>

    </v-container>
</template>

<script>
    export default {
        name: "WhatsNewComponent",
        data: () => ({})
    }
</script>

<style scoped>
    h4 { text-transform: uppercase; }

</style>
