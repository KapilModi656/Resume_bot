import { configureStore } from '@reduxjs/toolkit';

import chatHistoryReducer from '../Slicing/Slicing';

const store = configureStore({
    reducer: {
        chatHistory: chatHistoryReducer,
    },
});

export default store;
