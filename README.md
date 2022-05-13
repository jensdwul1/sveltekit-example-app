# An Example app in Sveltekit

This app will be a small scale reproduction of an existing application (Spravato Navigator). The basic goal will be to reproduce as much of the core functionality in a small amount of time

## Target Features

- [ ] Data Collection
- [ ] Dashboard
- [ ] Report Generation


## Install

Install dependencies with `npm install` (or `pnpm install` or `yarn`)

## Prerequirements
First you'll need to make a cosmos database in azure if you wish to store your data online.
Additionally the data is stored in an indexeddb.
You'll need to make an .env file on the root level containing the following variables
```
VITE_ENDPOINT=CosmosDatabaseEndpointUrl
VITE_KEY=CosmosAccessKey
VITE_DATABASE=DatabaseName
VITE_CONTAINER=ContainerName
```

## Development

Start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of the app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
