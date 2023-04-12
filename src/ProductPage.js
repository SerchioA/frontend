import React from "react";
import "./ProductPage.css";
import { useEffect } from "react";

const ProductPage = ({
  product,
  list,
  setList,
  setCartCounter,
  cartCounter,
}) => {
  useEffect(() => {
    localStorage.setItem("myProduct", JSON.stringify(product));
  }, [product]);

  useEffect(() => {
    localStorage.setItem("myList", JSON.stringify(list));
  }, [list]);

  const addToCart = (elem) => {
    let check = false;
    list.forEach((element) => {
      if (elem.unique_id === element.unique_id) {
        check = true;
      }
    });
    if (!check) {
      setList([...list, elem]);
      setCartCounter((cartCounter += 1));
    }
  };

  return (
    <div className="wrapper">
      <div className="product-card-grid">
        <div className="prod-manufacturer-img-name">
          <div className="name-manufacturer">
            <span className="prod-manufacturer">{product.manufacturer} / </span>
            <span className="prod-name">{product.name}</span>
          </div>
          <img className="prod-image" src={product.image} alt="" />
        </div>
        <div className="prod-color-size">
          <span className="prod-color">
            <p className="text-info">Цвета:</p>
            {product.color.map((elem) => (
              <div>{elem}</div>
            ))}
          </span>
          <br />
          <span className="prod-size">
            <p className="text-info"> Размеры:</p>
            {product.size.map((elem) => (
              <div>{elem}</div>
            ))}
          </span>
        </div>
        <div className="price-add-to-cart">
          <span className="prod-price">{product.price} ₽</span>
          <br />
          {list.indexOf(product, 0) === -1 ? (
            <button
              id="cart-icon"
              onClick={() => {
                addToCart(product);
              }}
              className="add-to-cart-page"
            >
              Добавить в корзину
            </button>
          ) : (
            <button id="cart-icon" className="add-to-cart-page">
              Добавлено
            </button>
          )}
        </div>
      </div>
      <p className="text-description">Описание: </p>
      <div className="description">
        <span className="prod-description">{product.description}</span>
      </div>
    </div>
  );
};

export default ProductPage;
