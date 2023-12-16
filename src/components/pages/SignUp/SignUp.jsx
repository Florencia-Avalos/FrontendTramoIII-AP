import "../SignUp/signUp.css";
import imgSignUp from "../../../img/register2.svg";
import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { signUp } from "../../../redux/actions/userAction.js";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const nameUser = useRef(null);
  const avatar = useRef(null);
  const password = useRef(null);

  let hasError = false;

  const SignUpCorrect = () => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Gracias por registrarte!",
      showConfirmButton: false,
      timer: 1500,
    });

    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  const errorEmpty = () => {
    if (nameUser.current.value === "") {
      setNameError("Nombre es requerido");

      hasError = true;
    } else if (nameUser.current.value.length < 3) {
      setNameError("Nombre con al menos 3 caracteres");
      hasError = true;
    } else {
      setNameError("");
    }

    if (password.current.value === "") {
      setPasswordError("Contraseña es requerida");
      hasError = true;
    } else if (password.current.value.length < 6) {
      setPasswordError("Contraseña con al menos 6 caracteres");
      hasError = true;
    } else if (
      !/[A-Z]/.test(password.current.value) ||
      !/[a-z]/.test(password.current.value) ||
      !/[^A-Za-z0-9]/.test(password.current.value)
    ) {
      setPasswordError(
        "Contraseña debe incluir al menos: 1 mayuscula, 1 minuscula, 1 simbolo"
      );
      hasError = true;
    } else {
      setPasswordError("");
    }

    return hasError;
  };

  const handlePrevent = (e) => {
    e.preventDefault();

    const hasError = errorEmpty();

    if (!hasError) {
      const registerDataBody = {
        nameUser: nameUser.current.value,
        avatar: avatar.current.value,
        password: password.current.value,
      };

      if (avatar.current.value.trim() !== "") {
        registerDataBody.avatar = avatar.current.value;
      }

      dispatch(signUp(registerDataBody));

      SignUpCorrect();
    }
  };

  return (
    <>
      <section className="signUp">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black">
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <Link to={`/`} className="txt2 text-center">
                        <h5>Volver al principio</h5>
                        <i
                          className="fa fa-long-arrow-right m-l-5"
                          aria-hidden="true"
                        ></i>
                      </Link>

                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                        Registro
                      </p>

                      <form className="mx-1 mx-md-4">
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="text"
                              id="form3Example1c"
                              className="form-control"
                              ref={nameUser}
                              onChange={errorEmpty}
                            />
                            <label className="form-label">
                              Tú nombre de usuario
                            </label>
                            <p
                              className={`error-message ${
                                nameError
                                  ? "error-message-block"
                                  : "error-message-hidden"
                              }`}
                            >
                              {nameError}
                            </p>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="text"
                              id="form3Example4c"
                              className="form-control"
                              placeholder="url de la foto"
                              ref={avatar}
                            />
                            <label className="form-label">Avatar</label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="password"
                              id="form3Example4c"
                              className="form-control"
                              ref={password}
                              onChange={errorEmpty}
                            />
                            <label className="form-label">Contraseña</label>

                            <p
                              className={`error-message ${
                                passwordError
                                  ? "error-message-block"
                                  : "error-message-hidden"
                              }`}
                            >
                              {`Contraseña debe incluir al menos: 1 mayuscula, 1 minuscula, 1 simbolo)`}
                            </p>
                          </div>
                        </div>

                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button
                            type="button"
                            className="btn btn-primary btn-lg"
                            onClick={handlePrevent}
                          >
                            Registrarse
                          </button>
                        </div>
                      </form>

                      <div className="text-center p-t-136">
                        <Link to={`/login`} className="txt2">
                          Regresar al inicio sesion
                          <i
                            className="fa fa-long-arrow-right m-l-5"
                            aria-hidden="true"
                          ></i>
                        </Link>
                      </div>
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <img
                        src={imgSignUp}
                        className="img-fluid imgSignUp"
                        alt="Sample image"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignUp;
