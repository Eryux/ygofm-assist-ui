<script setup>
    import { RouterLink } from 'vue-router'
    import { db } from '../database.js'
</script>

<script>
    export default {
        props: {
            cards: String,
            results: String,
            display: Object
        },
        data() {
            return {
                filter_cards: [],
                filter_results: [],
                fusions: [],
                columns: {'step': true, 'result': true, 'result_stats': true},
                db
            }
        },
        created()
        {
            if (this.cards != null && this.cards.length > 0)
                this.filter_cards = this.cards.split(',');

            if (this.results != null && this.results.length > 0)
                this.filter_results = this.results.split(',');

            if (this.display != null) {
                this.columns['step'] = ('step' in this.display) ? this.display.step : true;
                this.columns['result'] = ('result' in this.display) ? this.display.result : true;
                this.columns['result_stats'] = ('result_stats' in this.display) ? this.display.result_stats : true;
            }

            this.calculateFusion();
        },
        watch: {
            async cards(newValue, oldValue) {
                if (newValue.length > 0)
                    this.filter_cards = newValue.split(',');
                this.calculateFusion();
            },
            async results(newValue, oldValue) {
                if (newValue.length > 0)
                    this.filter_results = newValue.split(',');
                this.calculateFusion();
            }
        },
        methods: {
            calculateFusion() {
                this.fusions = [];

                let card_pool = (this.filter_cards.length > 0) ? 
                    this.db.data["cards"].filter(x => this.filter_cards.includes(x["id"]) ) : this.db.data["cards"];

                for (let i = 0; i < card_pool.length; ++i)
                {
                    let card_base = this.retrieveCard(card_pool[i]["id"]);

                    if (this.filter_results.length == 0)
                    {
                        for (let j = 0; j < card_base["fusions"].length; ++j)
                        {
                            this.fusions.push([card_base, this.retrieveCard(card_base["fusions"][j][0]), this.retrieveCard(card_base["fusions"][j][1])])
                        }
                    }
                    else
                    {
                        for (let j = 0; j < card_base["fusions"].length; ++j)
                        {
                            if (this.filter_results.includes(card_base["fusions"][j][1]))
                            {
                                this.fusions.push([card_base, this.retrieveCard(card_base["fusions"][j][0]), this.retrieveCard(card_base["fusions"][j][1])])
                            }
                        }
                    }
                }
            },
            retrieveCard(card_id) {
                for (let i = 0; i < this.db.data["cards"].length; ++i)
                {
                    if (this.db.data["cards"][i]["id"] == card_id)
                    {
                        return this.db.data["cards"][i];
                    }
                }

                return null;
            }
        }
    }
</script>

<template>
    <div class="row">
        <div class="col-12">
            <p class="text-center lead" v-if="fusions.length == 0">No fusion available</p>
            <div class="card bg-dark mt-2" v-else>
                <div class="card-body">
                    <table class="table table-hover table-dark table-bordered mb-0">
                        <thead>
                            <tr>
                                <td v-if="columns.step">Step</td>
                                <td>Fusion</td>
                                <td v-if="columns.result">Result</td>
                                <td v-if="columns.result_stats">Atk.</td>
                                <td v-if="columns.result_stats">Def.</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="fusion in fusions">
                                <td v-if="columns.step">1</td>
                                <td><RouterLink :to="{ name: 'cardDetails', params: { id: fusion[0].id }}">{{ fusion[0].name }}</RouterLink> + <RouterLink :to="{ name: 'cardDetails', params: { id: fusion[1].id }}">{{ fusion[1].name }}</RouterLink></td>
                                <td v-if="columns.result"><RouterLink :to="{ name: 'cardDetails', params: { id: fusion[2].id }}">{{ fusion[2].name }}</RouterLink></td>
                                <td v-if="columns.result_stats">{{ fusion[2].attack }}</td>
                                <td v-if="columns.result_stats">{{ fusion[2].defense }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>