<template>
<v-app>
    <div id="publicApp">
        <PublicHeaderComponent />
        <main class="py-4" id="main-container">
            <router-view></router-view>
        </main>
        <FooterComponent />
    </div>
</v-app>
</template>

<script>
    import PublicHeaderComponent from "./components/Common/PublicHeaderComponent";
    import FooterComponent from "./components/Common/FooterComponent";

    export default {
        name: "publicApp",
        components: {
            PublicHeaderComponent,
            FooterComponent
        }
    };
</script>

<style></style>
