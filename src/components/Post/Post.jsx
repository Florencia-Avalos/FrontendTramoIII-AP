import { useState } from "react";
import "../Post/post.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { post_create } from "../../redux/actions/postAction.js";

const PostForm = () => {
  const userName = useSelector((store) => store.userReducer.user.nameUser);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [titulo, setTitulo] = useState("");
  const [imagenUrl, setImagenUrl] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [userNameConfirmation, setUserNameConfirmation] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!titulo || !imagenUrl || !descripcion || !userNameConfirmation) {
      console.error("Por favor, completa todos los campos.");
      return;
    }

    if (userNameConfirmation !== userName) {
      console.error(
        "El nombre de usuario no coincide. No puedes crear el post."
      );
      return;
    }

    const postData = {
      title: titulo,
      imageURL: imagenUrl,
      description: descripcion,
      author: userName,
    };

    try {
      const new_post = await dispatch(post_create(postData));

      if (new_post && new_post.data) {
        console.log("Nuevo post creado:", new_post.data);
        setTitulo("");
        setImagenUrl("");
        setDescripcion("");
        setUserNameConfirmation("");

        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        console.error(
          "La respuesta de la solicitud es incorrecta o está vacía."
        );
      }
    } catch (error) {
      console.error("Error al crear el post:", error);
    }
  };

  return (
    <>
      <div className="post-form-container ">
        <h2>Agregar una nueva publicación</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="titulo">Título de la publicación:</label>
            <input
              type="text"
              id="titulo"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="imagenUrl">URL de la imagen:</label>
            <input
              type="url"
              id="imagenUrl"
              value={imagenUrl}
              onChange={(e) => setImagenUrl(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="descripcion">Descripción:</label>
            <textarea
              id="descripcion"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              required
            ></textarea>
          </div>

          {/* Mostrar el nombre de usuario */}
          <div>
            <label htmlFor="userNameConfirmation">
              Confirmar nombre de usuario:
            </label>
            <input
              type="text"
              id="userNameConfirmation"
              value={userNameConfirmation}
              onChange={(e) => setUserNameConfirmation(e.target.value)}
              required
            />
          </div>

          <button type="submit">Agregar publicación</button>
        </form>
      </div>

      <Link to={`/`} className="txt2 text-center">
        <h5>Volver al principio</h5>
        <i className="fa fa-long-arrow-right m-l-5" aria-hidden="true"></i>
      </Link>
    </>
  );
};

export default PostForm;
