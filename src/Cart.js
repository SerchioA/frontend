import React from "react";
import "./Cart.css";
const Cart = ({ list, setList, setCartCounter, cartCounter }) => {
  let index1 = 0;
  let total = list.reduce((total, current) => total + Number(current.price), 0);
  const deleteFromCart = (id) => {
    setList(list.filter((el) => el.unique_id !== id));
  };

  if (list.length === 0) {
    return <div className="empty-cart">Товаров нет :(</div>;
  } else {
    return (
      <div className="cart-List">
        <ul>
          {list.map(({ image, name, price, unique_id }) => (
            <li className="cart-item" key={index1++}>
              <img className="cart-image" src={image} alt="" />
              <div className="cart-name">{name} </div>
              <br />
              <div className="cart-price">{price} ₽</div>
              <div
                onClick={() => {
                  deleteFromCart(unique_id);
                  setCartCounter((cartCounter -= 1));
                }}
                className="delete-from-cart"
              >
                ❌
              </div>
            </li>
          ))}
        </ul>
        <div className="total">
          <p className="total-price">Сумма: {total}₽</p>
          <button className="purchase-button">Купить</button>
        </div>
      </div>
    );
  }
};

export default Cart;
