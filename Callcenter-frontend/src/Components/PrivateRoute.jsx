import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, roles }) => {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  if (!usuario) return <Navigate to="/" />; 

  if (roles && !roles.includes(usuario.rol)) {
    return <Navigate to="/" />; 
  }

  return children;
};

export default PrivateRoute;
