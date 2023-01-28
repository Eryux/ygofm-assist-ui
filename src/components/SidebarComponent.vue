<script setup>
    import { RouterLink } from 'vue-router'
    import imgLogo from '@/assets/logo.svg'
</script>

<template>
    <div class="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark sidebar">
        <a href="/" class="d-flex flex-column justify-content-center text-center mb-3 mb-md-0 me-md-auto text-decoration-none">
            <div><img :src="imgLogo" alt="logo" class="logo" /></div>
            <p class="fs-4 text-white d-none d-lg-inline mt-4">Yu-Gi-Oh! Forbidden Memory - Helper</p>
        </a>

        <hr>

        <ul class="nav nav-pills flex-column mb-auto">
            <li class="nav-item mb-2">
                <RouterLink to="/" class="nav-link text-white" aria-current="page">
                    <div class="d-flex flex-row">
                        <div><i class="fas fa-house"></i></div>
                        <div class="ms-4 d-none d-lg-inline">Home</div>
                    </div>
                </RouterLink>
            </li>

            <li class="nav-item mb-2">
                <RouterLink to="/cards" class="nav-link text-white" aria-current="page">
                    <div class="d-flex flex-row">
                        <div><i class="fas fa-address-card"></i></div>
                        <div class="ms-4 d-none d-lg-inline">Cards</div>
                    </div>
                </RouterLink>
            </li>

            <li class="nav-item mb-2">
                <RouterLink to="/decks" class="nav-link text-white">
                    <div class="d-flex flex-row">
                        <div><i class="fas fa-layer-group"></i></div>
                        <div class="ms-4 d-none d-lg-inline">Decks</div>
                    </div>
                </RouterLink>
            </li>

            <li class="nav-item mb-2">
                <RouterLink to="/stars" class="nav-link text-white">
                    <div class="d-flex flex-row">
                        <div><i class="fas fa-star"></i></div>
                        <div class="ms-4 d-none d-lg-inline">Guardian Stars</div>
                    </div>
                </RouterLink>
            </li>

            <li class="nav-item mb-2">
                <RouterLink to="/game" class="nav-link text-white">
                    <div class="d-flex flex-row">
                        <div><i class="fas fa-gamepad"></i></div>
                        <div class="ms-4 d-none d-lg-inline">Game Assist</div>
                    </div>
                </RouterLink>
            </li>
        </ul>

        <hr>

        <p class="text-muted text-center m-0"><a href="https://github.com/Eryux/ygofm-assist-ui" target="_blank">GitHub</a> - v1.0.0</p>
    </div>
</template>