<script setup>
    import { RouterLink } from 'vue-router'
</script>

<template>
    <div class="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark sidebar">
        <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-decoration-none">
            <p class="fs-4 text-center text-white d-none d-lg-inline">Yu-Gi-Oh! Forbidden Memory - Assist</p>
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

        <p class="text-muted text-center m-0">ygofm-assist-ui - v0.1.0a <br /><a href="https://github.com/Eryux/ygofm-assist-ui" target="_blank">GitHub</a></p>
    </div>
</template>