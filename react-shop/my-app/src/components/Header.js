import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import Order from "./Order";
const showOrders = (props) => {
  let sum = 0;
  props.orders.forEach((el) => (sum += Number.parseFloat(el.price)));
  return (
    <div>
      {props.orders.map((el) => (
        <Order onDelete={props.onDelete} key={el.id} item={el} />
      ))}
      <p className="sum">
        Total amount: {new Intl.NumberFormat().format(sum)} $
      </p>
    </div>
  );
};
const showNothing = () => {
  return (
    <div className="nothing"> You have no items in your shopping bag. </div>
  );
};
export default function Header(props) {
  return (
    <header>
      <div>
        <span className="logo">Shopping</span>
        <ul className="nav">
          <li>About</li>
          <li>Contacts</li>
          <li>Office</li>
        </ul>
        <FaShoppingCart
          onClick={() => props.changeCartOpen()}
          className={`shop-cart-button ${props.cartOpen && "active"}`}
        />

        {props.cartOpen && (
          <div className="shop-cart">
            {props.orders.length > 0 ? showOrders(props) : showNothing()}
          </div>
        )}
      </div>
      <div className="presentation"></div>
    </header>
  );
}
