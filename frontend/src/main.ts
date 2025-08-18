import { createApp, h, provide } from 'vue'
import { apolloClient } from '@/shared/services/graphql/apollo'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { createPinia } from 'pinia'
import * as Sentry from "@sentry/vue";
import App from './App.vue'
import router from '@/router/index.ts'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import '@/assets/main.css'
const pinia = createPinia()
const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient)
  },
  render: () => h(App),
})

const toastContainer = document.createElement('div')
toastContainer.setAttribute('data-testid', 'toast-container')
document.body.appendChild(toastContainer)

app.use(Toast, {
  position: 'bottom-left',
  timeout: 5000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: true,
  closeButton: 'button',
  icon: true,
  container: toastContainer,
})
Sentry.init({
  app,
  dsn: "https://e75fe94935dfa10929ce7b39090132ab@o4509730787557376.ingest.de.sentry.io/4509790392025168",
  sendDefaultPii: true
});
app.use(pinia)
app.use(router)

app.mount('#app')
