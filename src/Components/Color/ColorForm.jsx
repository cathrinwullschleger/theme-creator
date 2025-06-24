// 1. function addColor mit 3 States (role (if keine Eingabe ->hex), hex und contrastText )
// 2. function handleAddColor (event)

import "./Colorform.css";

export default function ColorForm({ onAddColor }) {
  function handleAddColor(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    // const roleValue = event.target.role.value;
    // const hexValue = event.target.hex.value;
    // const contrastTextValue = event.target.contrastText.value;

    // setRole(roleValue);
    // setHex(hexValue);
    // setContrastText(contrastTextValue);

    onAddColor(data);

    event.target.reset();
  }

  return (
    <div>
      <form onSubmit={handleAddColor} aria-labelledby="theme-creator">
        <label htmlFor="hex"></label>
        <input id="hex" type="color" name="hex" placeholder="#BFD4F9"></input>
        <label htmlFor="role"></label>
        <input
          id="role"
          type="text"
          name="role"
          placeholder="Cornflower"
        ></input>
        <label htmlFor="contrastText"></label>
        <input
          id="contrastText"
          type="color"
          name="contrastText"
          placeholder="##3D281C"
        ></input>
        <button type="submit">Add Theme</button>
      </form>
    </div>
  );
}
