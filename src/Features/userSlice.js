import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const logoutUser = createAsyncThunk(
    'user/logoutUser',
    async (_, thunkAPI) => {
        try {
            await axios.post('/api/user/logout');
            return true;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

const sendData = async (endpoint, userData, getState, rejectWithValue) => {
    try {
        const state = getState();
        const { phone, _id } = state.user.user;
        const dataToSend = { ...userData, phone};
        
        if (endpoint=="/api/user/updateuser") {

            dataToSend._id = _id;
        }

        const response = await axios.post(endpoint, dataToSend, { withCredentials: true});
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
};

export const sendUserData = createAsyncThunk(
    'user/sendUserData',
    (userData, thunkAPI) => sendData('/api/user/saveuser', userData, thunkAPI.getState, thunkAPI.rejectWithValue)
);

export const sendUpdatedUserData = createAsyncThunk(
    'user/sendUpdatedUserData',
    (userData, thunkAPI) => sendData('/api/user/updateuser', userData, thunkAPI.getState, thunkAPI.rejectWithValue)
);

const initialState = {
    user: {
        _id: null,
        fullName: null,
        email: null,
        address: null,
        gender: null,
        dateOfBirth: null,
        phone: null
    },
    isUser: false,
    status: 'idle',
    error: null
};

const userSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {
        addUser(state, action) {
            const { _id, fullName, email, address, gender, dateOfBirth, phone } = action.payload;
            state.user = {
                _id,
                fullName,
                email,
                address,
                gender,
                dateOfBirth,
                phone
            };
            state.isUser = true;
        },
        addPhone(state, action) {
            state.user.phone = action.payload;
        },
        clearUser(state) {
            state.user = {
                _id: null,
                fullName: null,
                email: null,
                address: null,
                gender: null,
                dateOfBirth: null,
                phone: null,
                orders: []
            };
            state.isUser = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(sendUserData.pending, (state) => {
                state.status = 'sending';
            })
            .addCase(sendUserData.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload.user;
                state.isUser = true;
            })
            .addCase(sendUserData.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(sendUpdatedUserData.pending, (state) => {
                state.status = 'sending';
            })
            .addCase(sendUpdatedUserData.fulfilled, (state, action) => {
                state.status = 'succeeded';

                state.user = action.payload.user;
                state.isUser = true;
            })
            .addCase(sendUpdatedUserData.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = initialState.user;
                state.isUser = false;
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.error = action.payload;
            });
    }
});

export const { addUser, addPhone, clearUser } = userSlice.actions;
export default userSlice.reducer;
