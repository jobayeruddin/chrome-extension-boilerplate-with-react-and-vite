chrome.runtime.onInstalled.addListener(async () => {
  console.log("Extension installed");

  let getScriptsToRegister = () => {
    let manifest = chrome.runtime.getManifest();
    let scripts = [];
    manifest.dev_content_scripts.forEach((element) => {
      let { matches, js, css, run_at } = element;
      scripts.push({ id: matches.toString(), matches, js, css, runAt: run_at });
    });

    return scripts;
  };
  function keepAlive(webSocket) {
    const keepAliveIntervalId = setInterval(
      () => {
        if (webSocket) {
          webSocket.send("keepalive");
        } else {
          clearInterval(keepAliveIntervalId);
        }
      },
      // Set the interval to 20 seconds to prevent the service worker from becoming inactive.
      20 * 1000
    );
  }

  chrome.scripting
    .registerContentScripts([...getScriptsToRegister()])
    .then(() => console.log("registration complete"))
    .catch((err) => console.warn("unexpected error", err));

  // Create a new WebSocket connection
  try {
    const ws = new WebSocket("ws://localhost:8080");

    // Event listener for when the connection is open
    ws.onopen = function () {
      console.log("Connected to the server");
      ws.send("Hello, Server!");
      keepAlive(ws);
    };

    // Event listener for messages from the server
    ws.onmessage = async function (event) {
      let data = JSON.parse(event.data);
      if (data.reloadStatus) {
        console.log("Message from server:", event.data);
        chrome.scripting
          .updateContentScripts([...getScriptsToRegister()])
          .then(() => console.log("registration updated"));

        console.log("Updated");
      }
    };

    // Event listener for when the connection is closed
    ws.onclose = function () {
      console.log("Disconnected from the server");
    };

    // Event listener for errors
    ws.onerror = function (error) {
      console.error("WebSocket error:", error);
    };
  } catch (error) {
    console.error(error);
  }
});
