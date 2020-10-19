import React from 'react';
import './Cart.css'

const Cart = (props) => {
    const cart = props.cart;
    const total = cart.reduce((total, prd) => total + prd.price, 0);

    let shipping = 0;
    if (total > 35) {
        shipping = 0;
    } else if (total >= 15) {
        shipping = 4.99;
    } else if (total > 0) {
        shipping = 12.99;
    } 

    const tax = parseFloat((total * 0.12).toFixed(2));

    const grandTotal = (total + shipping + tax).toFixed(2);

    return (
        <div>
            <h2 className="orderSum">Order Summery</h2>
            <h5>Placed Order {cart.length}</h5>
            <h4>Product Price: ${total.toFixed(2)}</h4>
            <p><small>Shipping Cost: ${shipping}</small></p>
            <h4>Tax + VAT: ${tax}</h4>
            <h4>Total price: ${grandTotal}</h4>
        </div>
    );
};

export default Cart;