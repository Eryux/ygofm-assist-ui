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
        computed: {
            cardFusionCounts() {
                if (!this.deck?.cards?.length || !this.db?.data?.cards) return [];
                const deckSet = new Set(this.deck.cards);
                const cardsById = {};
                this.db.data.cards.forEach(c => { cardsById[c.id] = c; });
                const countByCard = {};
                for (const cardId of this.deck.cards) {
                    if (countByCard[cardId] !== undefined) continue;
                    const card = cardsById[cardId];
                    if (!card) continue;
                    let count = 0;
                    if (card.fusions) {
                        for (const f of card.fusions) {
                            const otherId = f[0], resultId = f[1];
                            if (resultId === cardId || resultId === otherId) continue;
                            if (deckSet.has(otherId)) count++;
                        }
                    }
                    countByCard[cardId] = { card, count };
                }
                return Object.values(countByCard).sort((a, b) => b.count - a.count);
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
        <div class="row mt-2">
            <div class="col-12">
                <div class="card bg-dark">
                    <div class="card-header">
                        <h4>Fusion Potential by Card</h4>
                    </div>
                    <div class="card-body">
                        <p class="text-muted mb-2">Number of possible fusions each card can make with other cards in this deck (greatest to least)</p>
                        <table class="table table-dark table-bordered table-hover mb-0">
                            <thead>
                                <tr>
                                    <th class="text-center" style="width: 4em">#</th>
                                    <th>Card</th>
                                    <th class="text-center" style="width: 6em">Fusions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, idx) in cardFusionCounts" :key="item.card.id">
                                    <td class="text-center">{{ item.card.id }}</td>
                                    <td><RouterLink :to="{ name: 'cardDetails', params: { id: item.card.id }}" class="text-decoration-none">{{ item.card.name }}</RouterLink></td>
                                    <td class="text-center">{{ item.count }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        <div class="row mt-4">
            <div class="col-12">
                <div class="card bg-dark">
                    <div class="card-header">
                        <h4>Possible Deck Fusions</h4>
                    </div>
                    <div class="card-body">
                        <FusionComponent :cards="cards" :deck="cards" :depth="2" :display="{'step': true}" />
                    </div>
                </div>
            </div>
        </div>
    </template>
</template>
