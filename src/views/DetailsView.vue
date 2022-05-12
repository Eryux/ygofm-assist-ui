<script setup>
    import { RouterLink } from 'vue-router'
    import FusionComponent from '@/components/FusionComponent.vue';
    import { db } from '@/database.js'
</script>

<script>
    export default {
        data() {
            return {
                card: null,
                db
            }
        },
        created()
        {
            this.$watch(
                () => this.$route.params,
                () => {
                    let search = this.db.data["cards"].filter(x => x.id == this.$route.params.id);
                    if (search.length > 0)
                        this.card = search[0];
                    window.scrollTo(0, 0);
                },
                { immediate: true }
            );
        },
        computed: {
            cardPictureUrl() {
                return new URL('../assets/cards/' + this.card["id"] + '.png', import.meta.url).href;
            },
            cardType() {
                return this.db.data["types"][this.card["type"]];
            },
            cardGuardian1() {
                return this.db.data["guardians"][this.card["guardian_1"]];
            },
            cardGuardian2() {
                return this.db.data["guardians"][this.card["guardian_2"]];
            }
        }
    }
</script>

<template>
    <h1 class="text-light">
        <ol class="breadcrumb">
            <li class="breadcrumb-item">
                <RouterLink to="/" class="text-white text-decoration-none" aria-current="page">
                    Cards
                </RouterLink>
            </li>
            <li class="breadcrumb-item active" v-if="card != null">#{{ card.id }}. {{ card.name }}</li>
        </ol>
    </h1>

    <hr />
    
    <p class="lead text-center" v-if="card == null">Card not found</p>
    <template v-else>
        <div class="row">
            <div class="col-12 mb-2">
                <div class="card bg-dark">
                    <div class="card-body">
                        <table class="table table-dark table-bordered mb-0">
                            <tbody>
                                <tr><td colspan="3" rowspan="11" class="align-middle text-center"><img :src="cardPictureUrl" :alt="card.name" /></td></tr>
                                <tr><td><strong>Number</strong></td><td>{{ card["id"] }}</td></tr>
                                <tr><td><strong>Name</strong></td><td>{{ card["name"] }}</td></tr>
                                <tr><td><strong>Type</strong></td><td>{{ cardType }}</td></tr>
                                <tr><td><strong>Level</strong></td><td>{{ card["level"] }}</td></tr>
                                <tr><td><strong>Guardian stars</strong></td><td>{{ cardGuardian1 }} / {{ cardGuardian2 }}</td></tr>
                                <tr><td><strong>Description</strong></td><td>{{ card["description"] }}</td></tr>
                                <tr><td><strong>Attack</strong></td><td>{{ card["attack"] }}</td></tr>
                                <tr><td><strong>Defense</strong></td><td>{{ card["defense"] }}</td></tr>
                                <tr><td><strong>Code</strong></td><td>{{ card["code"] }}</td></tr>
                                <tr><td><strong>Cost</strong></td><td>{{ card["cost"] }}</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        <h3 class="mt-4">Fusion to invoke this monster</h3>
        <FusionComponent :results="card.id" :display="{'step': false, 'result': false, 'result_stats': false}" />

        <h3 class="mt-4">Fusion available with this monster</h3>
        <FusionComponent :cards="card.id" :display="{'step': false}" />
    </template>
    
</template>