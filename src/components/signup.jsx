import { NavLink, useNavigate } from "react-router-dom";
import { signup } from "../services/user.api";

export default function Signup() {
    const navigate = useNavigate();

    const signupHandler = async (e) => {
        e.preventDefault();

        const form = Object.fromEntries(new FormData(e.target));

        try {
            await signup(form);
            navigate("/auth/status");
        } catch (error) {
            console.log(error.message);
            navigate("");
        }
    };

    return (
        <section>
            <h2 className="text-4xl text-center py-5 font-bold">Signup</h2>
            <form
                action=""
                method="post"
                className=" flex flex-col gap-3"
                onSubmit={signupHandler}
            >
                <label htmlFor="">
                    email{" "}
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className=" p-2 border-2"
                    />
                </label>
                <label htmlFor="">
                    password{" "}
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className=" p-2 border-2"
                    />
                </label>
                <button
                    type="submit"
                    className=" bg-slate-600 text-white p-2 rounded-md"
                >
                    Sign Up
                </button>
                <NavLink to={"/auth/signin"} className={"underline"}>
                    Signin
                </NavLink>
            </form>
        </section>
    );
}
