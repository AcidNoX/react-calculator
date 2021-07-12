import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type OperatorType = "+" | "-" | "x" | "÷" | "=";

export interface CalculatorState {
    calculation: Array<{ operator: OperatorType | null, number: number }>
}

const initialState: CalculatorState = {
    calculation: [],
}

const doCalculation = (a: number, b: number, operator: OperatorType): number => {
    switch (operator) {
        case "+":
            return a + b;
        case "-":
            return a - b;
        case "x":
            return a * b;
        case "÷":
            return a / b
        default:
            return a;
    }
}

const evaluate = (state: CalculatorState) => {
    let total = 0

    for (let calc of state.calculation) {
        const previous = state.calculation[state.calculation.indexOf(calc) - 1];
        const operator = previous?.operator || "+";
        total = doCalculation(total, calc.number, operator);
    }

    state.calculation = [
        { number: total, operator: null }
    ]
}

export const calculatorSlice = createSlice({
    name: 'calculator',
    initialState,
    reducers: {
        numberPress: (state, action: PayloadAction<number>) => {
            // If no entries add new items
            if (state.calculation.length === 0) {
                state.calculation.push({ operator: null, number: action.payload });
                return;
            }

            const last = state.calculation[state.calculation.length - 1];

            // If operator add new item
            if (!!last.operator) {
                state.calculation.push({ operator: null, number: action.payload });
                return;
            }

            // Parse to string, append new number and update entry
            let numberString = last.number.toString();
            numberString += action.payload.toString();

            state.calculation[state.calculation.length - 1].number = Number.parseInt(numberString);
        },
        operatorPress: (state, action: PayloadAction<OperatorType>) => {
            if (action.payload === "=") {
                evaluate(state);
                return;
            }

            // If no entries add new items
            if (state.calculation.length === 0) {
                return;
            }

            // Replace operator
            state.calculation[state.calculation.length - 1].operator = action.payload;
        }
    },
})

export const { numberPress, operatorPress } = calculatorSlice.actions

export const calculatorReducer = calculatorSlice.reducer;