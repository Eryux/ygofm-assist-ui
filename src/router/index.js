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
      component: () => import('../views/card/CardView.vue'),

      children: [
        {
          path: '',
          name: 'cards',
          component: () => import('../views/card/BrowseView.vue')
        },
        {
          path: ':id',
          name: 'cardDetails',
          component: () => import('../views/card/DetailsView.vue')
        },
      ]
    },

    {
      path: '/decks',
      component: () => import('../views/deck/DeckView.vue'),

      children: [
        {
          path: '',
          name: 'decks',
          component: () => import('../views/deck/BrowseView.vue')
        },
        {
          path: ':id',
          name: 'deckDetails',
          component: () => import('../views/deck/DetailsView.vue')
        },
        {
          path: ':id/fusions',
          name: 'deckFusions',
          component: () => import('../views/deck/FusionsView.vue')
        },
      ]
    },

    {
      path: '/stars',
      name: 'stars',
      component: () => import('../views/GuardianStarsView.vue')
    },
    
    {
      path: '/game',
      name: 'game',
      component: () => import('../views/GameAssistView.vue')
    }

  ],

  linkActiveClass: "active",

  linkExactActiveClass: "active-exact",
});

export default router
