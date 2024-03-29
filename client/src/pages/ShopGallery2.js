import React from "react";
import { NavLink, withRouter } from 'react-router-dom';
import { Link } from "react-router-dom";
import { pluralize } from "../utils/helpers"
import { useStoreContext } from "../utils/GlobalState";
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../utils/actions";
import { idbPromise } from "../utils/helpers";

const ShopGallery2 = ({item}) => {

    const [state, dispatch] = useStoreContext();

  const {
    image,
    name,
    _id,
    description,
    price,
    quantity
  } = item;

  const { cart } = state

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === _id)
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: _id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...item, purchaseQuantity: 1 }
      });
      idbPromise('cart', 'put', { ...item, purchaseQuantity: 1 });
    }
  }
    return (
      <>
      <div className="fullscreen-div">
          <div className="btn-parent">
          <NavLink to="/1"><div className="arrow-left"></div></NavLink>
          </div>
  
          <div className="column">
  
          <div className="subnav-parent"></div>
  
      <div className="login-form">
          <h2 className="tf-h2">SHOP</h2> 
          <div>
          <div className="shop-card">
              <div className="card-filler">
                  <img src={image}></img>
              </div>
  
              <div className="card-footer">
                  <p className="card-caption">{name}</p>
                  <p className="card-caption">{price}</p>
              </div>
  
  </div>
  <div className="card-desc">
      <p className="item-desc">{description}</p>
      <p className="item-desc">{quantity} in stock</p>
      <button className="add-to-cart" onClick={addToCart}>ADD TO CART</button>
  </div>
  
          </div>
          
      </div>
  
          <div className="subnav-parent">
              <div className="subnav"></div>
              <div className="subnav subnav-active"></div>
              <div className="subnav"></div>
          </div>
  
      </div>

      <div className="btn-parent" >

    <NavLink to="/3"><div className="arrow-right"></div></NavLink>
    </div>
    </div>
  
      </>
    );
  };
  
  export default withRouter(ShopGallery2);