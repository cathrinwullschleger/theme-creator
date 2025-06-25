import { initialColors } from "./lib/colors";
import Color from "./Components/Color/Color";
import "./App.css";
import { useState } from "react";
import ColorForm from "./Components/Color/ColorForm.jsx";

function App() {
  // function handleAddcolor aber mit (data)
  const [role, setRole] = useState("");
  const [hex, setHex] = useState("");
  const [contrastText, setContrastText] = useState("");

  const [colors, setColors] = useState(initialColors);

  function handleAddColor(data) {
    console.log(data);
    setColors((prevColors) => [...prevColors, data]);
  }

  return (
    <>
      <h1>Theme Creator</h1>
      <ColorForm
        onAddColor={handleAddColor}
        role={role}
        setRole={setRole}
        hex={hex}
        setHex={setHex}
        contrastText={contrastText}
        setContrastText={setContrastText}
      />

      {colors.map((color) => {
        return <Color key={color.id} color={color} />;
      })}
    </>
  );
}

export default App;

//ColorForm --(sendet neues Theme)--> App (speichert im State) --(mappt Liste)--> Color (zeigt einzelne Karte)
