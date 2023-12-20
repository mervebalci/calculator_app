function getStyleName(btn) {
  const className = {
    "=": "equals",
    "+": "opt",
    "-": "opt",
    "x": "opt",
    "÷": "opt",
    "C": "clear",
  }
  return className[btn]
}

export default function Button({ value }) {
  return (
    <button className={`${getStyleName(value)} button`}>{value}</button>
  )
}