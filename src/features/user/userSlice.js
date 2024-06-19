import { createSlice } from "@reduxjs/toolkit";

/* eslint no-unused-vars: 0 */
const userSlice = createSlice({
    name: "user",
    initialState: null,
    reducers: {
        setUser(state, action) {
            return action.payload;
        },
        removeUser(state, action) {
            return null;
        },
    },
});

export const initializeUser = () => {
    return async (dispatch) => {
        // const
    }
}

export default userSlice.reducer;
export const { setUser, removeUser } = userSlice.actions;
