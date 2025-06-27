// Color – a card that can trigger edit/delete actions
// Local state: isEditing

import "./Color.css";
import "../Button/button.css";
import ColorForm from "./ColorForm";
import { useState } from "react";
import { useEffect } from "react";

export default function Color({
  color,
  onUpdateColor,
  handleDeleteColor,
  handleConfirmDelete,
  colorToDelete,
  handleCancelDelete,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [copyMessage, setCopyMessage] = useState(false);

  useEffect(() => {
    let timerId = setTimeout(() => {
      setCopyMessage(false); // message disapears
    }, 3000);
    return () => clearTimeout(timerId); //
  }, [copyMessage]); //copyMessage change (true/false) useEffect is activated

  async function CopyToClipboard(hex) {
    console.log(hex);
    try {
      await navigator.clipboard.writeText(hex);
      console.log("copied");
      setCopyMessage(true);
    } catch (error) {
      console.error("Copy failed");
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
      {isEditing ? ( // edit mode colorForm - formfields are shown
        <ColorForm
          editColor={color}
          onUpdateColor={(updateColor) => {
            onUpdateColor(updateColor); // update state in app
            setIsEditing(false); //close edit mode
          }}
          onCancel={() => setIsEditing(false)}
          id={color.id}
        ></ColorForm>
      ) : (
        // normal mode
        <>
          <h3 className="color-card-headline">{color.hex}</h3>
          <button
            onClick={() => {
              CopyToClipboard(color.hex);
              setCopyMessage(true);
            }}
            type="button"
            title="copy hex"
            className="button"
          >
            Copy
          </button>
          {copyMessage && <p>Copied!</p>}

          <h4>{color.role}</h4>
          <p>contrast: {color.contrastText}</p>

          <button
            onClick={() => setIsEditing(true)}
            type="button"
            title="Edit"
            className="button"
          >
            Edit
          </button>
          {colorToDelete === color.id ? (
            <div
              className="color-card-highlight"
              style={{
                "--contrast-text": color.contrastText,
              }}
            >
              <p>Are you sure you want to delete this theme?</p>

              <button
                onClick={() => handleDeleteColor(color.id)}
                type="button"
                title="confirm-delete"
                className="button"
              >
                Delete
              </button>
              <button
                onClick={handleCancelDelete}
                type="button"
                title="cancel-delete"
                className="button"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => handleConfirmDelete(color.id)}
              type="button"
              title="delete"
              className="button"
            >
              Delete
            </button>
          )}
        </>
      )}
    </div>
  );
}
