import numberToWord from "number-to-words";
import React, { useMemo } from "react";
import { useDispatch, useSelector } from 'react-redux';

import { OperatorType, clear, decimalPoint, numberPress, operatorPress, percentPress, toggleSign } from "../../redux/slices/calculator-slice";
import { RootState } from "../../redux/store";
import { Buttons, Container, DisplayChain, DisplayContainer, DisplayValue, NumberButton, OperatorButton, OtherButton } from "./style";

interface CalculatorProps {

}

const numbers = Array.from({ length: 10 }).map((_, i) => ({
    number: i,
    area: numberToWord.toWords(i)
}));

const operators: Array<{ operator: OperatorType, area: string }> = [
    { operator: "÷", area: "divide" },
    { operator: "x", area: "times" },
    { operator: "-", area: "minus" },
    { operator: "+", area: "plus" },
    { operator: "=", area: "equals" },
]

export const Calculator: React.FC<CalculatorProps> = () => {

    const dispatch = useDispatch();
    const calculation = useSelector((state: RootState) => state.calculator.calculation);

    // Compute display chain
    const chain = useMemo(() => {
        // Only show if calc chain greater that one or an operator has been pressed
        if (calculation.length === 1 && calculation[0].operator === null) return;

        return calculation
            .map(c => [c.number, c.operator].filter(x => x).join(" "))
            .join(" ");

    }, [calculation]);

    return (
        <Container>
            <DisplayContainer>
                <DisplayChain>{chain}</DisplayChain>
                <DisplayValue>{calculation.length > 0 ? calculation[calculation.length - 1].number : 0}</DisplayValue>
            </DisplayContainer>
            <Buttons>
                <OtherButton gridArea="ac" onClick={() => dispatch(clear())}>AC</OtherButton>
                <OtherButton gridArea="plusminus" onClick={() => dispatch(toggleSign())}>+/-</OtherButton>
                <OtherButton gridArea="percent" onClick={() => dispatch(percentPress())}>%</OtherButton>
                {operators.map(({ operator, area }) => (
                    <OperatorButton
                        key={operator}
                        gridArea={area}
                        onClick={() => dispatch(operatorPress(operator))}>
                        {operator}
                    </OperatorButton>
                ))}
                {numbers.map(({ number, area }) => (
                    <NumberButton
                        key={number}
                        gridArea={area}
                        onClick={() => dispatch(numberPress(number))}>
                        {number}
                    </NumberButton>
                ))}
                <NumberButton gridArea="dot" onClick={() => dispatch(decimalPoint())}>.</NumberButton>
            </Buttons>
        </Container>

    );
};