import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

loadFonts()

createApp(App)
  .use(router)
  .use(vuetify)
  .use(createPinia().use(piniaPluginPersistedstate))
  .mount('#app')
