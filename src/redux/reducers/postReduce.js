import { createReducer } from "@reduxjs/toolkit";
import { post_render,post_create } from "../actions/postAction.js";

const initialState = {
  allPost: [], 
  loading: true,
  error: null,
};

const postReducer = createReducer(initialState, (builder) =>
builder.addCase(post_render.fulfilled, (state, action) => {
  state.allPost = action.payload; 
  state.loading = false;
})
    .addCase(post_render.pending, (state) => {
      state.loading = true;
    })
    .addCase(post_render.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    })

    .addCase(post_create.fulfilled, (state, action) => {
      return {
        ...state,
        allPost: [...state.allPost, action.payload],
      };
    })
      
    

    .addCase(post_create.pending, (state) => {
      state.loading = true;
    })
    .addCase(post_create.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    })
);

export default postReducer;

