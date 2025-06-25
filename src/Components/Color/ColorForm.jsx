// 1. function addColor mit 3 States (role (if keine Eingabe ->hex), hex und contrastText )
// 2. function handleAddColor (event)

//import "./Colorform.css";
import ColorInput from "./ColorInput.jsx";
import { uid } from "uid";

export default function ColorForm({
  onAddColor, // function from parent to add color
  hex,
  setHex,
  contrastText,
  setContrastText,
  role,
  setRole,
}) {
  function handleAddColor(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    data.id = uid();
    if (!data.role) {
      data.role = data.hex; //Fallback auf hex wert als Name/Role
    }

    // const roleValue = event.target.role.value;
    // const hexValue = event.target.hex.value;
    // const contrastTextValue = event.target.contrastText.value;

    // setRole(roleValue);
    // setHex(hexValue);
    // setContrastText(contrastTextValue);

    console.log(data);
    onAddColor(data); // übergibt neues Theme an paren Komponente

    setHex(""); // reset formular
    setRole("");
    setContrastText("");
  }

  return (
    <div>
      <form onSubmit={handleAddColor} aria-label="theme-creator">
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
        <button type="submit">Add Theme</button>
      </form>
    </div>
  );
}
