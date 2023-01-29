import { Link } from "react-router-dom";

export const Item = (props) => {

    const { item } = props;

    return (
        <div className="item" >
            <img className="imgItem" src={item.image} alt="" />
            <div className="details">
                <span className="dishName">{item.dishName}</span>
                <p>
                    {item.description.substring(0,50)+"..."}

                </p>
                <span>{item.price}&#8377;</span>
                <div className="but">

                <button>Order Now</button>
                <button className="read"><Link to={`/ItemPage/${item.id}`}>Read More</Link></button>
                </div>
            </div>
        </div>
    );
};