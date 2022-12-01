import pkg from './package'

require('dotenv').config()

export default {
  mode: 'spa',

  /*
   ** Headers of the page
   */
  head: {
    title: 'Cost Application',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },

  /*
   ** Global CSS
   */
  css: ['@/assets/scss/style.scss'],

  /*
   ** Plugins to load before mounting the App
   */
  router: {
    linkActiveClass: 'active',
    middleware: ['clearValidationErrors']
  },

  plugins: [
    '@plugins/validator',
    '@plugins/axios',
    '@plugins/vue-api-query',
    '@plugins/i18n',
    '@plugins/chart',
    '@plugins/image',
  ],

  auth: {
    plugins: ['@plugins/auth'],
    strategies: {
      local: {
        endpoints: {
          login: {
            url: '/cost/login',
            method: 'post',
            propertyName: 'data.access_token'
          },
          user: {
            url: '/cost/me',
            method:'post',
            propertyName: false
          },
          logout: {
            url: '/cost/logout',
            method:'post'
          },
          tokenRequired: true,
          tokenType: 'Bearer'
        }
      },
      redirect: {
        login: '/login',
        home: '/cost'
      }
    },
    refreshJWT: {
      endpoint: {
        url: '/cost/refresh',
        method: 'post'
      },
      interval: 10 // minutes
    }
  },

  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/auth',
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    ['@nuxtjs/dotenv',{systemvars: true,  filename: process.env.NODE_ENV=='production' ? '.env.production' : '.env' }],
    'nuxt-material-design-icons',
    'nuxt-buefy'
  ],
  /*
   ** Axios module configuration
   */
  axios: {
    baseURL: process.env.API_URL || 'https://dating-api.muzio.dev/api',
    // See https://github.com/nuxt-community/axios-module#options
  },

  env: {
    pusherAppId: process.env.PUSHER_APP_ID,
    pusherAppKey: process.env.PUSHER_APP_KEY,
    pusherAppSecret: process.env.PUSHER_APP_SECRET,
    pusherAppHost: process.env.PUSHER_APP_HOST,
    pusherAppPort: process.env.PUSHER_APP_PORT,
    wsAuthEndpoint: process.env.WS_AUTH_ENDPOINT,
    appUrl: process.env.APP_URL
  },

  /*
   ** Build configuration
   */
  build: {
    postcss: {
      preset: {
        features: {
          customProperties: false
        }
      }
    },
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
          options: {
            fix: true
          }
        })
      }
    }
  },
  vue: {
    config: {
      productionTip: false
    }
  }
}
