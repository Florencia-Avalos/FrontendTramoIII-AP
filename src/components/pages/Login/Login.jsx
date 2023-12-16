import "../Login/login.css";
import "../SignUp/signUp.css";
import logoLogin from "../../../img/auth.svg";
import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { signIn } from "../../../redux/actions/userAction";
import { useDispatch } from "react-redux";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [passwordUserError, passwordUserErrorState] = useState();

  const password = useRef();
  const nameUser = useRef();

  let hasError = false;

  const errorLogin = () => {
    if (password.current.value === "") {
      passwordUserErrorState("Usuario o contraseña incorrecta");
      hasError = true;
    } else {
      passwordUserErrorState("");
    }

    if (nameUser.current.value === "") {
      passwordUserErrorState("Usuario o contraseña incorrecta");
      hasError = true;
    } else {
      passwordUserErrorState("");
    }

    return hasError;
  };

  const handlePrevent = (e) => {
    e.preventDefault();
    const hasError = errorLogin();

    if (!hasError) {
      const signInDataBody = {
        nameUser: nameUser.current.value,
        password: password.current.value,
      };

      Toastify({
        text: "verificando...",
        duration: 2000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "center",
        stopOnFocus: true,
        style: {
          background:
            " linear-gradient(175deg, #fff67e 0, #ffe56d 16.67%, #ffcd56 33.33%, #ffae38 50%, #f08f19 66.67%, #e77502 83.33%, #e46002 100%)",
        },
      }).showToast();
      setTimeout(() => {
        dispatch(signIn(signInDataBody)).then((algo) => {
          if (algo.payload.message || algo.payload.details) {
            passwordUserErrorState("Usuario o contraseña incorrecta");
          } else {
            navigate("/");
          }
        });
      }, 2000);
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
                        Iniciar sesion
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
                            />
                            <label className="form-label">usuario</label>
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
                            />
                            <label className="form-label">Contraseña</label>

                            <p
                              className={`error-message ${
                                passwordUserError
                                  ? "error-message-block"
                                  : "error-message-hidden"
                              }`}
                            >
                              {passwordUserError}
                            </p>
                          </div>
                        </div>

                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button
                            type="button"
                            className="btn btn-primary btn-lg"
                            onClick={handlePrevent}
                          >
                            Ingresar
                          </button>
                        </div>
                      </form>

                      <div className="text-center p-t-136">
                        <Link to={`/signUp`} className="txt2">
                          Registrarse
                          <i
                            className="fa fa-long-arrow-right m-l-5"
                            aria-hidden="true"
                          ></i>
                        </Link>
                      </div>
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <img
                        src={logoLogin}
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

export default Login;
