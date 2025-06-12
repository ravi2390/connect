import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue';
import vuetify from 'vite-plugin-vuetify';

export default defineConfig({
    build: {
        minify: process.env.NODE_ENV === 'production',
        sourcemap: process.env.NODE_ENV === 'development',
    },
    plugins: [
        laravel({
            input: [
                'resources/js/app.js',
                'resources/sass/app.scss',
                'resources/js/publicApp.js',
                'packages/aft/admin/resources/js/app.js',
                'packages/aft/memberforms/resources/js/private.js',
                'packages/aft/memberforms/resources/sass/private.scss',
                'packages/aft/memberforms/resources/js/public.js',
                'packages/aft/memberforms/resources/sass/public.scss',
                'packages/aft/staffbeta/resources/js/app.js',
                'packages/aft/staffbeta/resources/sass/app.scss',
            ],
            refresh: true,
        }),
        vue({
            template: {
                transformAssetUrls: {
                    base: null,
                    includeAbsolute: false,
                },
            },
        }),
        vuetify({
            styles: {
                configFile: 'resources/sass/settings.scss',
            },
        }),
    ],
    resolve: {
        extensions: ['.js', '.vue'],
    },
});
