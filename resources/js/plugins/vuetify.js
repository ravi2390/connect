import 'font-awesome/css/font-awesome.min.css'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify';
import DateFnsAdapter from '@date-io/date-fns';
import { enUS } from 'date-fns/locale'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import { aliases, fa } from 'vuetify/iconsets/fa4'
import { mdi } from 'vuetify/iconsets/mdi'

export default createVuetify({
    components,
    date: {
        adapter: DateFnsAdapter,
        locale: { en: enUS },
    },
    directives,
    display: {
        mobileBreakpoint: 'lg',
        thresholds: {
            xs: 0,
            sm: 576,
            md: 768,
            lg: 992,
            xl: 1200,
        },
    },
    theme: {
        defaultTheme: 'light',
        themes: {
            light: {
                colors: {
                    primary: '#092a5c',
                    primaryDark: '#0c1f42',
                    primaryLight: '#3f98c9',
                    secondary: '#b0bec5',
                    bprimary: '#3490dc',
                    accent: '#8c9eff',
                    error: '#b71c1c',
                    default: '#999',
                    green: '#4caf50',
                    red: '#f44336',
                }
            },
        },
    },
    icons: {
        defaultSet: 'fa',
        aliases,
        sets: {
            fa,
            mdi,
        },
    },
    ssr: true,
});
