import { useState } from "react";
import "../Post/post.css";


const PostForm = () => {
  const [titulo, setTitulo] = useState('');
  const [imagenUrl, setImagenUrl] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    setTitulo('');
    setImagenUrl('');
    setDescripcion('');
  };

  return (
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
        <button type="submit">Agregar publicación</button>
      </form>
    </div>
  );
};

export default PostForm;

