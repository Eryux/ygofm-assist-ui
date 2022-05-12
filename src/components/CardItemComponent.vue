<script setup>
    import { RouterLink } from 'vue-router'
    import { db } from '../database.js'
</script>

<script>
    export default {
        props: {
            cardid: String,
        },
        data() {
            return {
                card: null,
                db
            }
        },
        computed: {
            cardType() {
                return this.db.data["types"][this.card["type"]];
            },
            cardGuardian1() {
                return this.db.data["guardians"][this.card["guardian_1"]];
            },
            cardGuardian2() {
                return this.db.data["guardians"][this.card["guardian_2"]];
            },
            cardFusionNumber() {
                return (this.card["fusions"] != null) ? this.card["fusions"].length : 0;
            },
            cardPictureUrl() {
                return new URL('../assets/cards/' + this.card["id"] + '.png', import.meta.url).href;
            }
        },
        created: function()
        {
            this.card = this.db.data["cards"].filter(x => x.id == this.cardid)[0];
        }
    }
</script>

<template>
    <div class="col-12 mb-3">
        <div class="card bg-dark">
            <div class="d-flex flex-row">
                <div class="mr-2 card-picture">
                    <RouterLink :to="{ name: 'cardDetails', params: { id: card.id }}" aria-current="page">
                        <img :src="'./src/assets/cards/' + card.id + '.png'" :alt="card.name" />
                    </RouterLink>
                </div>

                <div class="card-body flex-fill">
                    <div class="row">
                        <div class="col-8"><h5 class="card-title">#{{ card.id }}. {{ card.name }}</h5></div>
                        <div class="col-4 text-end">ATK: {{ card.attack }} <br /> DEF: {{ card.defense }}</div>
                    </div>

                    <p class="card-text">Type: {{ cardType }}</p>
                    <p class="card-text">Guadian Star: {{ cardGuardian1 }} / {{ cardGuardian2 }}</p>
                    <p class="card-text">{{ card.description }}</p>

                    <p class="card-text mt-4 text-end">
                        <RouterLink :to="{ name: 'cardDetails', params: { id: card.id }}" class="text-decoration-none" aria-current="page">
                            Show fusions ({{ cardFusionNumber }}) and details
                        </RouterLink>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>