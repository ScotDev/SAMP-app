import { createSlice } from "@reduxjs/toolkit";

const notificationsSlice = createSlice({
    name: "notifications",
    initialState: [{ id: 0, type: "default", msg: "Default title", details: "Default details" }],
    reducers: {
        create(state, action) {
            state.push({
                id: state.length + 1,
                type: action.payload.type,
                msg: action.payload.msg,
                details: action.payload.details
            });
        },
        remove(state, action) {
            state.shift()
            // const existingItem = state.find(item => item.id === action.payload.id)
            // if (existingItem) {
            //     existingItem.remove
            // }
        },
    }
})

export const { create, remove } = notificationsSlice.actions;

export default notificationsSlice.reducer