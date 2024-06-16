import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
axios.defaults.withCredentials = true;

export default function Signin() {
    const navigate = useNavigate();

    const signin = async (e) => {
        e.preventDefault();
        
        const f = Object.fromEntries(new FormData(e.target));
        console.log(f);

        try {
            const response = await axios({
                method: "post",
                baseURL: "http://localhost:3001/api",
                url: "/auth/signin",
                data: f,
            });

            console.log("response ", response.data);
            navigate("/auth/status");
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <section>
            <h2 className="text-4xl text-center py-5 font-bold">Signin</h2>
            <form
                action=""
                method="post"
                className=" flex flex-col gap-3"
                onSubmit={signin}
            >
                <label htmlFor="">
                    email{" "}
                    <input
                        type="email"
                        name="email"
                        required
                        placeholder="Email"
                        className=" p-2 border-2"
                    />
                </label>
                <label htmlFor="">
                    password{" "}
                    <input
                        type="password"
                        name="password"
                        required
                        placeholder="Password"
                        className=" p-2 border-2"
                    />
                </label>
                <button
                    type="submit"
                    className=" bg-slate-600 text-white p-2 rounded-md"
                >
                    Sign in
                </button>
                <NavLink to={"/auth/signup"} className={"underline"}>
                    Signup
                </NavLink>
            </form>
        </section>
    );
}
