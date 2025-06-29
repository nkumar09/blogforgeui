import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <div className="relative min-h-screen">
      {/* Solid black background behind everything */}
      <div className="fixed inset-0 z-[-2] bg-black" />

      {/* Dark animated gradient */}
      <div
        className="pointer-events-none fixed inset-0 z-[-1]
          bg-gradient-to-br from-[#0a1020] via-neutral-950 to-[#231032]
          opacity-100 blur-lg transition-all duration-700"
        aria-hidden="true"
      />
      {/* Animated blobs */}
      <div className="pointer-events-none fixed -top-40 -left-32 w-96 h-96 rounded-full bg-blue-950 opacity-25 blur-3xl z-0 animate-blob1" />
      <div className="pointer-events-none fixed -bottom-32 -right-32 w-96 h-96 rounded-full bg-fuchsia-950 opacity-20 blur-3xl z-0 animate-blob2" />

      {/* Main App content */}
      <div className="relative z-10 animate-fadein">
        <App />
      </div>
    </div>
  </React.StrictMode>
);