<template>
<v-footer>
<div class="flex-1-0 align-self-end" style="z-index: 9">
    <div class="footer-block" id="main-footer-block">
        <v-container>
            <div class="footer-left">
                <img src="/images/logos/footer-img.png" alt="AFT logo" />
                <div class="address">
                    AFT, AFL-CIO<br>
                    555 New Jersey Ave. N.W.<br>
                    Washington, DC 20001<br>
                    (202) 879-4400
                </div>
            </div>
            <div class="copy-rights">&#169; AFT, AFL-CIO.</div>
        </v-container>
    </div>
    <!-- Mobile back to top fab button -->
    <div>
        <v-btn
            v-scroll="onScroll"
            v-show="fab"
            color="#6F9FCD"
            @click="toTop"
            class="back-to-top-btn position-fixed mb-3 mr-3"
            icon="mdi:mdi-chevron-up"
            location="bottom right"
        >
        </v-btn>
    </div>
</div>
</v-footer>
</template>

<script>
import { useGoTo } from "vuetify";
    export default {
        name: "FooterComponent",
        data () {
            return {
                bottomNav: 'recent',
                fab: false
            }
        },
        setup() {
            const goTo = useGoTo();
            return { goTo };
        },
        methods: {
            onScroll (e) {
                if (typeof window === 'undefined') return;
                const top = window.pageYOffset ||   e.target.scrollTop || 0;
                this.fab = top > 20;
            },
            toTop () {
                this.goTo(0);
            }
        }
    }
</script>

<style lang="scss" scoped>
.footer-block {
    max-width: 100vw;
    border-top: 4px solid #3f98c9;
    background: #092a5c;
    padding-top: 50px;
    padding-bottom: 50px;
    font-family: "Open Sans", sans-serif;
    font-weight: 400;
    font-style: normal;
    color: #ffffff;
    letter-spacing: 0.01rem;
    line-height: 1.125rem;
    font-size: 0.875rem;
}

.footer-block img {
    margin-bottom: 35px;
    padding-right: 15px;
    float: left;
}

.copy-rights {
    margin-top: 30px;
    padding-left: 42px;
}
.copy-rights span {
    padding-left: 0.875rem;
}
#memberforms {
    .back-to-top-btn {
        display: none;
    }
}

@media only screen and (min-width: 960px) {
    .footer-block {
        padding-top: 1.25rem;
        padding-bottom: 1.25rem;
    }
    .footer-block .v-container {
        display: flex;
        justify-content: space-between;
    }
    .footer-left {
        display: flex;
    }
    .copy-rights {
        margin-top: 0;
        padding-left: 0;
    }
}
</style>
