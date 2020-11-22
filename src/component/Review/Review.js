import React, { useState, useEffect } from 'react';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import { Link, useHistory } from 'react-router-dom';
import happyImage from '../../images/giphy.gif';



const Review = () => {
    const [cart, setCart] = useState([]);
    const [placeOrder, setPlacedOrder] = useState(false);

    let history = useHistory();
    
    const handleProceedOrder = () => {
        history.push('/shipment');
        console.log("clicked")
    }

    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKey = Object.keys(savedCart);
        const cartProducts = productKey.map(key => {
        const product = fakeData.find(pd => pd.key === key);
        product.quantity = savedCart[key];
        return product;
        })
        setCart(cartProducts);

    }, []);

    const handleRemoveItem = (productKey) => {
        console.log("clicked done", productKey);
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }
    
    let thankYou;
    if(placeOrder) {
        thankYou = <img style={{marginTop:"13px", marginLeft:"260px"}} src={happyImage} alt=""/>
    }

    return (
        <div className="parent-container">
            <div className="product-container">
           {
            cart.map(product => <ReviewItem 
            product={product} 
            key={product.key}
            handleRemoveItem = {handleRemoveItem}
            ></ReviewItem>)
           }   
           { thankYou }
           
            </div> 
            <div className="cart-container">
                <Cart cart={cart}>
                <button onClick={handleProceedOrder} className="buy-button">Proceed Order</button>  
                </Cart>
            </div>
        </div>
    );
};

export default Review;