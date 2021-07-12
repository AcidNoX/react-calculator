import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type OperatorType = "+" | "-" | "x" | "÷" | "=";

export interface CalculatorState {
    calculation: Array<{ operator: OperatorType | null, number: string }>
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
        total = doCalculation(total, Number.parseFloat(calc.number), operator);
    }

    state.calculation = [
        { number: Number.parseFloat(total.toFixed(10)).toString(), operator: null }
    ]
}

export const calculatorSlice = createSlice({
    name: 'calculator',
    initialState,
    reducers: {
        numberPress: (state, action: PayloadAction<number>) => {
            // If no entries add new items
            if (state.calculation.length === 0) {
                state.calculation.push({ operator: null, number: action.payload.toString() });
                return;
            }

            const last = state.calculation[state.calculation.length - 1];

            // If operator add new item
            if (!!last.operator) {
                state.calculation.push({ operator: null, number: action.payload.toString() });
                return;
            }

            // Only allow 10 numbers total
            if (last.number.length >= 10) return;

            last.number += action.payload.toString();
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
        },
        toggleSign: (state) => {
            if (state.calculation.length < 1) return;

            const last = state.calculation[state.calculation.length - 1];

            last.number = (Number.parseInt(last.number) * -1).toString();
        },
        clear: (state) => {
            state.calculation = [];
        },
        decimalPoint: (state) => {
            const last = state.calculation[state.calculation.length - 1];

            if (!last || last.operator !== null) {
                state.calculation.push({ operator: null, number: "0." });
                return;
            }

            if (last.number.indexOf(".") > -1) return;

            last.number += ".";
        },
        percentPress: (state) => {
            const last = state.calculation[state.calculation.length - 1];
            const prev = state.calculation[state.calculation.length - 2];

            if (!last || !prev || last.operator !== null) return;

            const prevNumber = Number.parseFloat(prev.number);
            const currNumber = Number.parseFloat(last.number);

            const newNumber = (prevNumber / 100) * currNumber;

            last.number = newNumber.toString();
        }
    },
})

export const { numberPress, operatorPress, toggleSign, clear, decimalPoint, percentPress } = calculatorSlice.actions

export const calculatorReducer = calculatorSlice.reducer;