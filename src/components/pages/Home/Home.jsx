import  { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { post_render } from "../../../redux/actions/postAction.js";
import "../Home/home.css";
import { Link } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const posts = useSelector((store) => store.postReducer.allPost); 
  const loading = useSelector((store) => store.postReducer.loading);

  useEffect(() => {
    dispatch(post_render());
  }, [dispatch]);



  return (
    <>
    <div className="app-main__main--post">
          <Link to="/post"><h1>Crear nueva publicación</h1></Link>
      </div>

      <main className="app-main__main">
        {loading ? (
          <p>Cargando...</p>
        ) : (
          posts.map((post, index) => (
            <div key={index} className="app-main__main--welcome">
              <div className="app-main__background">
                <div className="app-main__info">
                  <h2>{post.title}</h2>
                  <img className="img-post" src={post.imageURL} alt="" />
                  {/* Mostrar más detalles del post si es necesario */}
                  <Link  to={`/posts/${post.id}`}>Ver más</Link>
                </div>
              </div>
            </div>
          ))
        )}
        
      </main>
    </>
  );
};

export default Home;

