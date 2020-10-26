import React from 'react';
import './Cart.css'

const Cart = (props) => {
    const cart = props.cart;
    if (cart.quantity) {
        var total = cart.reduce((total, prd) => total + prd.price * prd.quantity, 0);
    } else {
        var total = cart.reduce((total, prd) => total + prd.price, 0);
    }

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
            <h3>Items Order {cart.length}</h3>
            <h3>Product Price: ${total.toFixed(2)}</h3>
            <p><small>Shipping Cost: ${shipping}</small></p>
            <h3>Tax + VAT: ${tax}</h3>
            <h3>Total price: ${grandTotal}</h3>
            <br/>
            <br/>
            {
                props.children
            }
            
        </div>
    );
};

export default Cart;