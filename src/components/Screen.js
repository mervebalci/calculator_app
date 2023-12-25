import { useContext } from "react";
import { CalcContext } from "../context/CalcContext";
import { Textfit } from "react-textfit";

export default function Screen() {
  const { calc } = useContext(CalcContext);
  
  return (
    <Textfit className="screen" max={70} mode="single">{calc.number ? calc.number : calc.result}</Textfit>
  )
}