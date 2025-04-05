const initialState = {
    chatHistory: [],
  };
  
  const chatHistoryReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_MESSAGE':
        console.log('Previous State:', state);
        console.log('Action Payload:', action.payload);
        return {
          ...state,
          chatHistory: [...state.chatHistory, action.payload],
        };
      default:
        return state;
    }
  };
  
  export default chatHistoryReducer;
