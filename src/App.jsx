// import {React} from 'react';
import {useCallback, useEffect, useState} from 'react';
import CalculatorDisplay from './components/calculator-display/calculator-display.component';
import CalculatorPad from './components/calculator-pad/calculator-pad.component';
import { Operations, KeyType } from './components/extras/Constants';
import './App.css';

const App = () => {

  const [collectedResult, setCollectedResult] = useState(null);
  const [displayValue, setDisplayValue] = useState("0");
  const [currentOperator, setCurrentOperator] = useState(null);
  const [expectsOperand, setExpectsOperand] = useState(false);

  const isScreenClear = displayValue === "0";

  
  const handleClickNumericKey = useCallback(value => {
    if (expectsOperand)
    {
      setDisplayValue(String(value));
      setExpectsOperand(false);
    }
    else{
      setDisplayValue(displayValue === "0" ? String(value) : displayValue + value);
    }
  }, [displayValue, expectsOperand])

  const addDecimal = useCallback(() => {
    if (expectsOperand) 
    {
      setDisplayValue("0.");
    }
    else {
      if (!displayValue.includes("."))
      setDisplayValue(displayValue + ".");
    }
   setExpectsOperand(false);
  }, [displayValue, expectsOperand])

  const changeSign = useCallback(() => {
    setDisplayValue(String(-parseFloat(displayValue)));
  }, [displayValue])

  const percentage = useCallback(() => {
    setDisplayValue(String(parseFloat(displayValue)/100))
  }, [displayValue])

  const handleClickFunctionKey = useCallback(value => {
    switch(value) {
      case "AC"   : allClear();break; 
      case "C"    : clearScreen();break; 
      case "+/-"  : changeSign();break; 
      case "%"    : percentage();break; 
      case "."    : addDecimal();break; 
      default:
    }
  }, [addDecimal, changeSign, percentage])

  const handleClickOperatorKey = useCallback(value => {
    const inputValue = parseFloat(displayValue);
    console.log(currentOperator)
    // for first input
    if(collectedResult === null)
    {
      setCollectedResult(inputValue);
    }
    else{
      if(currentOperator)
      {
        const computationResult = compute(currentOperator, collectedResult, inputValue);
        setCollectedResult(computationResult);
        
      }
    }
    setExpectsOperand(()=>true);
    setCurrentOperator(()=>value)
  }, [collectedResult, currentOperator, displayValue])

  

  const clearLastDigit = useCallback(() => {
    if (displayValue !== "0")
      if (displayValue.length === 1)
         setDisplayValue(()=>"0");
      else {
        setDisplayValue(()=>displayValue.substring(0, displayValue.length - 1));
      }
  },[displayValue])

  const handleKeyDown = useCallback((e) => {
    const keyString = e.key;
    
    if(KeyType.NUM.includes(keyString))
    {
      handleClickNumericKey(keyString);
    }
    else if(KeyType.FX.includes(keyString))
    {
      handleClickFunctionKey(keyString);
    }
    else if(KeyType.OPR.includes(keyString))
    {
      handleClickOperatorKey(keyString);
    }
    else
    {
      if (keyString === 'Backspace')
      {
        clearLastDigit();
      }
      else if(keyString === 'Escape')
      {
        allClear();
      }
      else if(keyString === 'Enter'){
        handleClickOperatorKey("=")
      }
    }
  }, [handleClickNumericKey, handleClickFunctionKey, handleClickOperatorKey, clearLastDigit])


  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown',handleKeyDown);
    }, [handleKeyDown]);

  useEffect(()=>{
    if(expectsOperand)
    {
      setDisplayValue(()=>String(collectedResult));
    }
  }, [collectedResult, expectsOperand])

  const calculatorHandler = (eventType, value) => {
    switch(eventType) {
      case "fx"   : handleClickFunctionKey(value);break;
      case "num"  : handleClickNumericKey(value);break;
      case "opr"  : handleClickOperatorKey(value);break;
      default:
    }
  }

  const allClear = () => {
    setCollectedResult(null);
    setDisplayValue("0");
    setCurrentOperator(null);
    setExpectsOperand(false);
  }
  
  const clearScreen = () => {
    setDisplayValue("0");
  }

  const compute = (operator, collectedValue, inputValue) => {
    switch(operator){
      case Operations.ADD       : return collectedValue + inputValue;
      case Operations.SUBTRACT  : return collectedValue - inputValue;
      case Operations.MULTIPLY  : return collectedValue * inputValue;
      case Operations.DIVIDE    : return collectedValue / inputValue;
      case Operations.EQUALS    : return inputValue;
      default:
    }
  }

  return(
    <div className="app-root">
      <div className="calculator-container">
        <CalculatorDisplay value={displayValue}/>
        <CalculatorPad allClear={isScreenClear} clickHandler={calculatorHandler}/>
      </div>
    </div>
  )
}

export default App;
