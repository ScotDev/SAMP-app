import { createSlice } from "@reduxjs/toolkit";

const printSlice = createSlice({
    name: "print",
    initialState: [{
        id: 1,
        SO: "SO123456",
        pages: 3,
        printed: false,
        selected: false
    },
    {
        id: 2,
        SO: "SO123593",
        pages: 1,
        printed: false,
        selected: false
    },
    {
        id: 3,
        SO: "SO123298",
        pages: 2,
        printed: true,
        selected: false
    }
    ],
    reducers: {
        add(state, action) {
            state.push({
                id: state.length + 1,
                SO: action.payload.SO,
                pages: action.payload.pages,
                printed: action.payload.printed
            })
        },
        // update(state, action) {
        //     state({
        //         id: action.payload.id,
        //         SO: action.payload.SO,
        //         pages: action.payload.pages,
        //         printed: action.payload.printed
        //     })
        // },
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