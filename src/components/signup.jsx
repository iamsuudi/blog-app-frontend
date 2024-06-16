import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";

export default function Signup() {
    const navigate = useNavigate();

    const signup = async (e) => {
        e.preventDefault();

        const form = Object.fromEntries(new FormData(e.target));

        try {
            const response = await axios({
                method: "post",
                baseURL: "http://localhost:3001/api",
                url: "/auth/signup",
                data: form,
            });
            console.log(response.data);
            navigate("/auth/status");
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <section>
            <h2 className="text-4xl text-center py-5 font-bold">Signup</h2>
            <form
                action=""
                method="post"
                className=" flex flex-col gap-3"
                onSubmit={signup}
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
