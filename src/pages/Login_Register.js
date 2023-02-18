import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";

export const Login_Register = () => {

    const [isLogin, setIsLogin] = useState(true);
    const [err, setErr] = useState(false);
    const navigate = useNavigate();

    const handleSubmitlogin = async (e) => {
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;

        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/Menus");
        } catch (err) {
            setErr(err);
        }
    }

    const handleSubmitRegister = async (e) => {
        e.preventDefault();
        const restaurant = e.target[0].value;
        const name = e.target[1].value;
        const email = e.target[2].value;
        const password = e.target[3].value;

        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);
            await setDoc(doc(db, "users", res.user.uid), {
                uid: res.user.uid,
                restaurant,
                name,
                email,
                password
            });

            navigate("/Menus");

        } catch (err) {
            setErr(true);
        }
    }

    return (
        <main className="main1">
            <div className="home">
                <div className="logo">
                    <img
                        src="https://th.bing.com/th/id/OIP.WSKEFhYexhfX5OYSp9uP8gHaF3?w=220&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" />
                    <h1> Fortune Restaurant </h1>
                </div>
                <div className="formContainer">
                    <div className="formWrapper" >
                        <div className="c1" style={{ display: isLogin ? "block" : "none" }}>
                            <h1> Login </h1>
                            <form className="formtab" onSubmit={handleSubmitlogin}>
                                <div className="box">
                                    <input type="email" placeholder="Email" required />
                                </div>
                                <div className="box">
                                    <input type="password" placeholder="Password" required />
                                </div>
                                <button>Login</button>
                            </form>
                            {err && <span>Something went wrong</span>}
                            <div className="side">
                                <p>Don't have account?
                                    <span onClick={() => {
                                        setIsLogin(!isLogin)
                                    }}>Register</span>
                                </p>
                            </div>
                        </div>
                        <div className="c2" style={{ display: !isLogin ? "block" : "none" }}>
                            <h1> Register </h1>
                            <form className="formtab" onSubmit={handleSubmitRegister}>
                                <div className="box">
                                    <input type="text" placeholder="Restaurant Name" required />
                                </div>
                                <div className="box">
                                    <input type="text" placeholder="Name" required />
                                </div>
                                <div className="box">
                                    <input type="email" placeholder="Email" required />
                                </div>
                                <div className="box">
                                    <input type="password" placeholder="Password" required />
                                </div>
                                <button>Register</button>
                            </form>
                            {err && <span>Something went wrong</span>}
                            <div className="side">
                                <p>Do you have account?
                                    <span onClick={() => {
                                        setIsLogin(!isLogin);

                                    }}>Login</span>
                                </p>
                            </div>


                        </div>
                        <div>
                        </div>
                    </div>
                </div>
                <div className="customer">
                    <Link to="/Menus">Customer</Link>
                </div>
            </div>
        </main>
    );
}