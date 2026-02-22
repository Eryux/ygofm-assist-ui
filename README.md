# YGOFM - Helper

YGOFM Helper is a cards and fusions database and a webapp based on VueJS for the PSX game Yu-Gi-Oh! Forbidden Memory released in 1999. This repository contains the source code and data to run the application. If you just want to use the app, you can visit https://ygofm.bark.tf/.


## Features

- Database and a browsing interface for all in game cards with their fusions
- Deck creation and management system
- Guardians star sheet with their symbols, strength and weakness
- An helper tool that mimics game board and displays the fusions that can be done during the player's turn with its cards

It's time to duel!


## Getting Started

This section is only if you want to run your own instance of YGOFM Helper. If you only intend to use it, you can visit https://ygofm.bark.tf/.


### Prerequisites

Before doing anything make sure to have Node.js installed on your computer. For more information about nodejs visit the [official website](https://nodejs.org/en/).

Then update your Node package manager to the latest version using `npm install npm@latest -g`.


### Setup

By default, card visuals are not included as they are not compatible with the open source license. If you want to include them in your instance, you can [download them here](https://ygofm.bark.tf/cards.zip).

- Clone the repository locally on your computer or download and un-zip the last version of it on your computer.
  
- Open a terminal at the root of the project folder and install npm packages with the command `npm install`.

- (optional) If you have downloaded card visuals, extract the archive inside `public` folder to include it in your project instance.


### Run

- To run the project in development mode, use the command `npm run dev`.


### Build

- To build the project, use the command `npm run build`.
- To test the build, use the command `npm run preview`.

Important: After building, you may need to edit the `index.html` file in the `dist` folder to change the website URL to your own URL.

For example:
```html
<script type="text/javascript">
    var siteUrl = "https://ygofm.bark.tf/"
</script>
```

Instead of:
```html
<script type="text/javascript">
    var siteUrl = "http://localhost:3030/"
</script>
```

### Updating fusion data from Yugipedia

Fusion data is parsed from Yugipedia. The HTML pages are not stored in the repo. To retrieve and update the data:

1. **Fetch** the Yugipedia pages into a local `yugipedia/` folder (this folder is in `.gitignore`):
   ```bash
   node scripts/fetch-yugipedia-pages.js
   ```
2. **Combine** the HTML files into a single file:
   ```bash
   node scripts/combine-yugipedia-fusions.js
   ```
3. **Parse** the combined HTML and update `public/data.json` (and `public/data.min.json`):
   ```bash
   node scripts/parse-yugipedia-fusions.js
   ```
   Use `--dry-run` to preview changes without writing:  
   `node scripts/parse-yugipedia-fusions.js --dry-run`

---

## Contributing

Contributing is always welcome. 
If you want to help on this project by contributing to its development, by reporting bugs, errors, or mistakes, or simply by giving your feedback, use the [issues section](https://github.com/Eryux/ygofm-assist-ui/issues). Before posting or doing anything, be sure to read the CONTRIBUTING.md file, which includes basic contribution guidelines.

---

## Credits

- Nicolas C. / Eryux (**Author**) - [GitHub](https://github.com/Eryux)
- Lodakia ([Add fusion tools, deck features...](https://github.com/Eryux/ygofm-assist-ui/pull/1)) - [GitHub](https://github.com/Lodakia)


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