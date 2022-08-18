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
            <div class="card-body">
                <table class="table table-dark table-bordered mb-0">
                    <tbody>
                        <tr>
                            <td rowspan="7" style="width: 180px" class="align-middle text-center">
                                <RouterLink :to="{ name: 'cardDetails', params: { id: card.id }}" aria-current="page">
                                    <img class="my-2" :src="cardPictureUrl" :alt="card.name" />
                                </RouterLink>
                            </td>
                        </tr>
                        <tr><td colspan="4"><h4>#{{ card.id }}. {{ card.name }}</h4></td></tr>
                        <tr><td><b>Type</b></td><td colspan="3">{{ cardType }}</td></tr>
                        <tr><td><b>Guardian stars</b></td><td colspan="3">{{ cardGuardian1.symbol }} {{ cardGuardian1.name }} / {{ cardGuardian2.symbol }} {{ cardGuardian2.name }}</td></tr>
                        <tr><td><b>Attack</b></td><td>{{ card.attack }}</td><td><b>Defense</b></td><td>{{ card.defense }}</td></tr>
                        <tr><td><b>Description</b></td><td colspan="3">{{ card.description }}</td></tr>
                        <tr>
                            <td class="text-end" colspan="4">
                                <RouterLink :to="{ name: 'cardDetails', params: { id: card.id }}" class="text-decoration-none" aria-current="page">
                                    Show fusions ({{ cardFusionNumber }}) and details
                                </RouterLink>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>