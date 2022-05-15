<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
    <div class="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark sidebar">
        <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-decoration-none">
            <p class="fs-4 text-center text-white">Yu-Gi-Oh! Forbidden Memory - Fusion Tool</p>
        </a>

        <hr>

        <ul class="nav nav-pills flex-column mb-auto">
            <li class="nav-item mb-2">
                <RouterLink to="/" class="nav-link text-white" aria-current="page">
                    Home
                </RouterLink>
            </li>

            <li class="nav-item mb-2">
                <RouterLink to="/cards" class="nav-link text-white" aria-current="page">
                    Cards
                </RouterLink>
            </li>

            <li class="nav-item mb-2">
                <RouterLink to="/decks" class="nav-link text-white">
                    Decks
                </RouterLink>
            </li>

            <li class="nav-item mb-2">
                <RouterLink to="/game" class="nav-link text-white">
                    Game Assist
                </RouterLink>
            </li>
        </ul>

        <hr>

        <p class="text-muted text-center m-0">ygofm-assist-ui - v0.1.0a <br /><a href="https://github.com/Eryux/ygofm-assist-ui" target="_blank">GitHub</a></p>
    </div>
</template>