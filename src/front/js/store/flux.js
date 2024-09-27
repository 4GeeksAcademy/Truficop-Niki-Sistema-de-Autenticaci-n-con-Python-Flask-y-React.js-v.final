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
          // Enviar solicitud de inicio de sesión
          const res = await axios.post(`${process.env.BACKEND_URL}/api/login`, bodyData);
          const { access_token } = res.data;

          // Verificar si se recibió un token
          if (access_token) {
            // Guardar token en localStorage
            localStorage.setItem("accessToken", access_token);

            // Obtener información del usuario actual
            await getActions().getCurrentUser();

            return true; // Login exitoso
          }
          return false; // Fallo en el login
        } catch (error) {
          console.log("Error en el login", error);
          return false; // Fallo en el login
        }
      },

      getCurrentUser: async () => {
        try {
          // Obtener el token de localStorage
          const accessToken = localStorage.getItem("accessToken");

          if (!accessToken) throw new Error("Token no disponible");

          // Enviar solicitud para obtener al usuario actual
          const res = await axios.get(`${process.env.BACKEND_URL}/api/current-user`, {
            headers: { Authorization: `Bearer ${accessToken}` },
          });

          const { current_user: currentUser } = res.data;

          // Actualizar el estado global con la información del usuario
          setStore({ currentUser, isLoggedIn: true });
        } catch (error) {
          console.log("Error obteniendo el usuario actual", error);
          // En caso de error, limpiar el estado y localStorage
          localStorage.removeItem("accessToken");
          setStore({ currentUser: null, isLoggedIn: false });
        }
      },

      logout: () => {
        // Limpiar el token y resetear el estado global al cerrar sesión
        localStorage.removeItem("accessToken");
        setStore({ currentUser: null, isLoggedIn: false });
      },
    },
  };
};

export default getState;
