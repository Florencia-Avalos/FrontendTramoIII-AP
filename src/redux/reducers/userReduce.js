import { createReducer } from "@reduxjs/toolkit";
import {userRegister,signUp,signIn,logOut,signInToken} from '../actions/userAction.js'

const initialState = {
  user: null,
  token : null,
}

export const userReducer = createReducer( initialState, ( builder ) => 
    builder
        .addCase( userRegister, ( stateActual, action ) => {
            return {
              ...stateActual,
              user : action.payload
            }
        })

        .addCase(signUp.fulfilled,(stateActual, action)=>{
            return{
                ...stateActual,
                user : action.payload.user,
                token : action.payload.token 
            }
        })

        .addCase(signIn.fulfilled,(stateActual, action)=>{
          return{
              ...stateActual,
              user : action.payload.user,
              token : action.payload.token
          }
      })

      .addCase( signInToken.fulfilled, (stateActual, action) => {
        return {
            ...stateActual,
            user : action.payload.user,
            token : action.payload.token
        }
    } )

      .addCase( logOut, (stateActual,action) => {
        return  {
            ...stateActual,
            user : action.null,
            token : action.null
        }
    } )

    
      
      
      )