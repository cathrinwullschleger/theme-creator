import { initialColors } from "./lib/colors";
import Color from "./Components/Color/Color";
import "./App.css";
import { useState } from "react";
import ColorForm from "./Components/Color/ColorForm.jsx";
import useLocalStorageState from "use-local-storage-state";

function App() {
  const [colors, setColors] = useLocalStorageState("colors", {
    defaultValue: initialColors,
  });

  const [role, setRole] = useState("");
  const [hex, setHex] = useState("#BFD4F9");
  const [contrastText, setContrastText] = useState("#3D281C");
  const [colorToDelete, setColorToDelete] = useState(null);
  const [editColor, setEditColor] = useState(null);

  function handleAddColor(data) {
    console.log(data);
    setColors((prevColors) => [data, ...prevColors]);
  }
  function handleDeleteClick(id) {
    setColorToDelete(id); // welche farbe soll gelöscht und bei welcher die Delete message angezeigt werden
  }
  function handleDeleteColor(id) {
    setColors(
      colors.filter((color) => {
        return color.id !== id;
      })
    );
    setColorToDelete(null); // wird gelöscht
  }
  function handleCancelDelete() {
    setColorToDelete(null); //schließen ohne löschen
  }

  //function die durch den edit button (onClick) ausgelöst wird mit der idToEdit
  //mit find das theme mit der id finden
  //theme wird in einem extra state gespeichert (steuer nob formular im edit modus ist)
  // die restlichen Zeilen helfen die aktuellen werte anzuzeigen vom Theme
  function handleEditColor(idToEdit) {
    const colorToEdit = colors.find((color) => color.id === idToEdit);
    setEditColor(colorToEdit);
    setRole(colorToEdit.role);
    setHex(colorToEdit.hex);
    setContrastText(colorToEdit.contrastText);
  }
  // function die durch den update button onClick ausgelöst wird
  //
  function handleUpdateColor(updatedColor) {
    console.log("we are in app");
    const updatedColors = colors.map((color) => {
      return color.id === updatedColor.id ? updatedColor : color;
    });
    setColors(updatedColors); //Farbliste akutalieren
    setEditColor(null); // nicht mehr im Bearbeitungsmodus
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
        editColor={editColor}
      />

      {colors.length === 0 ? (
        <p>There are no themes available.. Please add some.</p>
      ) : (
        colors.map((color) => (
          <Color
            key={color.id}
            color={color}
            handleDeleteClick={handleDeleteClick} // zum öffnen der Bestätigung
            handleDeleteColor={handleDeleteColor} // zum endgültigen löschen
            handleCancelDelete={handleCancelDelete} // zum abbrechen
            colorToDelete={colorToDelete}
            onHandleEditColor={handleEditColor}
            editColor={editColor}
            onUpdateColor={handleUpdateColor}
            role={role}
            setRole={setRole}
            hex={hex}
            setHex={setHex}
            contrastText={contrastText}
            setContrastText={setContrastText}
          />
        ))
      )}
    </>
  );
}

export default App;

//ColorForm --(sendet neues Theme)--> App (speichert im State) --(mappt Liste)--> Color (zeigt einzelne Karte)
