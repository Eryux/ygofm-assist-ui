<script setup>
    import { RouterLink } from 'vue-router'
</script>

<template>
    <h1 class="text-light">
        <ol class="breadcrumb">
            <li class="breadcrumb-item active">Guardian Stars</li>
        </ol>
    </h1>

    <hr />

    <div class="row mt-2">
        <div class="col-12">
            <div class="card bg-dark">
                <div class="card-body">
                    <table class="table table-dark table-bordered table-striped mb-0">
                        <thead>
                            <tr><th>Guardian Star</th><th>Symbol</th><th>Alignement</th><th>Strong against</th><th>Weak against</th></tr>
                        </thead>
                        <tbody>
                            <tr><td>Sun</td><td>☉</td><td>White Magic</td><td>Moon</td><td>Mercury</td></tr>
                            <tr><td>Mercury</td><td>☿</td><td>Black Magic</td><td>Sun</td><td>Venus</td></tr>
                            <tr><td>Venus</td><td>♀</td><td>Illusion Magic</td><td>Mercury</td><td>Moon</td></tr>
                            <tr><td>Moon</td><td>☾</td><td>Demon Magic</td><td>Venus</td><td>Sun</td></tr>
                            <tr><td>Mars</td><td>♂</td><td>Fire</td><td>Jupiter</td><td>Neptune</td></tr>
                            <tr><td>Jupiter</td><td>♃</td><td>Forest</td><td>Saturn</td><td>Mars</td></tr>
                            <tr><td>Saturn</td><td>♄</td><td>Wind</td><td>Uranus</td><td>Jupiter</td></tr>
                            <tr><td>Uranus</td><td>⛢</td><td>Earth</td><td>Pluto</td><td>Saturn</td></tr>
                            <tr><td>Neptune</td><td>♆</td><td>Water</td><td>Mars</td><td>Pluto</td></tr>
                            <tr><td>Pluto</td><td>♇</td><td>Thunder</td><td>Neptune</td><td>Uranus</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>
