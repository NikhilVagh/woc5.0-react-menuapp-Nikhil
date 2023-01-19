import { signOut } from "firebase/auth";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { auth } from "../firebase";


export const Menus = () => {

    const { currentUser } = useContext(AuthContext);

    return (
        <div className="menus">
            <div className="navbar">
                <ul>
                    <li><a className="main"> Fortune Restaurant</a></li>
                    <li><a>Breakfast</a></li>
                    <li><a>Lunch</a></li>
                    <li><a>Dinner</a></li>
                    {
                        currentUser && <li className="logout"><button onClick={() => { signOut(auth); console.log("Logout") }}>LogOut</button></li>
                    }
                </ul>
            </div>
            <div className="all">
                <div className="all-menu">
                    <div className="item" >
                        <img className="imgItem" src="https://www.bing.com/th?id=OIP.aJ5MrLKNYBfhJ7AfyuRBNAHaLG&w=204&h=306&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2" />
                        <div className="details">
                            <span>Dish 1</span>
                            <textarea rows="6" cols="20" disabled>
                                Des 1
                            </textarea>
                            <span>Price 1</span>
                            <button>Order Now</button>
                        </div>
                    </div>
                    <div className="item">
                        <img className="imgItem" src="https://www.bing.com/th?id=OIP.aJ5MrLKNYBfhJ7AfyuRBNAHaLG&w=204&h=306&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2" />
                        <div className="details">
                            <span>Dish 2</span>
                            <textarea rows="6" cols="20" disabled>
                                Des 2
                            </textarea>
                            <span>Price 2</span>
                            <button>Order Now</button>
                        </div>
                    </div>
                    <div className="item">
                        <img className="imgItem" src="https://www.bing.com/th?id=OIP.aJ5MrLKNYBfhJ7AfyuRBNAHaLG&w=204&h=306&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2" />
                        <div className="details">
                            <span>Dish 3</span>
                            <textarea rows="6" cols="20" disabled>
                                Des 3
                            </textarea>
                            <span>Price 3</span>
                            <button>Order Now</button>
                        </div>
                    </div>
                    <div className="item">
                        <img className="imgItem" src="https://www.bing.com/th?id=OIP.aJ5MrLKNYBfhJ7AfyuRBNAHaLG&w=204&h=306&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2" />
                        <div className="details">
                            <span>Dish 4</span>
                            <textarea rows="6" cols="20" disabled>
                                Des 4
                            </textarea>
                            <span>Price 4</span>
                            <button>Order Now</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};