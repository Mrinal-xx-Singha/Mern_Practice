import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { API_BASE_URL } from "../../config/api"
import axios from "axios"

axios.defaults.withCredentials = true
const BASE = `${API_BASE_URL}/api/notifications`

export const fetchNotifications = createAsyncThunk("notifications/fetch",
    async (_, thunkAPI) => {
        try {
            const res = await axios.get(BASE)
            return res.data
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data?.error || "Failed")
        }
    }
)

export const markOneRead = createAsyncThunk(
    "notifications/markOneRead",
    async (id, thunkAPI) => {
        try {
            await axios.patch(`${BASE}/${id}/read`)
            return id
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data?.error || "Failed")
        }
    }
)


export const markAllRead = createAsyncThunk(
    "notifications/markAllRead",
    async (_, thunkAPI) => {
        try {
            await axios.patch(`${BASE}/read-all`)

        } catch (err) {

            return thunkAPI.rejectWithValue(err.response?.data?.error || "Failed")
        }
    }
)

export const deleteOne = createAsyncThunk(
    "notifications/deleteOne",
    async (id, thunkAPI) => {
        try {
            await axios.delete(`${BASE}/${id}`)
            return id
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data?.error || "Failed")
        }
    }
)

const notificationSlice = createSlice({
    name: "notifications",
    initialState: {
        items: [],
        unreadCount: 0,
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchNotifications.pending, (state) => { state.loading = true })
            .addCase(fetchNotifications.fulfilled, (state, action) => {
                state.loading = false
                state.items = action.payload.notifications;
                state.unreadCount = action.payload.unreadCount
            })
            .addCase(fetchNotifications.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })


        builder.addCase(markOneRead.fulfilled, (state, action) => {
            const notif = state.items.find((n) => n._id === action.payload)
            if (notif && !notif.read) {
                notif.read = true
                state.unreadCount = Math.max(0, state.unreadCount - 1)
            }
        })

        builder.addCase(markAllRead.fulfilled, (state) => {
            state.items.forEach((n) => (n.read = true))
            state.unreadCount = 0
        })

        builder.addCase(deleteOne.fulfilled, (state, action) => {
            const removed = state.items.find((n) => n._id === action.payload)
            if (removed && !removed.read) {
                state.unreadCount = Math.max(0, state.unreadCount - 1)
            }
            state.items = state.items.filter((n) => n._id !== action.payload)


        })

    }
})

export default notificationSlice.reducer