import { useEffect, useState } from "react";

function Modal() {
  const [modalVisible, setModalVisible] = useState(true);
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.message === "testMessage") {
      console.log(message.message);
    }
    console.log(message);
  });
  useEffect(() => {
    if (modalVisible) {
      // document.body.style.overflow = "hidden";
      document.body.classList.add("overflow_hidden");
    } else {
      document.body.classList.remove("overflow_hidden");
    }
  }, [modalVisible]);

  if (modalVisible) {
    return (
      <div>
        <div className="overlay"></div>

        <div className="modal_body">
          <div className="modal">
            <div>
              <h1>
                This Modal is from the{" "}
                <b className="color_green">Vreact Extension</b>
              </h1>
            </div>
            <div>
              <button
                className="ext_btn modal_close_btn"
                onClick={() => {
                  setModalVisible(false);
                }}
              >
                Click here to close the modal
              </button>
            </div>
            <div className="credit">
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
          </div>
        </div>
      </div>
    );
  } else {
    return "";
  }
}

export default Modal;
