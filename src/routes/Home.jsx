import { NavLink } from "react-router-dom";

export default function Home() {
    return (
        <div>
            <p>Home Page</p>
            <div className="flex gap-5">
                <NavLink
                    to={"/auth/signin"}
                    className={"px-3 py-1 rounded-md bg-indigo-400"}
                >
                    Signin
                </NavLink>
                <NavLink
                    to={"/auth/signup"}
                    className={"px-3 py-1 rounded-md bg-slate-400"}
                >
                    Signup
                </NavLink>
            </div>
        </div>
    );
}
