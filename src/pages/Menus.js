import { signOut } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Item } from "../components/item";
import { AuthContext } from "../context/AuthContext";
import { auth, db } from "../firebase";


export const Menus = () => {

    const { currentUser } = useContext(AuthContext);

    const [items, setItems] = useState(null);

    const [currentItems, setCurrentItems] = useState(null);

    const [uniqueItems, setUniqueItems] = useState(null);

    const [uniqueVeg , setUniqueVeg] = useState(null);

    
    const getItems = async () => {
        const itemRef = collection(db, "items");
        let itemData = itemRef;
        if(currentUser)
        {
            itemData = query(itemRef, where("uid", "==", currentUser.uid));
        }
        const data = await getDocs(itemData);
        const itemList = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setItems(itemList);
        setCurrentItems(itemList);
        const unique = itemList?.map(item => item.mealType);
        setUniqueItems(unique?.filter((item, idx) => unique.indexOf(item) === idx));
        const uniqueV = itemList?.map(item => item.foodType);
        setUniqueVeg(uniqueV?.filter((item, idx) => uniqueV.indexOf(item) === idx));
    };

    const getMeal = (meanType) => {

        setCurrentItems(items.filter(item => item.mealType === meanType));
    };

    const getVeg = (foodType) => {
        setCurrentItems(items.filter(item => item.foodType === foodType));
    }


    useEffect(() => {
        getItems();
    }, []);


    return (
        <div className="menus">
            <div className="navbar">
                <ul>
                    <li><Link className="main" to="/" > Fortune Restaurant</Link></li>
                    <li><a onClick={getItems} > All </a></li>
                    <li><a onClick={() => getMeal("Breakfast")}>Breakfast</a></li>
                    <li><a onClick={() => getMeal("Lunch")}>Lunch</a></li>
                    <li><a onClick={() => getMeal("Dinner")}>Dinner</a></li>
                    <li>
                        <div class="dropdown">
                            <div className="dropbtn">
                                <a>Meal Filter</a>
                                <div class="dropdown-content">
                                    <a onClick={getItems} className="but"> All </a>
                                    {/* <span>Meal</span> */}
                                    <div className="dropdown1-content">
                                        <a className="but">Meal</a>
                                        <div class="dropdown2-content">
                                            {
                                                uniqueItems?.map((uniqueItem) => (
                                                    <a href="#" onClick={() => getMeal(uniqueItem)}>{uniqueItem}</a>
                                                ))
                                            }
                                        </div>
                                    </div>
                                    {/* <br /> */}
                                    <div className="dropdown1-content">
                                        <a className="but">Food Type</a>
                                        <div class="dropdown2-content">
                                            {
                                                uniqueVeg?.map((unique) => (
                                                    <a href="#" onClick={() => getVeg(unique)}>{unique}</a>
                                                ))
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                    {
                        currentUser && <li><Link className="link" to="/AddDish">Add Dish</Link></li>
                    }
                    {
                        currentUser && <li className="logout"><button onClick={() => { signOut(auth); console.log("Logout") }}>LogOut</button></li>
                    }
                </ul>
            </div>
            <div className="all">
                <div className="all-menu">
                    {currentItems?.map((currentItem) => (
                        <Item item={currentItem} />
                    ))}

                </div>
            </div>
        </div>
    );
};