export const Item = (props) => {

    const { item } = props;
    console.log(item.image);

    return (
        <div className="item" >
            <img className="imgItem" src={item.image} alt="" />
            <div className="details">
                <span className="dishName">{item.dishName}</span>
                <textarea rows="6" cols="20" disabled>
                    {item.description}
                </textarea>
                <span>{item.price}$</span>
                <button>Order Now</button>
            </div>
        </div>
    );
};