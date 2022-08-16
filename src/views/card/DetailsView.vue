<script setup>
    import { RouterLink } from 'vue-router'
    import FusionComponent from '@/components/FusionComponent.vue';
    import EquipComponent from '@/components/EquipComponent.vue';
    import { db } from '@/database.js'
</script>

<script>
    export default {
        data() {
            return {
                card: null,
                display: {'summon': false, 'fusion': true, 'equip': false},
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
        methods: {
            toggleDisplay(display) {
                this.display[display] = !this.display[display];
            }
        },
        computed: {
            cardPictureUrl() {
                return new URL('../../assets/cards/' + this.card["id"] + '.png', import.meta.url).href;
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
                <RouterLink to="/cards" class="text-white text-decoration-none" aria-current="page">
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

        <template v-if="card.type == '23'">
            <div class="row mt-2">
                <div class="col-12">
                    <div class="card bg-dark">
                        <div class="card-header">
                            <div class="row">
                                <div class="col-10">
                                    <h4>Card(s) that can equip {{ card.name }}</h4>
                                </div>
                                <div class="col-2 text-end">
                                    <button class="btn btn-dark" @click="toggleDisplay('equip')">
                                        <span v-if="display.equip">
                                            <i class="fa fa-minus"></i>
                                        </span>
                                        <span v-else>
                                            <i class="fa fa-plus"></i>
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div :class="'collapse card-body' + ((display.equip) ? ' show' : '')">
                            <EquipComponent :cards="card.id" />
                        </div>
                    </div>
                </div>
            </div>
        </template>

        <hr />

        <div class="row mt-2">
            <div class="col-12">
                <div class="card bg-dark">
                    <div class="card-header">
                        <div class="row">
                            <div class="col-10">
                                <h4>Fusion(s) to summon {{ card.name }}</h4>
                            </div>
                            <div class="col-2 text-end">
                                <button class="btn btn-dark" @click="toggleDisplay('summon')">
                                    <span v-if="display.summon">
                                        <i class="fa fa-minus"></i>
                                    </span>
                                    <span v-else>
                                        <i class="fa fa-plus"></i>
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div :class="'collapse card-body' + ((display.summon) ? ' show' : '')">
                        <FusionComponent :results="card.id" :display="{'step': false, 'result': false, 'result_stats': false, 'filter': false}" />
                    </div>
                </div>
            </div>
        </div>

        <div class="row mt-4">
            <div class="col-12">
                <div class="card bg-dark">
                    <div class="card-header">
                        <div class="row">
                            <div class="col-10">
                                <h4>Fusion(s) using {{ card.name }}</h4>
                            </div>
                            <div class="col-2 text-end">
                                <button class="btn btn-dark" @click="toggleDisplay('fusion')">
                                    <span v-if="display.fusion">
                                        <i class="fa fa-minus"></i>
                                    </span>
                                    <span v-else>
                                        <i class="fa fa-plus"></i>
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div :class="'collapse card-body' + ((display.fusion) ? ' show' : '')">
                        <FusionComponent :cards="card.id" :display="{'step': false}" />
                    </div>
                </div>
            </div>
        </div>
    </template>
</template>