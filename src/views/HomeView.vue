<script setup></script>

<template>
    <h1 class="text-light">
        <ol class="breadcrumb">
            <li class="breadcrumb-item active">Home</li>
        </ol>
    </h1>

    <hr />

    <div class="row">
        <div class="col-12 col-lg-8">
            <div class="row">
                <div class="col-12 mt-2">
                    <div class="card bg-dark">
                        <div class="card-body">
                            <h3>Welcome on Yu-Gi-Oh! Forbidden Memory - Helper</h3>
                            <p class="lead">Fan made database and tools for PSX game Yu-Gi-Oh! Forbidden Memory released
                                in 1999.</p>
                        </div>
                    </div>

                    <div class="col-12 mt-2">
                        <div class="card bg-dark">
                            <div class="card-body">
                                <h4>How does it work?</h4>
                                <p>The website has a complete list of in-game cards, their data, and tools that may be useful
                                    for your gaming experience.</p>

                                <ul>
                                    <li>
                                        <p>The <strong>Cards</strong> section is a <strong>database of cards available
                                                in this game</strong>. You have the list of all the cards with their
                                            <strong>stats and visuals</strong>. You can also <strong>search for a
                                                specific card</strong> using its name or in-game card number. By going
                                            to card details, you will find more information about the card and the
                                            fusions available with or to summon this card.</p>
                                    </li>
                                    <li>
                                        <p>The <strong>Decks</strong> section allows you to <strong>create and manage
                                                card decks</strong>. You can <strong>create a deck, add or remove
                                                cards</strong> from it within the limit of 40 cards and <strong>view
                                                fusions</strong> that it's possible to perform with the deck. If your
                                            cookies are enabled, decks will be saved locally on your computer and will 
                                            persist even after closing your browser.</p>
                                    </li>
                                    <li>
                                        <p>The <strong>Guardian Stars</strong> section is a reference sheet for
                                            <strong>identifying cards guardian stars and their strength /
                                                weakness</strong>.</p>
                                    </li>
                                    <li>
                                        <p>The <strong>Game Assist</strong> section is a tool that mimics your side of a
                                            game board during a duel. It will <strong>show you fusions that you can do
                                                during your turn</strong> simply by entering the cards that you have in
                                            your hand and on the ground. It's quick and easy to use during a game, avoiding
                                            wasted time browsing the cards database.</p>
                                    </li>
                                </ul>

                                <p>Enjoy your game and It's time to duel !</p>
                            </div>
                        </div>
                    </div>

                    <div class="col-12 mt-2">
                        <div class="card bg-dark">
                            <div class="card-body">
                                <h4>About</h4>
                                <p>As it's said on the top of the page, it's a fan made project, <strong>it's not associated
                                        with Konami or any third-party of Yu-Gi-Oh! license</strong>.</p>
                                <p><strong>This project is completely free and distributed under LGPLv3 license</strong>
                                    with the exception of card visuals and third-party libraries with their own license.
                                    You can find much more information about the project on its <a
                                        href="https://github.com/Eryux/ygofm-assist-ui" target="_blank">GitHub</a>
                                    repository. The project is mainly maintained by one person on their spare time, and updates
                                    and fixes may take longer to complete without any guarantee that they will
                                    work for all devices.</p>

                                <p>&nbsp;</p>

                                <h5>How to support the project ?</h5>
                                <p>If you would like to support the project there are several ways to do it.</p>
                                <ul>
                                    <li>
                                        <p>You can add a star to the project on <a
                                                href="https://github.com/Eryux/ygofm-assist-ui"
                                                target="_blank">GitHub</a>, it shows your interest for the project and
                                            it's always welcome,</p>
                                    </li>
                                    <li>
                                        <p>Report bugs or mistakes, for this you can use <a
                                                href="https://github.com/Eryux/ygofm-assist-ui" target="_blank">GitHub
                                                issues</a> or by contacting us directly by email at
                                            <strong>contact@bark.tf</strong>,</p>
                                    </li>
                                    <li>
                                        <p>Contribute directly to the project code on <a
                                                href="https://github.com/Eryux/ygofm-assist-ui"
                                                target="_blank">GitHub</a>.</p>
                                    </li>
                                    <li>
                                        <p>Send us your feedback or suggestion, on <a
                                                href="https://github.com/Eryux/ygofm-assist-ui"
                                                target="_blank">GitHub</a> or by sending an email at
                                            <strong>contact@bark.tf</strong>,</p>
                                    </li>
                                </ul>
                                <p>Again, this project is mostly maintained by a single person on their spare time. Getting an
                                    answer will sometimes take time, so please be patient.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-12 col-lg-4">
            <div class="row">
                <div class="col-12 mt-2">
                    <div class="card bg-dark">
                        <div class="card-body">
                            <h5>Changelogs</h5>
                            <ul>
                                <p>2026-02-22</p>
                                <ul class="fst-italic">
                                    <li><p>Version 1.1.0</p></li>
                                    <li><p>Fix invalid fusion bug</p></li>
                                    <li><p>Add "Fusion Potential by Card" on Deck Fusions page</p></li>
                                    <li><p>Sort cards from greatest to least fusion count</p></li>
                                    <li><p>Add deck dropdown in "Fusion(s) using ..."</p></li>
                                    <li><p>Filter fusion list by selected deck (or all cards)</p></li>
                                </ul>
                            </ul>
                            <ul>
                                <p>2023-03-10</p>
                                <ul class="fst-italic">
                                    <li>
                                        <p>Version 1.0.0</p>
                                    </li>
                                </ul>
                            </ul>
                            <ul>
                                <p>2023-01-28</p>
                                <ul class="fst-italic">
                                    <li>
                                        <p>Fix incorrect guardian stars on cards.</p>
                                    </li>
                                </ul>
                            </ul>
                            <ul>
                                <p>2022-08-19</p>
                                <ul class="fst-italic">
                                    <li>
                                        <p>Alpha version with cards, decks, guardians and assist sections.</p>
                                    </li>
                                </ul>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>