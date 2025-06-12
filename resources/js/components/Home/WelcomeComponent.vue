<template>
    <v-expansion-panels v-model="panel" class="home-welcome mb-8">
        <v-expansion-panel>
            <v-expansion-panel-title>
                <h4>Welcome back!</h4>
            </v-expansion-panel-title>
            <v-expansion-panel-text class="border-sm">
                <v-card variant="flat" class="p-3">
                    <h4>Welcome to AFT Connect 2.0!</h4>
                    <p>We have worked diligently to bring you a tool that will meet your organizing and member data needs.</p>
                    <p>To help you get acquainted with Connect 2.0, training webinars will be offered weekly. Each week the webinar(s) will highlight the latest features of Connect 2.0 and provide an opportunity for questions and answers. <b><a href="/whatsnew">Click here to see what’s new!</a></b></p>
                    <p>The link(s) to register for this week’s webinar(s) is below.</p>
                    <p><strong>You’re encouraged to register even if you cannot attend the live webinar, an on-demand version will be emailed to you one hour after the webinar concludes.</strong></p>
                    <h4>This Week's Webinar(s)</h4>
                    <p style="font-size: smaller;"><i>(click on the link next to the date to register)</i></p>
                    <p>Wednesday June 17th  at 5 p.m. ET: <b><a href="https://event.on24.com/wcc/r/2432459/4C9D4CCA8589141B35951A6AB8AEBCC1">Assessments & Comments</a></b></p>
                    <p>Unable to attend a previous webinar? No problem! Links to previously recorded webinars are below. You will be required to register and will then be directed to the recording.</p>
                    <h4>Previous Webinars</h4>
                    <p><b><a href="https://event.on24.com/wcc/r/2333180/170BE5D7FBB03B526758E108FA4918E1">The Basics of Connect 2.0</a></b></p>
                    <p><b><a href="https://event.on24.com/wcc/r/2368316/475C32D65A75EF5552BAF7A41061A7A4">Updating/Editing an Individual's Affiliation & Exporting Custom Lists</a></b></p>
                    <p><b><a href="https://event.on24.com/wcc/r/2386485/940A030699143DAA258DAFC6D6838561">Managing Officers & Other Affiliate Roles</a></b></p>
                    <p><b><a href="https://event.on24.com/wcc/r/2415246/507C306085CFD7DBDCAAF4AAC57A3C15">Quick Update: New Features-June Week 1</a></b></p>
                    <p><strong>We appreciate your patience as we work to ensure that AFT Connect empowers you in the work you do daily to strengthen your union! If you have any questions or concerns, please submit a ticket via AFT Help Requests.</strong></p>
                </v-card>
            </v-expansion-panel-text>
        </v-expansion-panel>
    </v-expansion-panels>

</template>

<script>
    export default {
        data: () => ({
            panel: 0,
        }),
    }
</script>

<style>
    .home-welcome .v-expansion-panel-title { background-color: #e2eff8; }
    .home-welcome .v-expansion-panel-content__wrap { padding: 0; }
</style>
