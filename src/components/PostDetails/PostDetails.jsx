import { useParams } from "react-router-dom";

const PostDetails = () => {
  
  const { postId } = useParams();

  
  return (
    <div>
      <h1>Detalles del Post {postId}</h1> 
      
    </div>
  );
};

export default PostDetails;