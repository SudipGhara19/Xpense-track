import { Navigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../../redux/userSlice";

const PrivateRoute = () => {
    const { currentUser } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const tokenData = JSON.parse(localStorage.getItem("access_token"));

    const isTokenValid = tokenData && tokenData.token && tokenData.expiryTime > Date.now();

    if (!isTokenValid || !currentUser) {
        localStorage.removeItem("access_token");
        dispatch(signOut());

        return <Navigate to="/signin" replace />;
    }

    return <Outlet />; // Render the protected component
};

export default PrivateRoute;
