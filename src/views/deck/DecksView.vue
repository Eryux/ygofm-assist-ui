<script setup>
    import { RouterLink } from 'vue-router'
    import { v4 as uuid } from 'uuid'
    import { userdata, SaveUserdata } from '@/storage.js'
    import { db } from '@/database.js'
</script>

<script>
    export default {
        data() {
            return {
                new_deck_name: '',
                userdata,
                db
            }
        },
        created()
        {
            if ('decks' in this.userdata.data == false || this.userdata.data['decks'].length == 0) {
                this.userdata.data["decks"] = [{
                    'id': uuid(),
                    'name': 'Default',
                    'cards': ['1','2','3','4','5','6','7','8','9','10','1','2','3','4','5','6','7','8','9','10','1','2','3','4','5','6','7','8','9','10','1','2','3','4','5','6','7','8','9','10',]
                }];
                SaveUserdata('userdata');
            }
        },
        methods: {
            addDeck() {
                if (this.new_deck_name.length == 0) return;

                if (this.userdata.data['decks'].length > 24) {
                    alert("Decks limit reached (25)");
                    return;
                }

                let deck = {
                    'name': this.new_deck_name,
                    'cards': [],
                    'id': uuid()
                }

                this.new_deck_name = "";
                this.userdata.data['decks'].push(deck);

                SaveUserdata('userdata');
            },
            getCardName(card_id) {
                let card = db.data["cards"].filter(x => x.id == card_id)[0];
                return card["name"];
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

    <div class="d-flex flex-column flex-md-row mb-2">
        <div class="m-2">
            <input type="text" class="form-control form-control" name="deck_name" v-model="new_deck_name" placeholder="Name" />
        </div>
        <div class="m-2">
            <button class="btn btn-primary" :onclick="addDeck"><i class="fas fa-plus"></i> New deck</button>
        </div>
    </div>

    <div class="row">
        <div class="col-12 col-12" v-for="deck in userdata.data.decks">
            <div class="card bg-dark m-2">
                <div class="card-body">
                    <table class="table table-dark table-bordered mb-0">
                        <tbody>
                            <tr>
                                <td>
                                    <h5 class="card-title fw-bold"><RouterLink :to="{ name: 'deckDetails', params: { id: deck.id }}" class="text-decoration-none" aria-current="page">{{ deck.name }} ({{ deck.cards.length }}/40)</RouterLink></h5>
                                </td>
                            </tr>
                            <tr>
                                <td v-if="deck.cards.length == 0" class="text-muted text-center">There is no card in this deck.<br /> Click on <b>"Show and manage deck"</b> to add card(s).</td>
                                <td v-else><span class="badge bg-secondary m-1" v-for="card in deck.cards">{{ getCardName(card) }}</span></td>
                            </tr>
                            <tr>
                                <td class="text-end">
                                    <RouterLink :to="{ name: 'deckDetails', params: { id: deck.id }}" class="text-decoration-none" aria-current="page">
                                        Show and manage deck
                                    </RouterLink>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>
