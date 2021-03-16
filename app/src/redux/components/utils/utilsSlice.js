import { createSlice } from "@reduxjs/toolkit";

const utilsSlice = createSlice({
    name: "utils",
    initialState: {
        isPrinting: false,
        isUpdating: false,
        showPrintModal: false,
        lastUpdated: Date.now()
    }
    ,
    reducers: {
        toggle(state, action) {
            state.isPrinting = action.payload.isPrinting,
                state.showPrintModal = action.payload.showPrintModal
        },
        update(state) {
            state.lastUpdated = Date.now(),
                state.isUpdating = !state.isUpdating
        }
    }
})

export const { toggle, update } = utilsSlice.actions;

export default utilsSlice.reducer