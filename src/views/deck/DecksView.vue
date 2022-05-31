<script setup>
    import { RouterLink } from 'vue-router'
    import { v4 as uuid } from 'uuid'
    import Cookies from 'js-cookie'
    import { userdata, SaveUserdata } from '@/storage.js'
</script>

<script>
    export default {
        data() {
            return {
                new_deck_name: '',
                userdata
            }
        },
        created()
        {
            console.log(this.userdata);
            if ('decks' in this.userdata.data == false) {
                this.userdata.data["decks"] = [];
            }
        },
        methods: {
            addDeck() {
                if (this.new_deck_name.length == 0) return;

                let deck = {
                    'name': this.new_deck_name,
                    'cards': [],
                    'id': uuid()
                }

                this.new_deck_name = "";
                this.userdata.data['decks'].push(deck);

                SaveUserdata('userdata');
            }
        }
    }
</script>

<template>
    <h1 class="text-light">
        <ol class="breadcrumb">
            <li class="breadcrumb-item active">Decks</li>
        </ol>
    </h1>

    <hr />

    <div class="d-flex flex-column flex-md-row justify-content-end">
        <div class="m-2">
            <input type="text" class="form-control form-control" name="deck_name" v-model="new_deck_name" placeholder="Name" />
        </div>
        <div class="m-2">
            <button class="btn btn-primary" :onclick="addDeck"><i class="fas fa-plus"></i> New deck</button>
        </div>
    </div>

    <div class="row">
        <div class="col-12 col-sm-6 col-md-4" v-for="deck in userdata.data.decks">
            <div class="card bg-dark m-2">
                <div class="card-body">
                    <h5 class="card-title fw-bold"><a href="#" class="text-decoration-none">{{ deck.name }} ({{ deck.cards.length }}/40)</a></h5>
                    <p class="text-muted"><small>{{ deck.id }}</small></p>
                    <p class="text-end">
                        <a href="#" class="text-decoration-none">Manage</a>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
