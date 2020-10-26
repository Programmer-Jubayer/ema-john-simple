import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import './Product.css';
import { Link } from 'react-router-dom';

const Product = (props) => {
    const {name, seller, price, stock, star, key} = props.product;
    // console.log(props)
    return (
        <div className="product">
            <div className="product-img">
                <img src={props.product.img} alt=""/>
            </div>
            <div className="product-content">
    <h3 className="product-name"><Link to={"/product/"+key}>{name}</Link></h3>
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
                {props.showAddToCart === true && <button 
                    className="buy-button" 
                    onClick={() => props.handleAddProduct(props.product)}>
                    <FontAwesomeIcon icon={faShoppingCart}/> Add to cart
                </button>}
                {props.showAddToCart === false && <button 
                    className="buy-button" 
                    onClick={() => props.handleAddProduct(props.product)}>
                    <FontAwesomeIcon icon={faShoppingCart}/> Review Order
                </button>}
            </div>
        </div>
    );
};

export default Product;