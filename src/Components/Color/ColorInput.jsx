export default function ColorInput({ value, onChange, id, name }) {
  function handleChange(event) {
    onChange(event.target.value);
  }

  return (
    <>
      <input
        type="text"
        id={id}
        name={name}
        value={value}
        onChange={handleChange}
        placeholder="#BFD4F9"
      />
      <input type="color" value={value} onChange={handleChange}></input>
    </>
  );
}
