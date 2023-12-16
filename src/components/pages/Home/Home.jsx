import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { post_render } from "../../../redux/actions/postAction.js";
import "../Home/home.css";
import { Link } from "react-router-dom";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

const Home = () => {
  const dispatch = useDispatch();
  const posts = useSelector((store) => store.postReducer.allPost);
  const loading = useSelector((store) => store.postReducer.loading);
  const user = useSelector((store) => store.userReducer.user);

  const [welcomeShown, setWelcomeShown] = useState(false);

  useEffect(() => {
    dispatch(post_render());
  }, [dispatch]);

  useEffect(() => {
    if (user && !welcomeShown) {
      Toastify({
        text: "Bienvenido, " + user.nameUser,
        position: "center",
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
      }).showToast();

      setWelcomeShown(true);
    }
  }, [user, welcomeShown]);

  return (
    <>
      <div className="app-main__main--post">
        {user ? (
          <Link to="/post">
            <h1>Crear nueva publicación</h1>
          </Link>
        ) : (
          <Link to="/login">
            <h1>Iniciar sesión para crear una publicación</h1>
          </Link>
        )}
      </div>

      <main className="app-main__main">
        {loading ? (
          <p>Cargando...</p>
        ) : (
          posts.map((post, index) => (
            <div key={index} className="app-main__main--welcome">
              <div className="app-main__background">
                <div className="app-main__info">
                  {post.title && <h2>{post.title}</h2>}
                  <img className="img-post" src={post.imageURL} alt="" />
                  <Link to={`/posts/${post.id}`}>Ver más</Link>
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
