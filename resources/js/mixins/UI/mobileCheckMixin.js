export default {
    data: () => ({
        mobileBreakPoint: 960,
        windowWidth: window.innerWidth
    }),
    computed: {
        isOnMobile() {
            if (this.windowWidth < this.mobileBreakPoint) {
                return true;
            }
            return false;
        },
    },
    mounted() {
        window.addEventListener('resize', this.getWindowWith);
    },
    methods: {
        getWindowWith() {
            this.windowWidth = window.innerWidth;
        }
    },
    destroyed() {
        window.removeEventListener('resize', this.getWindowWith);
    }
}
