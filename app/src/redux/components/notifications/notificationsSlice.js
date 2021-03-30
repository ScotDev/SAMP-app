import { createSlice } from "@reduxjs/toolkit";

const notificationsSlice = createSlice({
    name: "notifications",
    initialState: [{ id: 1, type: "default", msg: "Default title", details: "Default details" }],
    reducers: {
        create(state, action) {
            state.push({
                id: state.length + 1,
                type: action.payload.type,
                msg: action.payload.msg,
                details: action.payload.details
            });
        },
        removeOne(state, action) {
            // state.pop()
            return state.filter(item => item.id !== action.payload.id)
        },
        removeAll(state, action) {
            // state.pop()
            return state = { id: 1, type: "default", msg: "Default title", details: "Default details" }
        },
        removeFirst(state) {
            state.shift()
        },
    }
})

export const { create, removeOne, removeAll, removeFirst } = notificationsSlice.actions;

export default notificationsSlice.reducer