<script setup>
    import { db } from '@/database.js'
</script>

<script>
    export default {
        data() {
            return {
                db
            }
        }
    }
</script>

<template>
    <table class="table table-dark table-bordered table-striped mb-0">
        <thead>
            <tr><th>Guardian Star</th><th>Symbol</th><th>Strong against</th><th>Weak against</th></tr>
        </thead>
        <tbody>
            <tr v-for="guardian in db.data.guardians">
                <td>{{ guardian.name }}</td>
                <td>{{ guardian.symbol }}</td>
                <td>{{ db.data.guardians[guardian.strong].name }}</td>
                <td>{{ db.data.guardians[guardian.weak].name }}</td>
            </tr>
        </tbody>
    </table>
</template>
