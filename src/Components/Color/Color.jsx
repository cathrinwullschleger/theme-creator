import "./Color.css";
import ColorForm from "./ColorForm";
import { useState } from "react";
import { useEffect } from "react";

export default function Color({
  color,
  onUpdateColor,
  role,
  setRole,
  hex,
  setHex,
  contrastText,
  setContrastText,

  handleDeleteColor,
  handleDeleteClick,
  colorToDelete,
  handleCancelDelete,
}) {
  const [isEditing, setIsEditing] = useState(false);

  const [copyMessage, setCopyMessage] = useState(false);
  useEffect(() => {
    let timerId = setTimeout(() => {
      setCopyMessage(false); // so verschwindet die Nachricht, da setCopyMessage true sien muss
    }, 3000);
    return () => clearTimeout(timerId); //verhindert das sich timer überschneiden
  }, [copyMessage]); //wenn copyMessage sich verändert(true/false) wird useEffect ausgeführt

  async function CopyToClipboard(hex) {
    console.log(hex);
    try {
      await navigator.clipboard.writeText(hex);
      console.log("copied");
      setCopyMessage(true);
    } catch (error) {
      console.error("copy failed");
    }
  }
  return (
    <div
      className="color-card"
      style={{
        background: color.hex,
        color: color.contrastText,
      }}
    >
      {isEditing ? ( // edit modus colorForm(Formularfelder werden angezeigt)
        <ColorForm
          hex={hex}
          setHex={setHex}
          contrastText={contrastText}
          setContrastText={setContrastText}
          role={role}
          setRole={setRole}
          editColor={color.id}
          onUpdateColor={onUpdateColor}
          onCancel={() => setIsEditing(false)}
          setIsEditing={setIsEditing}
        ></ColorForm>
      ) : (
        // normaler modus
        <>
          <h3 className="color-card-headline">{color.hex}</h3>
          <button
            onClick={() => {
              CopyToClipboard(color.hex);
              setCopyMessage(true);
            }}
            type="button"
            title="copy hex"
          >
            Copy
          </button>
          {copyMessage && <p>Copied!</p>}

          <h4>{color.role}</h4>
          <p>contrast: {color.contrastText}</p>
          <button onClick={() => setIsEditing(true)} type="button" title="Edit">
            Edit
          </button>
          {colorToDelete === color.id ? (
            <div
              className="color-card-highlight"
              style={{
                "--contrast-text": color.contrastText, // CSS-Variable setzen
              }}
            >
              <p>Are you sure you want to delete this theme?</p>

              <button
                onClick={() => handleDeleteColor(color.id)}
                type="button"
                title="confirm-delete"
              >
                Delete
              </button>
              <button
                onClick={handleCancelDelete}
                type="button"
                title="cancel-delete"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => handleDeleteClick(color.id)}
              type="button"
              title="delete"
            >
              Delete
            </button>
          )}
        </>
      )}
    </div>
  );
}
