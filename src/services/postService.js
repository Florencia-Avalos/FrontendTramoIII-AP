import axios from "axios";

const postsQueries = axios.create( {
    baseURL: 'http://localhost:3000/api/post',
  } );


  export const getAllPost = async (queryParams="") => {
    try {
        const response = await postsQueries(queryParams)
        return response.data
    } catch (error) {
        console.log(error);
    }
  }