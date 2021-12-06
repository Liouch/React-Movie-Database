import React from "react";
import Header from "./components/Header/Header";
import Home from "./components/Home";
import { GlobalStyle } from "./GlobalStyles";

function App() {
  return (
    <div className="App">
      <Header />
      <Home />
      <GlobalStyle />
    </div>
  );
}

export default App;
