import { createSlice } from "@reduxjs/toolkit";

const rootSlice = createSlice({
    name: "root",
    initialState: {
        name: "Name",
        origin: "Origin",
        special_move: "Special Move"
    },
    reducers: {
        // Action to set the name of the fighter
        chooseName: (state, action) => { state.name = action.payload },
        // Action to set the origin of the fighter
        chooseOrigin: (state, action) => { state.origin = action.payload },
        // Action to set the special move of the fighter
        chooseSpecialMove: (state, action) => { state.special_move = action.payload },
    }
})

export const reducer = rootSlice.reducer;
export const { chooseName, chooseOrigin, chooseSpecialMove } = rootSlice.actions;
