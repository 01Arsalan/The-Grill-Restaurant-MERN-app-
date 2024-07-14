import { configureStore } from '@reduxjs/toolkit';
import homePageReducer from './Features/homePageSlice';
import cartSlice from './Features/cartSlice';
import userSlice from './Features/userSlice';
import listenerMiddleware from './Features/middleware';


// const store = configureStore({
//   reducer: {
//     homePage: homePageReducer,
//     cart: cartSlice,
//     user:userSlice
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(listenerMiddleware.middleware),

// });


// takes non-seralizable values in reducers and hides the warning
const store = configureStore({
  reducer: {
    homePage: homePageReducer,
    cart: cartSlice,
    user: userSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['cartSlice/addItem'],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['payload.item'],
        // Ignore these paths in the state
        ignoredPaths: ['cart.items'],
      },
    }).concat(listenerMiddleware.middleware),
});

export default store;
