export default {
    head: {
        title: 'twino-homework',
        htmlAttrs: {
            lang: 'en'
        },
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '' }
        ],
        link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
    },

    css: ['normalize.css', '~/assets/sass/styles'],

    plugins: [],

    components: true,

    buildModules: ['@nuxtjs/eslint-module'],

    modules: ['@nuxtjs/axios'],

    publicRuntimeConfig: {
        apiPrefix: process.env.TWINO_API_PREFIX || '/api',
        suitabilityURL: process.env.TWINO_SUITABILITY_URL || '/suitability'
    },

    axios: {
        proxy: true
    },

    proxy: {
        [`${process.env.TWINO_API_PREFIX || '/api'}`]: {
            target: process.env.TWINO_API_URL || 'http://localhost:3001',
            pathRewrite: { [`^${process.env.TWINO_API_PREFIX || '/api'}`]: '/' }
        }
    },

    build: {
        loaders: {
            sass: {
                sassOptions: {
                    includePaths: ['assets/sass/abstracts']
                }
            }
        }
    }
}
