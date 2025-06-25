import "./Color.css";
import ColorForm from "./ColorForm";

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
  handleCancel,
  handleDeleteColor,
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
      {isEditing ? ( // bearbeitungsmodus wird so in der colorcard angezeigt
        <ColorForm
          hex={hex}
          setHex={setHex}
          contrastText={contrastText}
          setContrastText={setContrastText}
          role={role}
          setRole={setRole}
          editColor={editColor}
          onUpdateColor={onUpdateColor}
          onCancel={handleCancel}
        ></ColorForm>
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
          <button
            onClick={() => handleDeleteColor(color.id)}
            type="button"
            title="delete"
          >
            Delete
          </button>
        </>
      )}
    </div>
  );
}
