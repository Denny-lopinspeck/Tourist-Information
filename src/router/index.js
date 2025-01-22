import { createRouter, createWebHistory } from 'vue-router'
import ComponentsVersion from '../views/ComponentsVersion.vue'
import OptionsVersion from '../views/OptionsVersion.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'composition',
      component: ComponentsVersion
    },
    {
      path: '/options',
      name: 'options',
      component: OptionsVersion
    }
  ]
})

export default router
