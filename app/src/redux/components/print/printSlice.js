import { createSlice } from "@reduxjs/toolkit";

const printSlice = createSlice({
    name: "print",
    initialState: [
    ],
    reducers: {
        add(state, action) {
            const existingItem = state.find(item => item.SO === action.payload.SO)
            if (!existingItem) {
                state.push({
                    id: state.length + 1,
                    SO: action.payload.SO,
                    customer: action.payload.customer,
                    pages: action.payload.pages,
                    amount: action.payload.amount,
                    printed: false,
                    selected: false,
                    printedTime: null,
                    addedTime: Date.now()
                })
            }
        },
        update(state, action) {
            const existingItem = state.find(item => item.id === action.payload.id)
            if (existingItem.selected) {
                existingItem.printed = true,
                    existingItem.printedTime = Date.now()
            }
        },
        select(state, action) {
            const existingItem = state.find(item => item.id === action.payload.id)
            if (existingItem) {
                existingItem.selected = !existingItem.selected
            }
        }
    }
})

export const { add, update, select } = printSlice.actions;

export default printSlice.reducer