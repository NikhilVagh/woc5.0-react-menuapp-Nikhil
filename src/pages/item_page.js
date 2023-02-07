import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { db } from "../firebase";

export const ItemPage = () => {

    const { id } = useParams();

    const { currentUser } = useContext(AuthContext);


    const navigate = useNavigate();

    const [item, setItem] = useState(null);
    const [restaurant, setRestaurant] = useState(null);

    const itemsRef = doc(db, "items", id);
    const getItem = async () => {
        const data = await getDoc(itemsRef);
        if (data.exists()) {
            setItem(data.data());
            const userRef = doc(db, "users", data.data().uid);
            const user = await getDoc(userRef);
            if (user.exists()) {
                setRestaurant(user.data().restaurantName);
            }

        }
        else {
            console.log("NO");
        }
    };



    const deleteItem = async () => {

        if (currentUser) {
            await deleteDoc(doc(db, "items", id));
            console.log("Del");
            navigate('/menus');

        }
        else{
            navigate('/');
        }
    };

    useEffect(() => {
        getItem();
    }, []);

    return (
        <div className="itemPage">
            <div className="name">
                <h1>{restaurant}</h1>
            </div>
            <div className="back">
                <button> <Link to="/menus"> Back </Link></button>
            </div>
            <div className="imgAndDetails">

                <div className="img">
                    <img src={item?.image} />
                </div>
                <div className="allDetails">
                    <h3> {item?.dishName} </h3>
                    <div>
                        <ReactPlayer
                            className="react-player"
                            url={item?.videoLink}
                            width="60ex"
                            height="40ex"
                        />
                    </div>
                    <p>
                        {item?.description}
                    </p>
                    <span><b> Veg type</b>: {item?.foodType}</span>
                    <span><b> Meal type</b>: {item?.mealType} </span>
                    <span id="price"><b> Price</b>: {item?.price} &#8377; </span>
                    <span><b> Liked</b>: 100 </span>
                    <div>
                        <button className="edit"><Link to={`/UpdateItem/${id}`}>Edit</Link></button>
                        <button className="delete" onClick={deleteItem}>Delete</button>
                    </div>
                </div>
            </div>
            <div className="order">
                <button>Ordere Now</button>
            </div>

        </div >
    );
}