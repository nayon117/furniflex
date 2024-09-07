import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";
import Cart from "../pages/Cart";
import PaymentSucess from "../pages/PaymentSucess";
import PrivateRoute from "./PrivateRoute";


const Route = createBrowserRouter ([
    {
        path: "/",
        element:<PrivateRoute><MainLayout/></PrivateRoute>,
        errorElement: <h1>404 Not Found</h1>,
        children:[
            {
                path: "/",
                element: <Home />
            },
            {
                path:'/cart',
                element:<Cart />
            },
            {
                path:'/success',
                element:<PaymentSucess />
            }
        ]
    },
    {
        path:'/sign-up',
        element:<SignUp />
    },
    {
        path:'/sign-in',
        element:<SignIn />
    }
])

export default Route;