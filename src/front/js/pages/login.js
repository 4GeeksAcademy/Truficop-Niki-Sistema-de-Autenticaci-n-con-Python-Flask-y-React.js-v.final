import React, { useState, useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Login = () => {
  const [email, setEmail] = useState("admin@admin.db");
  const [password, setPassword] = useState("123");
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const logged = await actions.login(email, password);

      if (logged && isMounted.current) {
        setEmail("");
        setPassword("");
        navigate("/protected");

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
