import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

export const userRegister = createAction( 'user_register', (user) => {
  return {
    
    payload : user
  }
} )

export const signUp = createAsyncThunk( "create_user", async ( body ) => {
  try {
      const response = await axios.post( 'http://localhost:3000/api/verification/signup', body )
      localStorage.setItem( 'token', response.data.token )
      console.log(response.data.token);
      return response.data
  } catch (error) {
      console.log( error )
  }
} )

export const signIn = createAsyncThunk("log_user", async (body) => {
  try {
    const response = await axios.post('http://localhost:3000/api/verification/signin', body);
    localStorage.setItem('token', response.data.token);
   
 
    return response.data.userResponse
    ; 
  } catch (error) {
    console.log(error)
    return error.response.data
   
  }
} )

export const logOut = createAction( "log_out", async () => {
  localStorage.removeItem('token')
        return {
            payload : null
        }
} )

export const signInToken = createAsyncThunk("token_login", async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post('http://localhost:3000/api/verification/signin/token', {}, {
      headers: {
        Authorization: "Bearer " + token
      }
    });

   
    return response.data.userData;
  } catch (error) {
    console.log( error )
}
} )