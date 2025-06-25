import "./Color.css";
import ColorInput from "./ColorInput";

export default function Color({
  color,
  handleEditColor,
  editColor,
  onUpdateColor,
  role,
  setRole,
  hex,
  setHex,
  contrastText,
  setContrastText,
}) {
  const isEditing = editColor?.id === color.id;

  return (
    <div
      className="color-card"
      style={{
        background: color.hex,
        color: color.contrastText,
      }}
    >
      {isEditing ? (
        <form
          onSubmit={(event) => {
            event.preventDefault();
            const updatedColor = {
              id: color.id,
              role,
              hex,
              contrastText,
            };
            onUpdateColor(updatedColor);
          }}
        >
          <label htmlFor="hex">Backgroundcolor</label>
          <ColorInput id="hex" name="hex" value={hex} onChange={setHex} />

          <label htmlFor="role">Name of Theme</label>
          <input
            id="role"
            name="role"
            type="text"
            value={role}
            onChange={(event) => setRole(event.target.value)}
          />

          <label htmlFor="contrastText">Fontcolor</label>
          <ColorInput
            id="contrastText"
            name="contrastText"
            value={contrastText}
            onChange={setContrastText}
          />

          <button type="submit">Update Theme</button>
        </form>
      ) : (
        // normaler modus
        <>
          <h3 className="color-card-headline">{color.hex}</h3>
          <h4>{color.role}</h4>
          <p>contrast: {color.contrastText}</p>
          <button
            onClick={() => handleEditColor(color.id)}
            type="button"
            title="Edit"
          >
            Edit
          </button>
        </>
      )}
    </div>
  );
}
