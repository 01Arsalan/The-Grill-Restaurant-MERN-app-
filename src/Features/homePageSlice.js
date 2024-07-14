import { createSlice, createAsyncThunk, } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    data: null,
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
}

export const fetchHomePageData = createAsyncThunk('homePage/fetchData', async () => {
    const response = await axios.get("/api/",{withCredentials:true})
    return response.data[0];
})

const homePageSlice = createSlice({
    name: "homePageData",
    initialState,
    reducers: {
        toggleUser(state,action){
            state.data.nav.userData.loggedIn=!state.data.nav.userData.loggedIn
        }
    },
    extraReducers(builder) {
        builder.addCase(fetchHomePageData.pending, (state, action) => {
            state.status = "loading"
        })
        builder.addCase(fetchHomePageData.fulfilled, (state, action) => {
            state.status = "suceeded"
            state.data = action.payload
        })
        builder.addCase(fetchHomePageData.rejected, (state, action) => {
            state.status = "failed"
            state.error = action.error.message;
        })
    }
})

export const {toggleUser} = homePageSlice.actions

export default homePageSlice.reducer;