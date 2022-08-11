<script setup>
    import { RouterLink } from 'vue-router'
    import FusionComponent from '@/components/FusionComponent.vue'
    import { userdata } from '@/storage.js'
    import { db } from '@/database.js'
</script>

<script>
    export default {
        data() {
            return {
                userdata,
                deck: {'name': "", 'cards': [], 'id': ''},
                cards: "",
                db
            }
        },
        created()
        {
            if ('decks' in this.userdata.data == false) {
                this.userdata.data["decks"] = [];
            }

            this.$watch(
                () => this.$route.params,
                () => {
                    let search = this.userdata.data["decks"].filter(x => x["id"] == this.$route.params.id);
                    if (search.length > 0)
                        this.deck = search[0];
                    this.cards = this.deck["cards"].join(',');
                    window.scrollTo(0, 0);
                },
                { immediate: true }
            );
        },
        methods: {
            
        }
    }
</script>

<template>
    <h1 class="text-light">
        <ol class="breadcrumb">
            <li class="breadcrumb-item">
                <RouterLink to="/decks" class="text-white text-decoration-none" aria-current="page">
                    Decks
                </RouterLink>
            </li>
            <li class="breadcrumb-item">
                <RouterLink :to="{ name: 'deckDetails', params: { id: deck.id }}" class="text-white text-decoration-none" aria-current="page">
                    {{ deck.name }} ({{ deck.cards.length }}/40)
                </RouterLink>
            </li>
            <li class="breadcrumb-item active" v-if="deck != null">Fusions</li>
        </ol>
    </h1>

    <hr />

    <p class="lead text-center" v-if="deck == null || deck.name == ''">Deck not found</p>
    <template v-else>
        <div class="row mt-4">
            <div class="col-12">
                <div class="card bg-dark">
                    <div class="card-header">
                        <h4>Fusion(s)</h4>
                    </div>
                    <div class="card-body">
                        <FusionComponent :cards="cards" :any="false" :display="{'step': false}" />
                    </div>
                </div>
            </div>
        </div>
    </template>
</template>
