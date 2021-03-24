import { createSlice } from "@reduxjs/toolkit";

const utilsSlice = createSlice({
    name: "utils",
    initialState: {
        isPrinting: false,
        isUpdating: false,
        showPrintModal: false,
        lastUpdated: Date.now(),
        showNotification: false,
        notificationType: "default",
        notificationMsg: "hello",
        notificationMsgDetails: ""
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
        },
        toggleNotification(state, action) {
            state.showNotification = !state.showNotification,
                state.notificationType = action.payload.type,
                state.notificationMsg = action.payload.msg,
                state.notificationMsgDetails = action.payload.details
        }
    }
})

export const { toggle, update, toggleNotification } = utilsSlice.actions;

export default utilsSlice.reducer