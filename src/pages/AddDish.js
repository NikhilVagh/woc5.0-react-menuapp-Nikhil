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

        const dishName = e.target[0].value;
        const description = e.target[1].value;
        const price = e.target[2].value;
        const id = e.target[3].value;
        const mealType = e.target[4].value;
        const file = e.target[5].files[0];


        try {
            const storageRef = ref(storage, dishName);

            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                (error) => {
                    setErr(true);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        console.log('File available at', downloadURL);

                        await setDoc(doc(db, "items", id), {
                            uid: currentUser.uid,
                            dishName,
                            description,
                            price,
                            mealType,
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
                        <input type="text" placeholder="Dish Name" />
                    </div>
                    <div className="box">
                        <input type="text" placeholder="Description" />
                    </div>
                    <div className="box">
                        <input type="number" placeholder="Price (in $)" step="0.01" min="0" />
                    </div>
                    <div className="box">
                        <input type="text" placeholder="Item Id." />
                    </div>
                    <div className="box">
                        <input type="text" placeholder="Meal type" />
                    </div>
                    <div className="box">
                        <input type="file" />
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