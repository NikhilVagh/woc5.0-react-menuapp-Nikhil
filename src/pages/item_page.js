import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { db } from "../firebase";

export const ItemPage = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [item, setItem] = useState(null);

    const itemsRef = doc(db, "items", id);
    const getItem = async () => {
        const data = await getDoc(itemsRef);
        if (data.exists()) {
            setItem(data.data());
        }
        else {
            console.log("NO");
        }
    };

    const deleteItem = async () => {
        await deleteDoc(doc(db, "items", id));
        console.log("Del");
        navigate('/menus');
    };

    useEffect(() => {
        getItem();
    }, []);

    return (
        <div className="itemPage">
            <div className="name">
                <h1>Restaurant Name</h1>
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
                    <p>
                        {item?.description}
                    </p>
                    <span><b> Veg type</b>: Veg</span>
                    <span><b> Meal type</b>: {item?.mealType} </span>
                    <span id="price"><b> Price</b>: 10 &#8377; </span>
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