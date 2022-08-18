<script setup>
    import { RouterLink } from 'vue-router'
    import CardItemComponent from '@/components/CardItemComponent.vue'
    import { userdata, SaveUserdata } from '@/storage.js'
    import { db } from '@/database.js'
    import { Modal } from 'bootstrap';
</script>

<script>
    export default {
        data() {
            return {
                userdata,
                deck: {'name': "", 'cards': [], 'id': ''},
                new_card_number: "",
                db
            }
        },
        created()
        {
            if ('decks' in this.userdata.data == false) {
                this.userdata.data["decks"] = [];
            }

            this.$watch(
                () => this.$route.params,
                () => {
                    let search = this.userdata.data["decks"].filter(x => x["id"] == this.$route.params.id);
                    if (search.length > 0)
                        this.deck = search[0];
                    window.scrollTo(0, 0);
                },
                { immediate: true }
            );
        },
        methods: {
            addCard(event) {
                event.preventDefault();
                
                if (this.new_card_number.length == 0) return;

                if (this.deck["cards"].length == 40)
                {
                    alert("Card limit reached (40).");
                    return;
                }

                let card = this.db.data["cards"].filter(x => x["id"] == this.new_card_number)[0];

                if (card === undefined)
                {
                    alert("Card not found.\nPlease enter a valid card number.");
                    this.new_card_number = "";
                    return;
                }

                this.deck["cards"].push(card.id);
                this.new_card_number = "";

                SaveUserdata('userdata');
            },
            deleteCurrentDeck() {
                if (confirm("This will delete the entire deck.\nPlease note, this action can not be undo."))
                {
                    let index = this.userdata.data["decks"].indexOf(this.deck);

                    if (index > -1)
                    {
                        this.userdata.data["decks"].splice(index, 1);

                        SaveUserdata('userdata');

                        this.$router.push('/decks')
                    }
                }
            },
            deleteCard(card_index) {
                this.deck["cards"].splice(card_index, 1);
                SaveUserdata('userdata');
            }
        }
    }
</script>

<template>
    <h1 class="text-light">
        <ol class="breadcrumb">
            <li class="breadcrumb-item">
                <RouterLink to="/decks" class="text-white text-decoration-none" aria-current="page">
                    Decks
                </RouterLink>
            </li>
            <li class="breadcrumb-item active" v-if="deck != null">{{ deck.name }} ({{ deck.cards.length }}/40)</li>
        </ol>
    </h1>

    <hr />

    <p class="lead text-center" v-if="deck == null || deck.name == ''">Deck not found</p>
    <template v-else>
        <div class="row">
            <div class=" col-12 mb-2">
                <div class="card bg-dark">
                    <div class="card-body">
                        <table class="table table-dark table-bordered mb-0">
                            <tbody>
                                <tr><td><strong>Name</strong></td><td>{{ deck.name }}</td></tr>
                                <tr><td><strong>Id</strong></td><td>{{ deck.id }}</td></tr>
                                <tr><td><strong>Card number</strong></td><td>{{ deck.cards.length }}/40</td></tr>
                                <tr><td colspan="2" class="text-center">
                                    <RouterLink :to="{ name: 'deckFusions', params: { id: deck.id }}" class="text-decoration-none" aria-current="page">
                                        Show deck fusion(s)
                                    </RouterLink>
                                </td></tr>
                            </tbody>
                        </table>

                         <div class="mt-3 text-end">
                            <button class="btn btn-danger btn-sm" @click="deleteCurrentDeck"><i class="fas fa-trash"></i> Delete deck</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <hr />

        <form action="#" method="POST" @submit="addCard($event)">
            <div class="d-flex flex-column flex-md-row m-2">
                <div class="me-4 mb-2">
                    <input type="text" class="form-control form-control-lg" name="card_number" v-model="new_card_number" placeholder="Card number" />
                </div>
                <div>
                    <button class="btn btn-primary btn-lg" type="submit"><i class="fas fa-plus"></i> Add card to deck</button>
                </div>
            </div>
        </form>

        <p v-if="deck.cards.length == 0" class="lead text-center">No card in deck</p>
        <template v-else>
            
            <div class="row" v-for="(card, index) in deck.cards" :key="card">
                <div class="col-12 text-end">
                    <button class="btn btn-danger btn-sm rounded-0 rounded-top mx-2" v-on:click="deleteCard(index)" style=""><i class="fas fa-times"></i> Remove from deck</button>
                </div>
                <CardItemComponent :cardid="card" />
            </div>
        </template>
    </template>
</template>
