import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Routes from "./routes";

function App() {
  return (
    <div>
      <Routes />
      <ToastContainer autoClose={3500} />
    </div>
  );
}

export default App;
