<script setup>
    import { RouterLink } from 'vue-router'
    import { db } from '../database.js'
</script>

<script>
    export default {
        props: {
            cards: String,
            results: String
        },
        data() {
            return {
                filter_cards: [],
                filter_results: [],
                equips: [],
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

            this.runEquipCalc();
        },
        watch: {
            cards(newValue, oldValue) {
                if (newValue.length > 0)
                    this.filter_cards = newValue.split(',');
                this.runEquipCalc();
            },
            results(newValue, oldValue) {
                if (newValue.length > 0)
                    this.filter_results = newValue.split(',');
                this.runEquipCalc();
            }
        },
        methods: {
            runEquipCalc() {
                let self = this;
                self.loading = true;
                setTimeout(function() {
                    self.calculateEquip();
                    self.loading = false;
                }, 100);
            },
            calculateEquip() {
                this.equips = [];

                let card_pool = (this.filter_cards.length > 0) ? 
                    this.db.data["cards"].filter(x => this.filter_cards.includes(x["id"]) ) : this.db.data["cards"];

                for (let i = 0; i < card_pool.length; ++i)
                {
                    let card_base = this.retrieveCard(card_pool[i]["id"]);

                    if (this.filter_results.length == 0)
                    {
                        for (let j = 0; j < card_base["equips"].length; ++j)
                        {
                            this.equips.push(this.retrieveCard(card_base["equips"][j]))
                        }
                    }
                    else
                    {
                        for (let j = 0; j < card_base["equips"].length; ++j)
                        {
                            if (this.filter_results.includes(card_base["equips"][j]))
                            {
                                this.equips.push(this.retrieveCard(card_base["equips"][j]))
                            }
                        }
                    }
                }

                console.log(this.equips);
            },
            retrieveCard(card_id) {
                for (let i = 0; i < this.db.data["cards"].length; ++i)
                {
                    if (this.db.data["cards"][i]["id"] == card_id)
                    {
                        return this.db.data["cards"][i];
                    }
                } return null;
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
        <div class="row mt-2" v-if="equips.length == 0">
            <div class="col-12">
                <p class="text-center lead">No card to equip</p>
            </div>
        </div>
        <template v-else>
            <div class="row mt-2">
                <div class="col-12">
                    <table class="table table-hover table-dark table-bordered mb-0">
                        <thead>
                            <tr>
                                <td>Card</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="card in equips">
                                <td><RouterLink :to="{ name: 'cardDetails', params: { id: card.id }}">{{ card.name }}</RouterLink></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </template>
    </template>
</template>