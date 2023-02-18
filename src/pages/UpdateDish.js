import { doc, getDoc, setDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { db, storage } from "../firebase";

export const UpdateDish = () => {

    const navigate = useNavigate();

    const { id } = useParams();

    const [item, setItem] = useState(null);
    const [err, setErr] = useState(false);
    const [imgChange, setImgChange] = useState(false);

    const getItem = async () => {
        const itemsRef = doc(db, "items", id);
        const data = await getDoc(itemsRef);
        if (data.exists()) {
            setItem(data.data());
        }
        else {
            console.log("NO");
        }
    };

    useEffect(() => {
        getItem();
    }, []);

    const handleAdd = async (e) => {
        e.preventDefault();

        const file = imgChange ? e.target.img.files[0] : item.image;

        if (imgChange) {
            try {
                const storageRef = ref(storage, item?.dishName);

                const uploadTask = uploadBytesResumable(storageRef, file);

                uploadTask.on(
                    (error) => {
                        setErr(true);
                    },
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                            console.log('File available at', downloadURL);

                            await setDoc(doc(db, "items", id), {
                                uid: item.uid,
                                dishName: item.dishName,
                                description: item.description,
                                price: item.price,
                                mealType: item.mealType,
                                foodType: item.foodType,
                                videoLink: item.videoLink,
                                image: downloadURL
                            });
                            navigate(`/ItemPage/${id}`);

                        });
                    }

                );
            } catch (e) {
                setErr(true);
            }
        } else {
            await setDoc(doc(db, "items", id), {
                uid: item.uid,
                dishName: item.dishName,
                description: item.description,
                price: item.price,
                mealType: item.mealType,
                foodType: item.foodType,
                videoLink: item.videoLink,
                image: file
            });
            navigate(`/ItemPage/${id}`);

        }
    }

    return (
        <div className="addDish">
            <div className="head">
                <h1> Item </h1>
            </div>
            <div className="inner" >
                <form className="formtab" onSubmit={handleAdd}>
                    <div className="box">
                        <input type="text" name="dishName" placeholder={"Dish Name : " + item?.dishName} onChange={(e) => {
                            let newItem = item;
                            newItem.dishName = e.target.value;
                            setItem(newItem);
                        }} />
                    </div>
                    <div className="box">
                        <input type="text" name="description" placeholder={"Description : " + item?.description} onChange={(e) => {
                            let newItem = item;
                            newItem.description = e.target.value;
                            setItem(newItem);
                        }} />
                    </div>
                    <div className="box">
                        <input type="number" name="price" placeholder={"Price (in ₹) : " + item?.price} step="0.01" min="0" onChange={(e) => {
                            let newItem = item;
                            newItem.price = e.target.value;
                            setItem(newItem);
                        }} />
                    </div>
                    <div className="box">
                        <label for="mealType">Choose a Meal type : </label>
                        <select name="mealType" onChange={(e) => {
                            let newItem = item;
                            newItem.mealType = e.target.value;
                            setItem(newItem);
                        }}>
                            <option value={item?.mealType}> Current : {item?.mealType}</option>
                            <option value="Breakfast">Breakfast</option>
                            <option value="Lunch">Lunch</option>
                            <option value="Dinner">Dinner</option>
                            <option value="Snacks">Snacks</option>
                        </select>
                    </div>
                    <div className="box">
                        <label for="foodType">Choose a Food type : </label>
                        <select name="foodType" onChange={(e) => {
                            let newItem = item;
                            newItem.vegType = e.target.value;
                            setItem(newItem);
                        }}>
                            <option value={item?.foodType}> Current : {item?.foodType}</option>
                            <option value="Veg">Veg</option>
                            <option value="Nonveg">Non-veg</option>
                        </select>
                    </div>
                    <div className="box">
                        <input type="text" placeholder={"Video Link : " + item?.videoLink} name="videoLink" onChange={(e) => {
                            let newItem = item;
                            newItem.videoLink = e.target.value;
                            setItem(newItem);
                        }} />
                    </div>
                    <div className="box">
                        <input type="file" name="img" onChange={() => {
                            setImgChange(!imgChange);
                        }} />
                    </div>
                    <div className="box" >
                        <button> <Link to={`/ItemPage/${id}`}> Back </Link></button>
                        <button>Update</button>
                    </div>
                </form>
                {err && <span>Something went wrong</span>}
                {/* </div> */}
            </div>
        </div>
    );
};