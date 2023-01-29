import { doc, getDoc, setDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { db, storage } from "../firebase";

export const UpdateDish = () => {

    const [err, setErr] = useState(false);
    const { currentUser } = useContext(AuthContext);
    const [dishNamechange, setDishNamechange] = useState(false);
    const [descriptionchange, setDescriptionchange] = useState(false);
    const [pricechange, setPricechange] = useState(false);
    const [mealTypechange, setMealTypechange] = useState(false);
    const [idchange, setIdchange] = useState(false);
    const [imgChange, setImgChange] = useState(false);

    const navigate = useNavigate();


    const { id } = useParams();

    const [item, setItem] = useState(null);

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

        const dishName = dishNamechange ? e.target[0].value : item.dishName;
        const description = descriptionchange ? e.target[1].value : item.description;
        const price = pricechange ? e.target[2].value : item.price;
        const newId = idchange ? e.target[3].value : id;
        const mealType = mealTypechange ? e.target[4].value : item.mealType;
        const file = imgChange ? e.target[5].files[0] : item.image;

        if (imgChange) {
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

                            await setDoc(doc(db, "items", newId), {
                                uid: item.uid,
                                dishName,
                                description,
                                price,
                                mealType,
                                image: downloadURL
                            });
                        });
                    }

                );
            } catch (e) {
                setErr(true);
            }
        } else {
            await setDoc(doc(db, "items", newId), {
                uid: item.uid,
                dishName,
                description,
                price,
                mealType,
                image: file
            });
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
                        <input type="text" placeholder={"Dish Name : " + item?.dishName} onChange={() => { setDishNamechange(!dishNamechange); }} />
                    </div>
                    <div className="box">
                        <input type="text" placeholder={"Description : " + item?.description} onChange={() => { setDescriptionchange(!descriptionchange); }} />
                    </div>
                    <div className="box">
                        <input type="number" placeholder={"Price (in $) : " + item?.price} step="0.01" min="0" onChange={() => { setPricechange(!pricechange); }} />
                    </div>
                    <div className="box">
                        <input type="text" placeholder={"Item Id. : " + id} onChange={() => { setIdchange(!idchange) }} />
                    </div>
                    <div className="box">
                        <input type="text" placeholder={"Meal type : " + item?.mealType} onChange={() => { setMealTypechange(!mealTypechange); }} />
                    </div>
                    <div className="box">
                        <input type="file" onChange={() => {
                            setImgChange(!imgChange);
                        }} />
                    </div>
                    <div className="box" >
                        <button> <Link to="/menus"> Back </Link></button>
                        <button>Update</button>
                    </div>
                </form>
                {err && <span>Something went wrong</span>}
                {/* </div> */}
            </div>
        </div>
    );
};