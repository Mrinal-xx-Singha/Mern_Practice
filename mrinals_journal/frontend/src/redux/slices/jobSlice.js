import { createSlice, createAsyncThunk, __DO_NOT_USE__ActionTypes } from "@reduxjs/toolkit"
import axios from "axios"
import { API_BASE_URL } from "../../config/api"


export const fetchJobs = createAsyncThunk("jobs/fetchAll", async (__DO_NOT_USE__ActionTypes, thunkAPI) => {
    try {
        const res = await axios.get(`${API_BASE_URL}/api/jobs`)
        return res.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.error || "Failed to fetch jobs")


    }
})


const jobSlice = createSlice({
    name: "jobs",
    initialState: {
        jobs: [],
        status: "idle",
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.
            addCase(fetchJobs.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchJobs.fulfilled, (state, action) => {
                state.status = "succeeded"
                state.jobs = action.payload
            })
            .addCase(fetchJobs.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload
            })
    }
})

export default jobSlice.reducer