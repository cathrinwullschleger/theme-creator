// User gibt Werte ein -> ColotInput ->handleChance -> calls onChange -> new values via onChange in ColorForm with state (hex,constrastText)

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
