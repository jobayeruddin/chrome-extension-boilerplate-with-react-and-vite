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

### Auto Reload

**For development** the content-scripts aren't injecting through `manifest.json` instead there is a file named `dev_reloader.js` which is injecting all the content-scripts through service-worker.
I had to take this weird way just to add the "Auto Reload" functionality.

Now just serve a webSocket locally, which will send a message(`{ reloadStatus: true }`) to the `dev_reloader.js` and it will then reload the content-scripts so that you don't have to manually reload the extension everytime something is changed.

Also you don't have to take the hassale of writing a web-socket server code. <br>
I've added a boilerplate websocket server code in `webSocket.js` file. 😇

**Here are the steps to start the server,** <br>

1. Create a directory
2. Run `npm init`
3. Run `npm install chokidar ws`
4. Add the `webSocket.js` file to the directory
5. Add the extension directory path(with src) you're currently working on:

```
// Add Your Directory here
let directoryToWatch = "./your-directory-to-watch/src";
```

6. Run `node webSocket.js`. <br>
   The server should start on 8080 port.

#### Note: There will be this error "Unrecognized manifest key 'dev_content_scripts' " while loading the extension on development . Don't worry about it. It won't harm anywhere also it won't go in the Production.

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
