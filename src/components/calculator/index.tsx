import numberToWord from "number-to-words";
import React from "react";
import { useDispatch, useSelector } from 'react-redux';

import { OperatorType, numberPress, operatorPress } from "../../redux/slices/calculator-slice";
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

    return (
        <Container>
            <DisplayContainer>
                <DisplayChain>{calculation.map(c => [c.number, c.operator].filter(x => x).join(" ")).join(" ")}</DisplayChain>
                <DisplayValue>{calculation.length > 0 ? calculation[calculation.length - 1].number : 0}</DisplayValue>
            </DisplayContainer>
            <Buttons>
                <OtherButton gridArea="ac">AC</OtherButton>
                <OtherButton gridArea="plusminus">+/-</OtherButton>
                <OtherButton gridArea="percent">%</OtherButton>
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
                <NumberButton gridArea="dot">.</NumberButton>
            </Buttons>
        </Container>

    );
};