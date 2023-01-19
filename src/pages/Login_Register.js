import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
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
        const name = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;

        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);
            await setDoc(doc(db, "users", res.user.uid), {
                uid: res.user.uid,
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
                    <div className="formWrapper formWrapper1" >
                        <div style={{ visibility: isLogin ? "visible" : "hidden" }}>
                            <h1> Login </h1>
                            <form className="formtab" onSubmit={handleSubmitlogin}>
                                <div className="box">
                                    <input type="email" placeholder="Email" />
                                </div>
                                <div className="box">
                                    <input type="password" placeholder="Password" />
                                </div>
                                <button>Login</button>
                            </form>
                            {err && <span>Something went wrong</span>}
                        </div>
                        <div>
                            <div className="side" style={{ visibility: !isLogin ? "visible" : "hidden" }}>
                                <p>Do you have account?
                                    <span onClick={() => {
                                        setIsLogin(!isLogin)
                                    }}>Login</span>
                                    {/* <Link to="/register">Register</Link> */}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="formWrapper formWrapper2" >
                        <div style={{ visibility: !isLogin ? "visible" : "hidden" }}>
                            <h1> Register </h1>
                            <form className="formtab" onSubmit={handleSubmitRegister}>
                                <div className="box">
                                    <input type="text" placeholder="Name" />
                                </div>
                                <div className="box">
                                    <input type="email" placeholder="Email" />
                                </div>
                                <div className="box">
                                    <input type="password" placeholder="Password" />
                                </div>
                                <button>Register</button>
                            </form>
                            {err && <span>Something went wrong</span>}

                        </div>
                        <div>
                            <div className="side" style={{ visibility: isLogin ? "visible" : "hidden" }}>
                                <p>Don't have account?
                                    <span onClick={() => {
                                        setIsLogin(!isLogin)
                                    }}>Register</span>
                                    {/* <Link to="/register">Register</Link> */}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}