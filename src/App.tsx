import React from "react";
import "./App.css";
import PasswordGenerator from "./components/PasswordGenerator";
import Header from "./components/Header";

const App = () => {
  return (
    <div>
      <div>
        <Header title="SafeKeys Password Generator"></Header>
      </div>
      <div>
        <PasswordGenerator />
      </div>
    </div>
  );

  //<div className="App">password generator</div>;
};

export default App;
