import './assets/styles/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueTippy from 'vue-tippy'

import 'tippy.js/dist/tippy.css'
import "tippy.js/animations/scale.css";
import 'tippy.js/themes/light.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(
    VueTippy,
    {
      directive: 'tippy', // => v-tippy
      component: 'tippy', // => <tippy/>
      componentSingleton: 'tippy-singleton', // => <tippy-singleton/>,
      defaultProps: {
        placement: 'bottom',
        allowHTML: true,
      }, // => Global default options * see all props
    }
  )

app.use(createPinia())
app.use(router)

app.mount('#app')
