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

  const [colorToDelete, setColorToDelete] = useState(null);
  const [editColor, setEditColor] = useState(null);

  function handleAddColor(data) {
    console.log(data);
    setColors((prevColors) => [data, ...prevColors]); // add new color to color array
  }
  function handleConfirmDelete(id) {
    setColorToDelete(id); //  color to delete
  }
  function handleDeleteColor(id) {
    setColors(
      colors.filter((color) => {
        return color.id !== id;
      })
    );
    setColorToDelete(null); //  delete
  }
  function handleCancelDelete() {
    setColorToDelete(null); // no delete
  }

  // function triggerd to onClick(Edit-Button)
  function handleEditColor(idToEdit) {
    // find color through id
    const colorToEdit = colors.find((color) => color.id === idToEdit);
    // set color to State (setEditColor)
    setEditColor(colorToEdit);
  }

  // function to update list of color themes (after editing)
  function handleUpdateColor(updatedColor) {
    console.log("we are in app");
    const updatedColors = colors.map((color) => {
      return color.id === updatedColor.id ? updatedColor : color;
    });
    setColors(updatedColors);
    // out of edit mode
    setEditColor(null);
  }

  return (
    <>
      <h1>Theme Creator</h1>
      <ColorForm onAddColor={handleAddColor} editColor={editColor} />

      {colors.length === 0 ? (
        <p>There are no themes available.. Please add some.</p>
      ) : (
        colors.map((color) => (
          <Color
            key={color.id}
            color={color}
            handleConfirmDelete={handleConfirmDelete} // to confirm
            handleDeleteColor={handleDeleteColor} // to delete
            handleCancelDelete={handleCancelDelete} // to cancel
            colorToDelete={colorToDelete}
            onHandleEditColor={handleEditColor}
            editColor={editColor}
            onUpdateColor={handleUpdateColor}
          />
        ))
      )}
    </>
  );
}

export default App;
