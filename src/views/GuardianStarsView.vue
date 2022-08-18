<script setup>
    import GuardianStarComponent from '@/components/GuardianStarComponent.vue';
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
                    <GuardianStarComponent />
                </div>
            </div>
        </div>
    </div>
</template>
