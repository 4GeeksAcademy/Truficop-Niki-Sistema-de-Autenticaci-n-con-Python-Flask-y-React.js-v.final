import axios from "axios";

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      message: null,
      currentUser: null,
      isLoggedIn: false,
    },
    actions: {
      login: async (email, password) => {
        const bodyData = { email, password };

        try {
          const res = await axios.post(`${process.env.BACKEND_URL}/api/login`, bodyData);
          const { access_token } = res.data;

          if (access_token) {
            localStorage.setItem("accessToken", access_token);

            await getActions().getCurrentUser();

            return true;
          }
          return false;
        } catch (error) {
          console.log("Error en el login", error);
          return false;
        }
      },

      getCurrentUser: async () => {
        try {
          const accessToken = localStorage.getItem("accessToken");

          if (!accessToken) throw new Error("Token no disponible");

          const res = await axios.get(`${process.env.BACKEND_URL}/api/current-user`, {
            headers: { Authorization: `Bearer ${accessToken}` },
          });

          const { current_user: currentUser } = res.data;

          setStore({ currentUser, isLoggedIn: true });
        } catch (error) {
          console.log("Error obteniendo el usuario actual", error);
          localStorage.removeItem("accessToken");
          setStore({ currentUser: null, isLoggedIn: false });
        }
      },

      logout: () => {
        localStorage.removeItem("accessToken");
        setStore({ currentUser: null, isLoggedIn: false });
      },
    },
  };
};

export default getState;
