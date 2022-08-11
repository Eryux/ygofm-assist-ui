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
                delete_confirm_modal: null,
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
            addCard() {
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
            deleteCurrentDeckConfirm() {
                if (this.delete_confirm_modal == null) {
                    this.delete_confirm_modal = new Modal("#deleteConfirmModal", {});
                } this.delete_confirm_modal.show();
            },
            deleteCurrentDeck() {
                if (this.delete_confirm_modal != null) {
                    this.delete_confirm_modal.hide();
                }

                let index = this.userdata.data["decks"].indexOf(this.deck);
                if (index > -1)
                {
                    this.userdata.data["decks"].splice(index, 1);
                    SaveUserdata('userdata');
                    this.$router.push('/decks')
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
        <div class="d-flex flex-column flex-md-row justify-content-end">
            <div class="m-2">
                <RouterLink :to="{ name: 'deckFusions', params: { id: deck.id }}" class="btn btn-primary" aria-current="page">
                    <i class="fas fa-layer-group"></i> Show fusion(s)
                </RouterLink>
            </div>
            <div class="m-2">
                <button class="btn btn-danger" :onclick="deleteCurrentDeckConfirm"><i class="fas fa-trash"></i> Delete deck</button>
            </div>
        </div>

        <div class="d-flex flex-column flex-md-row mb-2">
            <div class="m-2">
                <input type="text" class="form-control form-control" name="card_number" v-model="new_card_number" placeholder="Card number" />
            </div>
            <div class="m-2">
                <button class="btn btn-primary" :onclick="addCard"><i class="fas fa-plus"></i> Add card</button>
            </div>
        </div>

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

    <div class="modal fade  text-dark" id="deleteConfirmModal" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Are you sure?</h5>
                    <button type="button" class="btn close" data-bs-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true"><i class="fas fa-times"></i></span>
                    </button>
                </div>
                <div class="modal-body">
                    <p class="lead text-center">This will delete the entire deck.<br />Please note that this action can not be undo.</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-danger" :onclick="deleteCurrentDeck">Confirm</button>
                </div>
            </div>
        </div>
    </div>
</template>
