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
                card_ids: ["", "", "", "", "", "", "", "", "", ""],
                card_ids_str: "",
                cards: [null, null, null, null, null, null, null, null],
                userdata,
                db
            }
        },
        created()
        {
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
            this.saveGameData();
        },
        methods: {
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
                return new URL('../assets/cards/' + card_id + '.png', import.meta.url).href;
            },
            setCard(slot, event) {
                event.preventDefault();

                let form = new FormData(event.target);
                let card_id = form.get("card_id");

                this.card_ids[slot] = card_id;

                let card = null;
                for (let i = 0; i < this.db.data["cards"].length; ++i)
                {
                    if (this.db.data["cards"][i]["id"] == card_id)
                    {
                        card = this.db.data["cards"][i];
                        break;
                    }
                }

                if (card != null)
                {
                    this.cards[slot] = card;
                    this.card_ids_str = this.card_ids.filter(x => x.length > 0).join(",");
                    this.saveGameData();
                }
                else
                {
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
                SaveUserdata('userdata');
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
    
        <div class="d-flex flex-column flex-md-row mb-4 mt-2">
            <div class="me-2">
                <button class="btn btn-primary btn-lg" :onclick="resetGame"><i class="fas fa-refresh"></i> Start new game</button>
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
                                        <span v-else class="text-center">Slot {{ n }}</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td v-for="n in 5">
                                        <form action="#" method="POST" @submit="setCard(n-1, $event)">
                                            <div class="input-group">
                                                <input type="text" class="form-control form-control" name="card_id" placeholder="Card number" :value="card_ids[n-1]" />
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
                                    <td rowspan="2" style="width:120px;" class="align-middle text-center"><h4>Hand</h4></td>
                                    <td class="align-middle text-center" v-for="n in 5">
                                        <template v-if="cards[n+4] != null">
                                            <RouterLink :to="{ name: 'cardDetails', params: { id: cards[n+4].id }}" aria-current="page" target="_blank">
                                                <img class="my-2" :src="getCardPictureUrl(cards[n+4].id)" :alt="cards[n+4].name" />
                                            </RouterLink>
                                        </template>
                                        <span v-else class="text-center">Slot {{ n }}</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td v-for="n in 5">
                                        <form action="#" method="POST" @submit="setCard(n+4, $event)">
                                            <div class="input-group">
                                                <input type="text" class="form-control form-control" name="card_id" placeholder="Card number" :value="card_ids[n+4]" />
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
