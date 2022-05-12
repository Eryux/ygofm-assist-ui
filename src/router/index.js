import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [

    {
      path: '/',
      name: 'cards',
      component: () => import('../views/CardsView.vue')
    },

    {
      path: '/cards/:id',
      name: 'cardDetails',
      component: () => import('../views/DetailsView.vue')
    },

    {
      path: '/decks',
      name: 'decks',
      component: () => import('../views/DecksView.vue')
    },

    {
      path: '/game',
      name: 'game',
      component: () => import('../views/GameAssistView.vue')
    }

  ],

  linkActiveClass: "active",
})

export default router
