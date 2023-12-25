import { useContext } from "react"
import { CalcContext } from "../context/CalcContext"

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
  const { calc, setCalc } = useContext(CalcContext);

  // When user clicks on decimal point button
  function decimalClick() {
    setCalc({...calc, number: !calc.number.toString().includes('.') ? calc.number + value : calc.number})
  }

  // When user clicks on clear button
  function clearClick() {
    setCalc({sign: '', number: 0, result: 0})
  }

  // When user clicks on the number 0-9 buttons
  function handleNumberButton() {
    const numberString = value.toString()

    let numberValue;
    if (numberString === '0' && calc.number === 0) {
      numberValue = '0'
    } else {
      numberValue = Number(calc.number + numberString)
    }

    setCalc({...calc, number: numberValue})
  }

  // When user clicks on any operation buttons
  function optClick() {
    setCalc({
      sign: value, 
      result: !calc.result && calc.number ? calc.number : calc.result,
      number: 0
    })
  }

  // When user clicks on equals button
  function equalsClick() {
    if (calc.result && calc.number) {
      function math(a, b, sign) {
        const result = {
          '+': (a, b) => a + b,
          '-': (a, b) => a - b,
          'x': (a, b) => a * b,
          '÷': (a, b) => a / b,
        }
        return result[sign](a, b);
      }
      setCalc({
        result: math(calc.result, calc.number, calc.sign),
        sign: '',
        number: 0,
      })
    }
  }

  // When user clicks on percent button
  function percentClick() {
    setCalc({
      number: (calc.number / 100),
      result: (calc.result / 100),
      sign: '',
    })
  }

  // When user clicks on "+/-" button
  function invertClick() {
    setCalc({
      number: calc.number ? calc.number * -1 : 0,
      result: calc.result ? calc.result * -1 : 0,
      sign: '',
    })
  }

  function handleBtnClick() {
    const results = {
      '.': decimalClick,
      'C': clearClick,
      '+': optClick,
      '-': optClick,
      'x': optClick,
      '÷': optClick,
      '=': equalsClick,
      '%': percentClick,
      '+/-': invertClick,
    }
    if (results[value]) {
      return results[value]()
    } else {
        return handleNumberButton()
    }
  }

  return (
    <button onClick={handleBtnClick} className={`${getStyleName(value)} button`}>{value}</button>
  )
}