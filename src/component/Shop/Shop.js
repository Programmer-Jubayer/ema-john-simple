import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';
import { Link } from 'react-router-dom';

const Shop = () => {
    const first10 = fakeData.slice(0,10);
    const [product, setProduct] = useState(first10);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const savedProduct = getDatabaseCart();
        const productKeys = Object.keys(savedProduct);
        const cartProducts = productKeys.map(existingkey => {
            const product = fakeData.find(pd => pd.key === existingkey);
            product.quantity = savedProduct[existingkey];
            return product;
        });
        setCart(cartProducts);
    }, []);

    const handleAddProduct = (product) => {
        const tobeAdded = product.key;
        const sameProducts = cart.find(pd => pd.key === tobeAdded);
        let count = 1;
        let newCart;
        if(sameProducts) {
            count = sameProducts.quantity + 1;
            sameProducts.quantity = count;
            const others = cart.filter(pd => pd.key !== tobeAdded);
            newCart = [...others, sameProducts];
        } else {
            product.quantity = 1;
            newCart = [...cart, product];
        }
        
        newCart = [...cart, product];
        setCart(newCart);
        
        addToDatabaseCart(product.key, count);
    };

    return (
        <div className="parent-container">
            <div className="product-container">
                    {
                        product.map(el => <Product showAddToCart={true} product={el} handleAddProduct={handleAddProduct} key={el.key}></Product>)
                    }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to='/review'>
                        <button className="buy-button">Review Your Order</button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;