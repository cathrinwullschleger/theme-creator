// ColorForm – displays form, handles local input
// Local states: role, hex, contrastText

import "./ColorForm.css";
import { useState, useEffect } from "react";
import ColorInput from "./ColorInput.jsx";
import { uid } from "uid";
import "../Button/button.css";
export default function ColorForm({
  onAddColor,
  onUpdateColor,
  editColor,
  onCancel,
}) {
  const [hex, setHex] = useState("#BFD4F9");
  const [contrastText, setContrastText] = useState("#3D281C");
  const [role, setRole] = useState("");

  useEffect(() => {
    // no endless loop
    if (editColor) {
      setHex(editColor.hex);
      setContrastText(editColor.contrastText);
      setRole(editColor.role);
    } else {
      setHex("#BFD4F9");
      setContrastText("#3D281C");
      setRole("");
    }
  }, [editColor]);

  function handleSubmit(event) {
    event.preventDefault();

    const data = {
      hex,
      contrastText,
      role,
    };

    if (!data.role) {
      data.role = data.hex; //fallback to hex if no role added
    }

    if (editColor) {
      // edit mode
      console.log(editColor);
      data.id = editColor.id;
      console.log(data);
      onUpdateColor(data);
      onCancel();
    } else {
      data.id = uid();
      onAddColor(data);
      setHex("#BFD4F9"); // reset formular
      setRole("");
      setContrastText("#3D281C");
    }
  }

  return (
    <div>
      <form className="form" onSubmit={handleSubmit} aria-label="theme-creator">
        <label htmlFor="hex">Backgroundcolor</label>
        <ColorInput
          id="hex"
          name="hex"
          value={hex}
          onChange={setHex}
        ></ColorInput>
        <label htmlFor="role">Name of Theme</label>
        <input
          id="role"
          type="text"
          name="role"
          placeholder="Cornflower"
          value={role}
          onChange={(event) => setRole(event.target.value)}
        ></input>
        <label htmlFor="contrastText">Fontcolor</label>
        <ColorInput
          id="contrastText"
          name="contrastText"
          value={contrastText}
          onChange={setContrastText}
        ></ColorInput>
        <button type="submit" className="button">
          {editColor ? "Update Theme" : "Add Theme"}
        </button>
        {editColor && (
          <button type="button" className="button" onClick={onCancel}>
            Cancel
          </button>
        )}
      </form>
    </div>
  );
}
