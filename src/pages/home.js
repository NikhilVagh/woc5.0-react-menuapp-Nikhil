import { useState } from "react";

export const Home = () => {

    const [isLogin, setIsLogin] = useState(true);

    return (
        <main className="main1">
            <div class="home">
                <div class="logo">
                    <img
                        src="https://th.bing.com/th/id/OIP.WSKEFhYexhfX5OYSp9uP8gHaF3?w=220&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" />
                    <h1> Fortune Restaurant </h1>
                </div>
                <div class="formContainer">
                    <div class="formWrapper formWrapper1" >
                        <div style={{ visibility: isLogin ? "visible" : "hidden" }}>
                            <h1> Login </h1>
                            <form className="formtab">
                                <div class="box">
                                    <input type="email" placeholder="Email" />
                                </div>
                                <div class="box">

                                    <input type="password" placeholder="Password" />
                                </div>
                                <button>Login</button>
                            </form>
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
                    <div class="formWrapper formWrapper2" >
                        <div style={{ visibility: !isLogin ? "visible" : "hidden" }}>
                            <h1> Register </h1>
                            <form className="formtab">
                                <div class="box">
                                    <input type="text" placeholder="Name" />
                                </div>
                                <div class="box">
                                    <input type="email" placeholder="Email" />
                                </div>
                                <div class="box">
                                    <input type="password" placeholder="Password" />
                                </div>
                                <button>Register</button>
                            </form>

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