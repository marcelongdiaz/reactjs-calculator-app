import { useEffect, useState } from "react";

const CalculatorDisplay = (props) => {

    const { value } = props;
    const [formattedValue, setFormattedValue] = useState(value);

    // thousand separator
    useEffect(()=>{
        let separatedResult = parseFloat(value).toLocaleString('en-US', {
            useGrouping: true,
            maximumFractionDigits: 6
        })
        setFormattedValue(separatedResult)

    }, [value])

    //autoscaling feature for display
    useEffect(()=>{
        let scaledContent = document.getElementById("formatted-value")
        let scaledWrapper = document.getElementById("calc-screen")
        scaledContent.style.transform = 'scale(1, 1)';

        let { width: cw, height: ch } = scaledContent.getBoundingClientRect();
        let { width: ww, height: wh } = scaledWrapper.getBoundingClientRect();

        let scaleAmtX = Math.min(ww / cw, wh / ch);
        let scaleAmtY = scaleAmtX;
        
        scaledContent.style.transform = `scale(${scaleAmtX}, ${scaleAmtY})`;
    }, [formattedValue])

    return(
        <div className="calculator-screen" id="calc-screen">
            <div id="formatted-value">{formattedValue}</div> 
        </div>
    )
}

export default CalculatorDisplay;