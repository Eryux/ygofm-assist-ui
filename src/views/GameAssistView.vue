<script setup>
    import { RouterLink } from 'vue-router'
    import FusionComponent from '@/components/FusionComponent.vue'
    import GuardianStarComponent from '@/components/GuardianStarComponent.vue';
    import { userdata, SaveUserdata } from '@/storage.js'
    import { db } from '@/database.js'
</script>

<script>
export default {
        data() {
            return {
                card_ids: ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
                card_ids_str: "",
                cards: [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
                selected_deck_id: "",
                userdata,
                db
            }
        },
        computed: {
            cardNameOptions() {
                const cards = this.db?.data?.cards;
                if (!cards || !cards.length) return [];
                return cards.map(c => c.name);
            },
            decks() {
                return this.userdata?.data?.decks ?? [];
            },
            selectedDeck() {
                if (!this.selected_deck_id) return null;
                return this.decks.find(d => d.id === this.selected_deck_id) ?? null;
            },
            handCardOptions() {
                if (this.selectedDeck?.cards?.length) {
                    const deckIds = new Set(this.selectedDeck.cards);
                    return (this.db?.data?.cards ?? [])
                        .filter(c => deckIds.has(c.id))
                        .map(c => c.name);
                }
                return this.cardNameOptions;
            },
            discardSuggestions() {
                return this.computeDiscardSuggestions();
            }
        },
        created()
        {
            if (!this.userdata.data) return;
            if (!('decks' in this.userdata.data)) {
                this.userdata.data["decks"] = [];
            }
            if ('game' in this.userdata.data)
            {
                this.card_ids = this.userdata.data["game"];

                for (let i = 0; i < this.card_ids.length; ++i)
                {
                    for (let j = 0; j < this.db.data["cards"].length; ++j)
                    {
                        if (this.db.data["cards"][j]["id"] == this.card_ids[i])
                        {
                            this.cards[i] = this.db.data["cards"][j];
                            break;
                        }
                    }
                }

                this.card_ids_str = this.card_ids.filter(x => x.length > 0).join(",");
            }
            if ('game_deck' in this.userdata.data) {
                this.selected_deck_id = this.userdata.data["game_deck"] || "";
            }
            this.saveGameData();
        },
        methods: {
            /**
             * Resolve a card from user input - accepts card ID or name (exact or partial match).
             * @param {string} input - Card ID, full name, or partial name
             * @returns {object|null} The matching card object, or null if not found
             */
            resolveCard(input, slot) {
                if (!input || typeof input !== 'string') return null;
                const trimmed = input.trim();
                if (!trimmed) return null;

                const cards = this.db?.data?.cards;
                if (!cards || !cards.length) return null;

                // 1. Try exact ID match (handles string or numeric ID)
                let card = cards.find(c => c.id == trimmed);
                if (card) {
                    if (this.isHandSlot(slot) && this.selectedDeck?.cards && !this.selectedDeck.cards.includes(card.id))
                        return null;
                    return card;
                }

                // 2. Try exact name match (case-insensitive)
                const lower = trimmed.toLowerCase();
                card = cards.find(c => c.name?.toLowerCase() === lower);
                if (card) {
                    if (this.isHandSlot(slot) && this.selectedDeck?.cards && !this.selectedDeck.cards.includes(card.id))
                        return null;
                    return card;
                }

                // 3. Try partial name match - name contains the input
                const matches = cards.filter(c => c.name?.toLowerCase().indexOf(lower) >= 0);
                card = matches.length > 0 ? matches[0] : null;
                if (card && this.isHandSlot(slot) && this.selectedDeck?.cards && !this.selectedDeck.cards.includes(card.id))
                    return null;
                return card;
            },
            isHandSlot(slot) {
                return slot >= 10 && slot <= 14;
            },
            resetGame() {
                if (confirm("This will reset the game board. Are you sure ?"))
                {
                    for (let i = 0; i < this.card_ids.length; ++i)
                        this.card_ids[i] = "";
                    for (let i = 0; i < this.cards.length; ++i)
                        this.cards[i] = null;
                    
                    this.card_ids_str = "";

                    this.saveGameData();
                }
            },
            getCardPictureUrl(card_id) {
                return '/cards/' + card_id + '.png';
            },
            setCard(slot, event) {
                event.preventDefault();

                let form = new FormData(event.target);
                let input = form.get("card_id")?.trim() ?? "";

                let card = this.resolveCard(input, slot);

                if (card != null)
                {
                    this.card_ids[slot] = card.id;
                    this.cards[slot] = card;
                    this.card_ids_str = this.card_ids.filter(x => x.length > 0).join(",");
                    this.saveGameData();
                }
                else
                {
                    // Keep existing card if invalid input
                    this.card_ids[slot] = (this.cards[slot] != null) ? this.cards[slot]["id"] : "";
                }
            },
            removeCard(slot) {
                this.card_ids[slot] = "";
                this.cards[slot] = null;
                this.card_ids_str = this.card_ids.filter(x => x.length > 0).join(",");
                this.saveGameData();
            },
            saveGameData() {
                this.userdata.data["game"] = this.card_ids;
                this.userdata.data["game_deck"] = this.selected_deck_id;
                SaveUserdata('userdata');
            },
            selectDeck() {
                this.saveGameData();
            },
            retrieveCard(card_id) {
                const cards = this.db?.data?.cards;
                if (!cards) return null;
                return cards.find(c => c.id == card_id) ?? null;
            },
            computeDiscardSuggestions() {
                const handCards = this.cards.slice(10, 15).filter(c => c != null);
                if (handCards.length === 0) return [];

                const poolIds = this.selectedDeck?.cards?.length
                    ? new Set(this.selectedDeck.cards)
                    : new Set(this.card_ids.filter((id, i) => i < 10 && id));

                const results = handCards.map(card => {
                    let count = 0;
                    let maxResultAttack = 0;
                    if (card.fusions) {
                        for (const [mat2Id, resultId] of card.fusions) {
                            if (poolIds.has(mat2Id)) {
                                count++;
                                const resultCard = this.retrieveCard(resultId);
                                if (resultCard?.attack) maxResultAttack = Math.max(maxResultAttack, resultCard.attack);
                            }
                        }
                    }
                    return { card, fusionCount: count, maxResultAttack };
                });

                return results.sort((a, b) => {
                    if (a.fusionCount !== b.fusionCount) return a.fusionCount - b.fusionCount;
                    return a.maxResultAttack - b.maxResultAttack;
                });
            }
        }
    }
</script>

<template>
    <div class="game-assist">
        <h1 class="text-light">
            <ol class="breadcrumb">
                <li class="breadcrumb-item active">Game Assist</li>
            </ol>
        </h1>
    
        <hr />

        <datalist id="card-suggestions-all">
            <option v-for="name in cardNameOptions" :key="name" :value="name" />
        </datalist>
        <datalist id="card-suggestions-deck">
            <option v-for="name in handCardOptions" :key="name" :value="name" />
        </datalist>
    
        <div class="d-flex flex-column flex-md-row mb-4 mt-2 flex-wrap gap-2 align-items-center">
            <div class="me-2">
                <button class="btn btn-primary btn-lg" :onclick="resetGame"><i class="fas fa-refresh"></i> Start new game</button>
            </div>
            <div class="d-flex align-items-center gap-2">
                <label class="text-light mb-0">Deck (limits Hand selection):</label>
                <select class="form-select form-select-lg" style="max-width:200px" v-model="selected_deck_id" @change="selectDeck">
                    <option value="">Any card in Hand</option>
                    <option v-for="d in decks" :key="d.id" :value="d.id">{{ d.name }} ({{ d.cards?.length || 0 }})</option>
                </select>
            </div>
        </div>
        
        <div class="row mb-2">
            <div class="col-12">
                <div class="card bg-dark">
                    <div class="card-body">
                        <table class="table table-dark table-bordered mb-0">
                            <tbody>
                                <tr>
                                    <td rowspan="2" style="width:120px;" class="align-middle text-center"><h4>Ground</h4></td>
                                    <td class="align-middle text-center" v-for="n in 5">
                                        <template v-if="cards[n-1] != null">
                                            <RouterLink :to="{ name: 'cardDetails', params: { id: cards[n-1].id }}" aria-current="page" target="_blank">
                                                <img class="my-2" :src="getCardPictureUrl(cards[n-1].id)" :alt="cards[n-1].name" />
                                            </RouterLink>
                                        </template>
                                        <span v-else class="text-center"><img class="my-2" :src="getCardPictureUrl(0)" :alt="'Slot ' + n" /></span>
                                    </td>
                                </tr>
                                <tr>
                                    <td v-for="n in 5">
                                        <form action="#" method="POST" @submit="setCard(n-1, $event)">
                                            <div class="input-group">
                                                <input type="text" class="form-control form-control" name="card_id" placeholder="Card ID or name" list="card-suggestions-all" :value="(cards[n-1]?.name) ?? card_ids[n-1]" />
                                                <button class="btn btn-secondary" type="button" @click="removeCard(n-1)"><i class="fas fa-times"></i></button>
                                                <button class="btn btn-primary" type="submit"><i class="fas fa-arrow-turn-up"></i></button>
                                            </div>
                                        </form>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        <div class="row mt-2">
            <div class="col-12">
                <div class="card bg-dark">
                    <div class="card-body">
                        <table class="table table-dark table-bordered mb-0">
                            <tbody>
                                <tr>
                                    <td rowspan="2" style="width:120px;" class="align-middle text-center"><h4>Magics &amp; Traps</h4></td>
                                    <td class="align-middle text-center" v-for="n in 5">
                                        <template v-if="cards[n+4] != null">
                                            <RouterLink :to="{ name: 'cardDetails', params: { id: cards[n+4].id }}" aria-current="page" target="_blank">
                                                <img class="my-2" :src="getCardPictureUrl(cards[n+4].id)" :alt="cards[n+4].name" />
                                            </RouterLink>
                                        </template>
                                        <span v-else class="text-center"><img class="my-2" :src="getCardPictureUrl(0)" :alt="'Slot ' + n" /></span>
                                    </td>
                                </tr>
                                <tr>
                                    <td v-for="n in 5">
                                        <form action="#" method="POST" @submit="setCard(n+4, $event)">
                                            <div class="input-group">
                                                <input type="text" class="form-control form-control" name="card_id" placeholder="Card ID or name" list="card-suggestions-all" :value="(cards[n+4]?.name) ?? card_ids[n+4]" />
                                                <button class="btn btn-secondary" type="button" @click="removeCard(n+4)"><i class="fas fa-times"></i></button>
                                                <button class="btn btn-primary" type="submit"><i class="fas fa-arrow-turn-up"></i></button>
                                            </div>
                                        </form>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        <div class="row mt-4">
            <div class="col-12">
                <div class="card bg-dark">
                    <div class="card-body">
                        <table class="table table-dark table-bordered mb-0">
                            <tbody>
                                <tr>
                                    <td rowspan="2" style="width:120px;" class="align-middle text-center"><h4>Hand</h4></td>
                                    <td class="align-middle text-center" v-for="n in 5">
                                        <template v-if="cards[n+9] != null">
                                            <RouterLink :to="{ name: 'cardDetails', params: { id: cards[n+9].id }}" aria-current="page" target="_blank">
                                                <img class="my-2" :src="getCardPictureUrl(cards[n+9].id)" :alt="cards[n+9].name" />
                                            </RouterLink>
                                        </template>
                                        <span v-else class="text-center"><img class="my-2" :src="getCardPictureUrl(0)" :alt="'Slot ' + n" /></span>
                                    </td>
                                </tr>
                                <tr>
                                    <td v-for="n in 5">
                                        <form action="#" method="POST" @submit="setCard(n+9, $event)">
                                            <div class="input-group">
                                                <input type="text" class="form-control form-control" name="card_id" placeholder="Card ID or name" list="card-suggestions-deck" :value="(cards[n+9]?.name) ?? card_ids[n+9]" />
                                                <button class="btn btn-secondary" type="button" @click="removeCard(n+9)"><i class="fas fa-times"></i></button>
                                                <button class="btn btn-primary" type="submit"><i class="fas fa-arrow-turn-up"></i></button>
                                            </div>
                                        </form>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        <hr />

        <div class="row" v-if="card_ids_str.length > 0">
            <div class="col-12">
                <div class="card bg-dark">
                    <div class="card-header">
                        <h4>Fusion(s)</h4>
                    </div>
                    <div class="card-body">
                        <FusionComponent :cards="card_ids_str" :deck="card_ids_str" :depth="3" :display="{'step': true}" />
                    </div>
                </div>
            </div>
        </div>

        <div class="row mt-2" v-if="discardSuggestions.length > 0">
            <div class="col-12">
                <div class="card bg-dark border-secondary">
                    <div class="card-header">
                        <h5 class="mb-0"><i class="fas fa-minus-circle text-muted"></i> Consider discarding (hand cards ranked by fewest fusion options)</h5>
                    </div>
                    <div class="card-body">
                        <p class="text-muted small mb-2">
                            <span v-if="selectedDeck">Cards in hand with fewest fusion combinations with your deck—best to discard first:</span>
                            <span v-else>Cards in hand with fewest fusion options with cards on the field:</span>
                        </p>
                        <div class="d-flex flex-wrap gap-2 align-items-center">
                            <RouterLink
                                v-for="s in discardSuggestions"
                                :key="s.card.id"
                                :to="{ name: 'cardDetails', params: { id: s.card.id } }"
                                class="badge bg-secondary text-decoration-none"
                            >
                                {{ s.card.name }} ({{ s.fusionCount }} fusion{{ s.fusionCount !== 1 ? 's' : '' }})
                            </RouterLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <hr />

        <div class="row">
            <div class="col-12">
                <div class="card bg-dark">
                    <div class="card-header">
                        <h4>Guardian Stars</h4>
                    </div>
                    <div class="card-body">
                        <GuardianStarComponent />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
