import Verify2FA from "@/modules/auth/components/2FA/Verify2FA";
import { useAuth } from "@/modules/auth/context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";


const ProtectedRoutes = ({ children }) => {

    const { isAuthenticated, loading, needs2FA } = useAuth();
  
    if (loading) return <div className="p-4">Verificando sesión...</div>;
  
    if (!isAuthenticated) {
      return <Navigate to="/" replace />;
    }
  
    return(
      <>
        <Outlet /> 
        {needs2FA && <Verify2FA />}
      </>
    );
}

export default ProtectedRoutes;