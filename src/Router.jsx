import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./app/App";
import Signin from "./components/signin";
import Signup from "./components/signup";
import Home from "./routes/Home";
import Blogs from "./routes/Blogs";
import Profile from "./routes/Profile";

export default function Router() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <App />,
            children: [
                {
                    index: true,
                    element: <Home />,
                },
                {
                    path: "/auth/signin",
                    element: <Signin />,
                },
                {
                    path: "/auth/signup",
                    element: <Signup />,
                },
                {
                    path: "/blogs",
                    element: <Blogs />,
                },
                {
                    path: "/profile",
                    element: <Profile />
                },
            ],
        },
    ]);
    return <RouterProvider router={router} />;
}
