// Import the WebSocket library
const WebSocket = require("ws");
const path = require("path");

const chokidar = require("chokidar");

// Add Your Directory here
let directoryToWatch = "./your-directory-to-watch/src";

// Create a new WebSocket server
const wss = new WebSocket.Server({ port: 8080 });

// Function to broadcast a message to all connected clients
function broadcast(message) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}

// Event listener for new connections
wss.on("connection", function connection(ws) {
  console.log("A new client connected!");

  // Event listener for messages from the client
  ws.on("message", function incoming(message) {
    // Convert the buffer to a string
    const messageStr = message.toString();
    console.log("Received:", messageStr);

    // Echo the received message back to the client
    ws.send(JSON.stringify({ message: messageStr }));
  });

  // Send a message to the client when they connect
  ws.send(JSON.stringify({ message: "Welcome to the WebSocket server!" }));
});

const directoryPath = path.join(__dirname, directoryToWatch);
// Ensure the directory exists

// Initialize the watcher
const watcher = chokidar.watch(directoryPath, {
  persistent: true,
  ignoreInitial: true,
  depth: Infinity,
  awaitWriteFinish: {
    stabilityThreshold: 2000,
    pollInterval: 100,
  },
});

// Chain event listeners for the watcher
watcher
  .on("add", (filePath) => {
    // const message = `File ${filename} was ${eventType}`;
    const message = JSON.stringify({ reloadStatus: true });
    console.log(message);

    // Broadcast the message to all connected clients
    broadcast(message);
  })
  .on("change", (filePath) => {
    // const message = `File ${filename} was ${eventType}`;
    const message = JSON.stringify({ reloadStatus: true });
    console.log(message);

    // Broadcast the message to all connected clients
    broadcast(message);
  })
  .on("unlink", (filePath) => {
    // const message = `File ${filename} was ${eventType}`;
    const message = JSON.stringify({ reloadStatus: true });
    console.log(message);

    // Broadcast the message to all connected clients
    broadcast(message);
  })
  .on("addDir", (dirPath) => {
    // const message = `File ${filename} was ${eventType}`;
    const message = JSON.stringify({ reloadStatus: true });
    console.log(message);

    // Broadcast the message to all connected clients
    broadcast(message);
  })
  .on("unlinkDir", (dirPath) => {
    // const message = `File ${filename} was ${eventType}`;
    const message = JSON.stringify({ reloadStatus: true });
    console.log(message);

    // Broadcast the message to all connected clients
    broadcast(message);
  })
  .on("error", (error) => {
    console.error("Error watching directory:", error);
  });

console.log("WebSocket server is running on ws://localhost:8080");
