import Button from "../extras/button/button.component";

const CalculatorPad = (props) => {

    const { allClear, clickHandler } = props;
    const padHandler = (type, value) => {
        clickHandler(type, value)
    }

    return(
        <div className="calculator-pad">
            <div className="pad-left">
                {/* numeric */}
                <Button type="num" className="btn-num flex-span-2" label={'0'} value={"0"} onClick={padHandler}/>
                {/* fx */}
                <Button type="fx" label={'.'} value={"."} onClick={padHandler}/>
                
                {/* numeric */}
                <Button className="btn-num" type="num" label={'1'} value={"1"} onClick={padHandler}/>
                <Button className="btn-num" type="num" label={'2'} value={"2"} onClick={padHandler}/>
                <Button className="btn-num" type="num" label={'3'} value={"3"} onClick={padHandler}/>
                <Button className="btn-num" type="num" label={'4'} value={"4"} onClick={padHandler}/>
                <Button className="btn-num" type="num" label={'5'} value={"5"} onClick={padHandler}/>
                <Button className="btn-num" type="num" label={'6'} value={"6"} onClick={padHandler}/>
                <Button className="btn-num" type="num" label={'7'} value={"7"} onClick={padHandler}/>
                <Button className="btn-num" type="num" label={'8'} value={"8"} onClick={padHandler}/>
                <Button className="btn-num" type="num" label={'9'} value={"9"} onClick={padHandler}/>
                
                {/* fx */}
                <Button className="btn-fx" type="fx" label={allClear?'AC':'C'} value={allClear?'AC':'C'} onClick={padHandler}/>
                <Button className="btn-fx" type="fx" label={'±'} value={'+/-'} onClick={padHandler}/>
                <Button className="btn-fx" type="fx" label={'%'} value={'%'} onClick={padHandler}/>
            </div>

            <div className="pad-right">
                {/* operators */}
                <Button className="btn-opr" type="opr" label={'÷'} value={'/'} onClick={padHandler}/>
                <Button className="btn-opr" type="opr" label={'×'} value={'*'} onClick={padHandler}/>
                <Button className="btn-opr" type="opr" label={'-'} value={'-'} onClick={padHandler}/>
                <Button className="btn-opr" type="opr" label={'+'} value={'+'} onClick={padHandler}/>
                <Button className="btn-opr" type="opr" label={'='} value={'='} onClick={padHandler}/>
            </div>

      </div>
    )
}

export default CalculatorPad;