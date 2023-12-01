import { configureStore } from '@reduxjs/toolkit'
import { userReducer } from './reducers/userReduce.js';
import postReducer from './reducers/postReduce.js';


const store= configureStore({
  reducer:{
    postReducer : postReducer,
    users : userReducer
  }
})

export default store;