import React from "react";
import "./App.css";
import PasswordGenerator from "./components/PasswordGenerator";
import Header from "./components/Header";

const App = () => {
  return (
    <div>
      <Header title="SafeKeys"></Header>
      <main>
        <PasswordGenerator />
      </main>
    </div>
  );
};

export default App;
