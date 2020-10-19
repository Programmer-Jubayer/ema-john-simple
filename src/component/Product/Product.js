import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF } from '@fortawesome/free-brands-svg-icons'
import './Product.css';

const Product = (props) => {
    const {name, seller, price, stock, star} = props.product;
    return (
        <div className="product">
            <div className="product-img">
                <img src={props.product.img} alt=""/>
            </div>
            <div className="product-content">
                <h3 className="product-name">{name}</h3>
                <p>by: {seller}</p>
                <div className="product-detail">
                    <div className="product-left">
                        <h2>Price: ${price}</h2>
                        <h4>Only {stock} left in stock - order soon</h4>
                    </div>
                    <div className="product-right">
                        <h2>{star}</h2>
                        <h2>Features</h2>
                    </div>
                </div>
                <button 
                    className="buy-button" 
                    onClick={() => props.handleAddProduct(props.product)}>
                    <FontAwesomeIcon icon={faShoppingCart}/> Add to cart
                </button>
            </div>
        </div>
    );
};

export default Product;