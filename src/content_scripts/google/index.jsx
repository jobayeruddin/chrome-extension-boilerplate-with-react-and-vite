import React from "react";
import ReactDOM from "react-dom/client";

import "./google.css";
import Modal from "./components/Modal";

let fonts = `<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap" rel="stylesheet">`;

document.head.innerHTML += fonts;

console.log("I'm google");
let root = document.createElement("div");
// root.classList.add("overlay");
root.id = "test_id";
document.body.append(root);

ReactDOM.createRoot(document.getElementById("test_id")).render(
  <React.StrictMode>
    <Modal />
  </React.StrictMode>
);
