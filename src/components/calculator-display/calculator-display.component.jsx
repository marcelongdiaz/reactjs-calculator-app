import { useLayoutEffect } from "react";
import { useEffect } from "react";

const CalculatorDisplay = (props) => {

    const { value } = props;

    const screenResizeHandler = (e) => {
        console.log('resizing')
    }

    // useLayoutEffect(()=>{
    //     document.getElementById("")
    // })
    return(
        <div className="calculator-screen">
            <div onResize={screenResizeHandler}>{value}</div> 
        </div>
    )
}

export default CalculatorDisplay;