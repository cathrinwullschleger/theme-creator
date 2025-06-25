// //[User Input]
//     ↓
// [ColorInput.handleChange()]
//     ↓
// [ColorInput calls onChange(newValue)]
//     ↓
// [Parent component updates state via setState(newValue)]
//     ↓
// [React re-renders Parent & passes new state as prop to ColorInput]
//     ↓
// [ColorInput receives new value via props and updates UI]

export default function ColorInput({ value, onChange, id, name }) {
  function handleChange(event) {
    onChange(event.target.value); // onChange aufrufen mit neuen werten
  }

  return (
    <>
      <input
        type="text"
        id={id}
        name={name}
        value={value}
        onChange={handleChange} // handleChange wird getriggert
        placeholder="#BFD4F9"
      />
      <input type="color" value={value} onChange={handleChange}></input>
    </>
  );
}
