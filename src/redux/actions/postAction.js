import {  createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllPost,

} from "../../services/postService.js";
import axios from "axios";


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

export const post_create = createAsyncThunk("post_create", async (body) => {
  try {
    const response = await axios.post('http://localhost:3000/api/post/createPost', body);
const headersInfo = {
  contentType: response.headers['content-type'],
 
};
const responseData = {
  data: response.data,
  headers: headersInfo, 
};
return responseData;
  } catch (error) {
    console.error(error);
    throw error;
  }
});



