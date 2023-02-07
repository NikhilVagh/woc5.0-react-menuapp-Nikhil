import { doc, setDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { db, storage } from "../firebase";

export const AddDish = () => {
    
    const [err, setErr] = useState(false);
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleAdd = (e) => {
        e.preventDefault();

        const dishName = e.target.dishName.value;
        const description = e.target.description.value;
        const price = e.target.price.value;
        const id = e.target.id.value;
        const file = e.target.file.files[0];
        const mealType = e.target.mealType.value;
        const foodType = e.target.foodType.value;
        const videoLink = e.target.videoLink.value;


        try {
            const storageRef = ref(storage, dishName);

            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                (error) => {
                    setErr(true);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {

                        await setDoc(doc(db, "items", id), {
                            uid: currentUser.uid,
                            dishName,
                            description,
                            price,
                            mealType,
                            foodType,
                            videoLink,
                            image: downloadURL
                        });
                        navigate("/menus");
                    });
                }

            );
        } catch (e) {
            setErr(true);
        }
    }

    return (
        <div className="addDish">
            {/* <div> */}
            <div className="head">
                <h1> Item </h1>
            </div>
            <div className="inner" >
                <form className="formtab" onSubmit={handleAdd}>
                    <div className="box">
                        <input type="text" placeholder="Dish Name" name="dishName" />
                    </div>
                    <div className="box">
                        <input type="text" placeholder="Description" name="description" />
                    </div>
                    <div className="box">
                        <input type="number" placeholder="Price (in $)" step="0.01" min="0" name="price" />
                    </div>
                    <div className="box">
                        <input type="text" placeholder="Item Id." name="id" />
                    </div>
                    <div className="box">
                        <label for="mealType">Choose a Meal type : </label>
                        <select name="mealType">
                            <option value="Breakfast">Breakfast</option>
                            <option value="Lunch">Lunch</option>
                            <option value="Dinner">Dinner</option>
                            <option value="Snacks">Snacks</option>
                        </select>
                    </div>
                    <div className="box">
                        <label for="foodType">Choose a Food type : </label>
                        <select name="foodType">
                            <option value="Veg">Veg</option>
                            <option value="Nonveg">Non-veg</option>
                        </select>
                    </div>
                    <div className="box">
                        <input type="text" placeholder="Enter Video Link..." name="videoLink" />
                    </div>
                    <div className="box">
                        <input type="file" name="file" />
                    </div>
                    <div className="box">
                        <button> <Link to="/menus"> Back </Link></button>
                        <button>Add</button>
                    </div>
                </form>
                {err && <span>Something went wrong</span>}
                {/* </div> */}
            </div>
        </div>
    );
};