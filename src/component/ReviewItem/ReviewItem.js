import React from 'react';

const ReviewItem = (props) => {
    const {name, quantity, key, price} = props.product;
    const reviewItemStyle = {
        border: '1px solid #ccc',
        marginBottom: "5px",
        padding: "5px",
        marginLeft: "200px",
       
    }
    const productQuantity = {
        color: "black",
        marginBottom: "25px",
        fontWeight: "bold",
    }
    return (
        <div style={reviewItemStyle}>
            <h4 className="product-name">{name}</h4>
            <p >Quantity: {quantity}</p>
    <p><small>1 piece price: ${price}</small></p>
    <p style={productQuantity}><small>{quantity} piece price: ${price * quantity}</small></p>
            <button 
            className="buy-button"
            onClick={() => props.handleRemoveItem(key)}
            >Remove</button>
        </div>
    );
};

export default ReviewItem;