<script setup>
    import { RouterLink } from 'vue-router'
    import CardItemComponent from '@/components/CardItemComponent.vue'
    import { db } from '@/database.js'
</script>

<script>
    export default {
        data() {
            return {
                pool: [],
                cards: [],
                limit: 20,
                offset: 0,
                filter: '',
                sort: 'id',
                sort_order: 'asc',
                db
            }
        },
        mounted()
        {
            this.pool = this.db.data["cards"];
            this.init();

            window.addEventListener('scroll', this.loadOnScroll);
        },
        unmounted() {
            window.addEventListener('scroll', this.loadOnScroll);
        },
        methods: {
            init() {
                this.cards = [];
                this.offset = 0;
                this.loadCards(this.limit, this.offset);
                this.offset = this.limit;
            },
            loadCards(limit, offset) {
                for (let i = offset; i < (offset + limit) && i < this.pool.length; ++i) {
                    this.cards.push(this.pool[i]);
                }
            },
            loadOnScroll(event) {
                let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;
                if (bottomOfWindow) {
                    this.loadCards(this.limit, this.offset);
                    this.offset += this.limit;
                }
            },
            refreshFilter(event) {
                let filter = this.filter.toLowerCase();

                if (this.filter.length > 0)
                    this.pool = this.db.data["cards"].filter(x => x["id"] == filter || x["name"].toLowerCase().indexOf(filter) >= 0);
                else
                    this.pool = this.db.data["cards"];

                this.init();
            },
            refreshSort(event) {
                if (this.sort_order == "desc")
                {
                    if (this.sort == "name") {
                        this.pool = this.pool.sort((a, b) => b["name"].localeCompare(a["name"]));
                    } else if (this.sort == "type") {
                        this.pool = this.pool.sort((a, b) => b["type"].localeCompare(a["type"]));
                    } else if (this.sort == "attack") {
                        this.pool = this.pool.sort((a, b) => b["attack"] - a["attack"]);
                    } else if (this.sort == "defense") {
                        this.pool = this.pool.sort((a, b) => b["defense"] - a["defense"]);
                    } else if (this.sort == "level") {
                        this.pool = this.pool.sort((a, b) => b["level"] - a["level"]);
                    } else {
                        this.pool = this.pool.sort((a, b) => parseInt(b["id"]) - parseInt(a["id"])); // by id
                    }
                }
                else // asc
                {
                    if (this.sort == "name") {
                        this.pool = this.pool.sort((a, b) => a["name"].localeCompare(b["name"]));
                    } else if (this.sort == "type") {
                        this.pool = this.pool.sort((a, b) => a["type"].localeCompare(b["type"]));
                    } else if (this.sort == "attack") {
                        this.pool = this.pool.sort((a, b) => a["attack"] - b["attack"]);
                    } else if (this.sort == "defense") {
                        this.pool = this.pool.sort((a, b) => a["defense"] - b["defense"]);
                    } else if (this.sort == "level") {
                        this.pool = this.pool.sort((a, b) => a["level"] - b["level"]);
                    } else {
                        this.pool = this.pool.sort((a, b) => parseInt(a["id"]) - parseInt(b["id"])); // by id
                    }
                }

                this.init();
            }
        }
    }
</script>

<template>
    <h1 class="text-light">
        <ol class="breadcrumb">
            <li class="breadcrumb-item active">Cards</li>
        </ol>
    </h1>

    <hr />

    <div class="row mb-4 mt-2">
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

    <div class="row">
        <template v-for="card in cards" :key="card.id">
            <CardItemComponent :cardid="card.id" />
        </template>
    </div>
</template>