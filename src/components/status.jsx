// import

import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// Configure Axios to send cookies with requests
axios.defaults.withCredentials = true;

export default function Status() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios({
            method: "get",
            baseURL: "http://localhost:3001/api",
            url: "/auth/status",
        })
            .then((response) => {
                console.log(response.data);
                setUser(response.data);
            })
            .catch((error) => {
                console.log(error.message);
                navigate("/auth/signin");
            });
    }, []);

    if (!user) return <p>loading...</p>;

    return (
        <section>
            <div className="flex flex-col gap-3">
                <p>Id{user.id}</p>
                <p>Email{user.email}</p>
            </div>
        </section>
    );
}
