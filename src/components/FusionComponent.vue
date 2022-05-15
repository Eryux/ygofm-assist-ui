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
                filter: '',
                columns: {'step': true, 'result': true, 'result_stats': true, 'filter': true},
                sort: 'id',
                sort_order: 'asc',
                fusions: [],
                filtered_fusions: [],
                loading: false,
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
                this.columns['filter'] = ('filter' in this.display) ? this.display.filter : true;
            }

            this.runFusionCalc();
        },
        watch: {
            cards(newValue, oldValue) {
                if (newValue.length > 0)
                    this.filter_cards = newValue.split(',');
                this.runFusionCalc();
            },
            results(newValue, oldValue) {
                if (newValue.length > 0)
                    this.filter_results = newValue.split(',');
                this.runFusionCalc();
            }
        },
        methods: {
            runFusionCalc() {
                let self = this;
                self.loading = true;
                setTimeout(function() {
                    self.calculateFusion();
                    self.loading = false;
                }, 100);
            },
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

                this.refreshFilter(null);
                this.refreshSort(null);
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
            },
            refreshFilter(event) {
                let filter = this.filter.toLowerCase();

                if (this.filter.length > 0)
                    this.filtered_fusions = this.fusions.filter(x => x[2]["id"] == filter || x[2]["name"].toLowerCase().indexOf(filter) >= 0);
                else
                    this.filtered_fusions = this.fusions;
            },
            refreshSort(event) {
                if (this.sort_order == "desc")
                {
                    if (this.sort == "name") {
                        this.filtered_fusions = this.filtered_fusions.sort((a, b) => b[2]["name"].localeCompare(a[2]["name"]));
                    } else if (this.sort == "type") {
                        this.filtered_fusions = this.filtered_fusions.sort((a, b) => b[2]["type"].localeCompare(a[2]["type"]));
                    } else if (this.sort == "attack") {
                        this.filtered_fusions = this.filtered_fusions.sort((a, b) => b[2]["attack"] - a[2]["attack"]);
                    } else if (this.sort == "defense") {
                        this.filtered_fusions = this.filtered_fusions.sort((a, b) => b[2]["defense"] - a[2]["defense"]);
                    } else if (this.sort == "level") {
                        this.filtered_fusions = this.filtered_fusions.sort((a, b) => b[2]["level"] - a[2]["level"]);
                    } else {
                        this.filtered_fusions = this.filtered_fusions.sort((a, b) => parseInt(b[2]["id"]) - parseInt(a[2]["id"])); // by id
                    }
                }
                else // asc
                {
                    if (this.sort == "name") {
                        this.filtered_fusions = this.filtered_fusions.sort((a, b) => a[2]["name"].localeCompare(b[2]["name"]));
                    } else if (this.sort == "type") {
                        this.filtered_fusions = this.filtered_fusions.sort((a, b) => a[2]["type"].localeCompare(b[2]["type"]));
                    } else if (this.sort == "attack") {
                        this.filtered_fusions = this.filtered_fusions.sort((a, b) => a[2]["attack"] - b[2]["attack"]);
                    } else if (this.sort == "defense") {
                        this.filtered_fusions = this.filtered_fusions.sort((a, b) => a[2]["defense"] - b[2]["defense"]);
                    } else if (this.sort == "level") {
                        this.filtered_fusions = this.filtered_fusions.sort((a, b) => a[2]["level"] - b[2]["level"]);
                    } else {
                        this.filtered_fusions = this.filtered_fusions.sort((a, b) => parseInt(a[2]["id"]) - parseInt(b[2]["id"])); // by id
                    }
                }
            }
        }
    }
</script>

<template>
    <div class="text-center" v-if="loading">
        <div class="spinner-border text-primary" role="status">
            <span class="sr-only">Loading...</span>
        </div>
    </div>
    <template v-else>
        <div class="row mt-2" v-if="fusions.length == 0">
            <div class="col-12">
                <p class="text-center lead">No fusion available</p>
            </div>
        </div>
        <template v-else>
            <div class="row mt-2" v-if="columns.filter">
                <div class="col-md-7 col-12 mb-2">
                    <div class="input-group">
                        <span class="input-group-text"><i class="fa fa-search"></i></span>
                        <input v-model="filter" @change="refreshFilter" @keyup="refreshFilter" type="text" class="form-control form-control-lg" name="card_search" placeholder="Enter card name or card number" />
                    </div>
                </div>
                <div class="col-md-3 col-8">
                    <div class="input-group">
                        <span class="input-group-text"><i class="fa fa-sort"></i></span>
                        <select class="form-select form-select-lg" v-model="sort" @change="refreshSort">
                            <option value="id">Number</option>
                            <option value="name">Name</option>
                            <option value="type">Type</option>
                            <option value="attack">Attack</option>
                            <option value="defense">Defense</option>
                            <option value="level">Level</option>
                        </select>
                    </div>
                </div>
                <div class="col-md-2 col-4">
                    <div class="input-group">
                        <select class="form-select form-select-lg" v-model="sort_order" @change="refreshSort">
                            <option value="asc">Asc.</option>
                            <option value="desc">Desc.</option>
                        </select>
                    </div>
                </div>
            </div>

            <div class="row mt-2">
                <div class="col-12">
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
                            <tr v-for="fusion in filtered_fusions">
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
        </template>
    </template>
</template>