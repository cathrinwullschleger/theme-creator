// import { initialColors } from "./lib/colors";
import Color from "./Components/Color/Color";
import "./App.css";
import { useState } from "react";
import ColorForm from "./Components/Color/ColorForm.jsx";

function App() {
  // function handleAddcolor aber mit (data)
  const [role, setRole] = useState("");
  const [hex, setHex] = useState("");
  const [contrastText, setContrastText] = useState("");

  return (
    <>
      <ColorForm onAddColor={handleAddColor} />
    </>
  );
}

export default App;
