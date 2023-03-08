# YGOFM - Helper

YGOFM Helper is a cards and fusions database and a webapp based on vueJS for PSX game Yu-Gi-Oh! Forbidden Memory released in 1999. This repository contains the source code and data to run the application, if just want to use the app you can go on https://ygofm.bark.tf/.


## Features

- Database and a browsing interface for all in game cards with their fusions
- Deck creation and management system
- Guardians star sheet with their symbols, strength and weakness
- An helper tool that mimics game board and displays the fusions that can be done during the player's turn with its cards

It's time to duel!

---

## Getting Started

This section is only if you want to run your own instance of YGOFM Helper, if you only attend to use it you can go on https://ygofm.bark.tf/.


### Prerequisites

Before doing anything make sure to have Node.js installed on your computer. For more information about nodejs visit the [official website](https://nodejs.org/en/).

Then update your node packet manager to the latest version using `npm install npm@latest -g`.


### Setup

By default, card visuals are not included as they are not compatible with the open source license. If you want to include them in your instance, you can [download them here](https://ygofm.bark.tf/cards.zip).

- Clone the repository locally on your computer or download and un-zip the last version of it on your computer.
  
- Open a terminal at the root of the project folder and install npm packages with the command `npm install`.

- (optional) If you have downloaded card visuals, extract the archive inside `public` folder to include it in your project instance.


### Run

- To run the project in developement mode use the command `npm run dev`.


### Build

- To build the project use the command `npm build`.
- To test the build use the command `npm run preview`.

Important: You may need to edit `index.html` file of your build result is `dist` folder to change the website url by your own url.

for example -
```html
<script type="text/javascript">
    var siteUrl = "https://ygofm.bark.tf/"
</script>
```

instead of -
```html
<script type="text/javascript">
    var siteUrl = "http://localhost:3030/"
</script>
```

---

## Contributing

Contributing is always welcome. 
If you want to help on this project by contributing on its developement, by reporting bugs, errors or mistakes or simply by giving your feedback, use the [issues section](https://github.com/Eryux/ygofm-assist-ui/issues). Before posting or doing anything be sure to read the CONTRIBUTING.md which include basic contribution guidelines.

---

## Credits

Nicolas C. (Eryux) - **Author**


This project also uses the following open source packages :

- [VueJS](https://github.com/vuejs)
- [Bootstrap](https://github.com/twbs/bootstrap)
- [jQuery](https://github.com/jquery/jquery)
- [FortAwesome](https://github.com/FortAwesome/Font-Awesome)
- [js-cookie](https://github.com/js-cookie/js-cookie)
- [SASS](https://github.com/sass/sass)
- [UUID](https://github.com/uuidjs/uuid)

---

## License

This project and application are distributed under LGPLv3 License. See LICENSE for more information.