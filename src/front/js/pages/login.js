import React, { useState, useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Login = () => {
  const [email, setEmail] = useState("admin@admin.db");
  const [password, setPassword] = useState("123");
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  // Usamos useRef para crear una referencia que indica si el componente sigue montado
  const isMounted = useRef(true);

  // Efecto para manejar la vida útil del componente
  useEffect(() => {
    // Marcamos que el componente está montado
    isMounted.current = true;

    // Cuando el componente se desmonta, marcamos isMounted como false
    return () => {
      isMounted.current = false;
    };
  }, []);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const logged = await actions.login(email, password);

      // Verificar si el componente sigue montado antes de actualizar el estado o navegar
      if (logged && isMounted.current) {
        setEmail("");
        setPassword("");
        navigate("/protected");

        // Solo actualizamos el estado si el componente sigue montado
        
      }
    } catch (error) {
      console.log("Error en el login: ", error);
    }
  };

  return (
    <main className="container w-50">
      <h1>LOGIN</h1>
      <form onSubmit={onSubmitHandler}>
        <div className="mb-3 row">
          <label htmlFor="inputEmail" className="col-sm-2 col-form-label">
            Email
          </label>
          <div className="col-sm-10">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              className="form-control"
              id="inputEmail"
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="inputPassword" className="col-sm-2 col-form-label">
            Password
          </label>
          <div className="col-sm-10">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="form-control"
              id="inputPassword"
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </main>
  );
};
