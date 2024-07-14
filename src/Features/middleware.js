// listenerMiddleware.js
import { createListenerMiddleware } from '@reduxjs/toolkit';
import { addUser, sendUserData } from './userSlice';
import { setAddress } from './cartSlice';

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
    actionCreator: addUser,
    effect: (action, { dispatch }) => {
        const { address } = action.payload;
        dispatch(setAddress(address));
    }
});

listenerMiddleware.startListening({
    actionCreator: sendUserData.fulfilled,
    effect: (action, { dispatch }) => {
        const { address } = action.payload.user;
        dispatch(setAddress(address));
    }
});

export default listenerMiddleware;
