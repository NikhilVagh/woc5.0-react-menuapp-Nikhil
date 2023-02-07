import { doc, getDoc, setDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { db, storage } from "../firebase";

export const UpdateDish = () => {

    const [err, setErr] = useState(false);
    const [dishNamechange, setDishNamechange] = useState(false);
    const [descriptionchange, setDescriptionchange] = useState(false);
    const [pricechange, setPricechange] = useState(false);
    const [imgChange, setImgChange] = useState(false);
    const [ videoLinkChange , setVideoLinkChange ] = useState(false);


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
        const mealType = e.target.mealType.value;
        const foodType = e.target.foodType.value;
        const file = imgChange ? e.target.img.files[0] : item.image;
        const videoLink = videoLinkChange ? e.target.videoLink.value : item.videoLink;

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

                            await setDoc(doc(db, "items", id), {
                                uid: item.uid,
                                dishName,
                                description,
                                price,
                                mealType,
                                foodType,
                                videoLink,
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
                dishName,
                description,
                price,
                mealType,
                foodType,
                videoLink,
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
                        <input type="text" placeholder={"Dish Name : " + item?.dishName} onChange={() => { setDishNamechange(!dishNamechange); }} />
                    </div>
                    <div className="box">
                        <input type="text" placeholder={"Description : " + item?.description} onChange={() => { setDescriptionchange(!descriptionchange); }} />
                    </div>
                    <div className="box">
                        <input type="number" placeholder={"Price (in $) : " + item?.price} step="0.01" min="0" onChange={() => { setPricechange(!pricechange); }} />
                    </div>
                    <div className="box">
                        <label for="mealType">Choose a Meal type : </label>
                        <select name="mealType">
                            <option value={item?.mealType}> Current : {item?.mealType}</option>
                            <option value="Breakfast">Breakfast</option>
                            <option value="Lunch">Lunch</option>
                            <option value="Dinner">Dinner</option>
                            <option value="Snacks">Snacks</option>
                        </select>
                    </div>
                    <div className="box">
                        <label for="foodType">Choose a Food type : </label>
                        <select name="foodType">
                            <option value={item?.foodType}> Current : {item?.foodType}</option>
                            <option value="Veg">Veg</option>
                            <option value="Nonveg">Non-veg</option>
                        </select>
                    </div>
                    <div className="box">
                        <input type="text" placeholder={"Video Link : " + item?.videoLink} name="videoLink" onChange={() => {setVideoLinkChange(!videoLinkChange)}} />
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