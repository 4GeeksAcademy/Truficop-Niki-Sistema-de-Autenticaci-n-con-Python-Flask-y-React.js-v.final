import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Protected = () => {
  const { store, actions } = useContext(Context);
  const withSession = !!store?.isLoggedIn;
  const navigate = useNavigate();

  useEffect(() => {
    if (!withSession) {
      navigate("/login");
    }
  }, [withSession]);

  return (
    <div className="text-center mt-5">
      <h1>PROTECTED ROUTE!!</h1>
      <p>
        <img src={rigoImageUrl} />
      </p>
      <div className="alert alert-info">
        {store?.currentUser?.email || "No hay un usuario identificado"}
      </div>
      <button className="btn btn-success" onClick={() => actions.logout()}>
        Logout
      </button>
      <p>
        This boilerplate comes with lots of documentation:{" "}
        <a href="https://start.4geeksacademy.com/starters/react-flask">
          Read documentation
        </a>
      </p>
    </div>
  );
};