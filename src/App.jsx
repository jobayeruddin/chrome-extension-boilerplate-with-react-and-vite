import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import "./App.css";

function App() {
  const [coolness, setCoolness] = useState(false);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a
          href="https://react.dev"
          target="_blank"
          style={{ marginLeft: "20px" }}
        >
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <h1>
        "With Great <br />
        <i style={{ color: "#2bf485", fontSize: "50px" }}>Boilerplates</i>{" "}
        <br />
        Comes Great <br />
        <i style={{ color: "#2bf485", fontSize: "50px" }}>Extensions</i>" <br />
      </h1>
      <div className="card">
        <button
          onClick={() => setCoolness(true)}
          style={{
            backgroundColor: coolness ? "#2bf485" : "",
            boxShadow: coolness ? "0px 0px 20px 0px #2bf485" : "none",
            color: coolness ? "#fff" : "",
          }}
        >
          <h5>
            {!coolness
              ? "Click here to be cool"
              : "Certified cool dude here! 😎"}
          </h5>
        </button>
      </div>
      <div className="credit ">
        <div>Made with </div>
        <div style={{ margin: "0px 4px" }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
            width={"17px"}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
            />
          </svg>
        </div>
        <div>
          By{" "}
          <a href="https://github.com/jobayeruddin" target="_blank">
            Jobayer
          </a>
        </div>
      </div>
    </>
  );
}

export default App;
