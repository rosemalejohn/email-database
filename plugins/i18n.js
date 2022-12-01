import Vue from 'vue'
import VueI18n from 'vue-i18n'
import $script from 'scriptjs'

Vue.use(VueI18n)

export default async ({ app }) => {
  const hostname = window.location.hostname.split('.')
  const domain = hostname[0]

  app.i18n = new VueI18n({
    locale: 'en',
    fallbackLocale: 'en',
    messages: {}
  })

  await $script.get(
    `${process.env.BACKEND_APP_URL}/js/langs/locales-${domain}.js`,
    () => {
      app.i18n = new VueI18n({
        locale: 'en',
        fallbackLocale: 'en',
        messages: window.vuei18nLocales,
        silentFallbackWarn: true
      })
    }
  )
}
