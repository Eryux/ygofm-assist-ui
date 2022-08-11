import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },

    {
      path: '/cards',
      name: 'cards',
      component: () => import('../views/card/CardsView.vue')
    },

    {
      path: '/cards/:id',
      name: 'cardDetails',
      component: () => import('../views/card/DetailsView.vue')
    },

    {
      path: '/decks',
      name: 'decks',
      component: () => import('../views/deck/DecksView.vue')
    },

    {
      path: '/decks/:id',
      name: 'deckDetails',
      component: () => import('../views/deck/DetailsView.vue')
    },

    {
      path: '/decks/:id/fusions',
      name: 'deckFusions',
      component: () => import('../views/deck/FusionsView.vue')
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
