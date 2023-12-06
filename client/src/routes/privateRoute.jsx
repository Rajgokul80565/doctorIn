import {Navigate, Outlet}  from "react-router-dom";
import {useSelector} from "react-redux";
import {routes} from "./routes";


 const PrivateRoute = () => {
    const {userInfo} = useSelector((state)=> state.auth);
    return userInfo ? < Outlet/> : <Navigate to={routes.login} replace/>
}


export default PrivateRoute;
