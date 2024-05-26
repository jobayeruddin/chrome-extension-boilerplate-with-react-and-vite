# Chrome Extension (MV3) Boilerplate with React and Vite

Just some chilled boilerplate code to give you a headstart on building great Extensions.

## Getting Started

- Clone the repo
- Install dependencies

## For Development

Run:

```
npm run dev
```

This command will build the extension and save it to a directory named "dev". It will watch for any changes on the files (not on manifest.json) and rebuild it on the "dev" directory.

You have to load the "dev" folder on Chrome.

## For Production

Run:

```
npm run build
```

This command will build the extension and save it to a directory named "dist".

You have to load the "dist" folder on Chrome.

## Content Scripts (Inspired from NextJS)

`src/content_scripts` directory is introduced. Each subdirectory within `content_scripts` will represent a unique content script.

1. #### Each Directory should contain:
   - `config.json` file which defines the URL(s) where the content script will be injected. You can specify an array of URLs for targeted injection.

**`background.js` file will act as the Service Worker for the Extension**

I've created an example content_script directory for `https://www.google.com/`. Check it out to know more.

Now it is a super minimal version but I'll try to update it frequently. Feel free to contribute.
