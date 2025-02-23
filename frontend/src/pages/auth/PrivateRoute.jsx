import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = () => {
    const { currentUser } = useSelector((state) => state.user);

    // Get token and expiry time from localStorage
    const tokenData = JSON.parse(localStorage.getItem("access_token"));

    // Validate token presence & expiry
    const isTokenValid = tokenData && tokenData.token && tokenData.expiryTime > Date.now();

    if (!isTokenValid || !currentUser) {
        localStorage.removeItem("access_token");

        // Redirect to Sign-in page
        return <Navigate to="/signin" replace />;
    }

    return <Outlet />; // Render the protected component
};

export default PrivateRoute;
