import {  createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllPost,

} from "../../services/postService.js";

export const post_render = createAsyncThunk("posts_render", async () => {
  try {
    const posts = await getAllPost(); 
    console.log(posts); 
    return posts;
  } catch (error) {
    console.error(error);
    throw error;
  }
});



