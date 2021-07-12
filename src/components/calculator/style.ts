import { lighten } from "polished";
import styled from "styled-components";

export const Container = styled.div`
    background-color: #1d1d1d;
    border: thin solid #373737;
    border-radius: 2rem;
    box-shadow: 10px 10px 30px rgba(0,0,0,0.6);
    width: 300px;
    padding: 1rem;  
    display: flex;
    flex-direction: column;
`;

export const DisplayContainer = styled.div`
    background-color: #e0e4d2;
    height: 6rem;
    border-radius: 1.2rem;
    box-shadow: inset 0 0 6px rgba(0,0,0,0.5);
    display: flex;
    flex-direction: column;
    padding: 1rem;
    margin-bottom: 1rem;
    font-size: 2.2rem;
`;

export const DisplayChain = styled.div`
    font-size: 1rem;
    display: flex;
    justify-content: flex-end;
    min-height: 1.3rem;
`;
export const DisplayValue = styled.div`
    display: flex;
    justify-content: flex-end;  
`;

export const Buttons = styled.div`
    flex: 1;
    display: grid;
    grid-template-areas: "ac plusminus percent divide"
        "seven eight nine times"
        "four five six minus"
        "one two three plus"
        "zero zero dot equals";
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(5, 1fr);
    grid-gap: 0.5rem;
    border-radius: 1.2rem;
    overflow: hidden;
`;

const CalculatorButton = styled.button.attrs({ type: "button" })`
    height: 60.5px;
    width: 100%;
    border: none;
    cursor: pointer;
    font-size: 1.2rem;
`;

export const NumberButton = styled(CalculatorButton) <{ gridArea: string }>`
    grid-area: ${props => props.gridArea};
    background-color: #373737;
    color: #fff;

    &:active {
        background-color: ${lighten(0.05, "#373737")}
    }
`;
export const OperatorButton = styled(CalculatorButton) <{ gridArea: string }>`
    grid-area: ${props => props.gridArea};
    background-color: #4f46e5;
    color: #fff;

    &:active {
        background-color: ${lighten(0.05, "#4f46e5")}
    }
`;
export const OtherButton = styled(CalculatorButton) <{ gridArea: string }>`
    grid-area: ${props => props.gridArea};
    background-color: #e2e2e2;

    &:active {
        background-color: ${lighten(0.05, "#e2e2e2")}
    }
`;