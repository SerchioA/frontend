import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import ListOfProducts from "./ListOfProducts";

const ChooseByCategory = ({
  products,
  setProducts,
  setList,
  list,
  setProduct,
  setCartCounter,
  cartCounter,
}) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  let [selectedProducts, setSelectedProducts] = useState([]);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = () => {
    axios
      .get("https://imtbdev.pythonanywhere.com/api/categories/")
      .then((response) => setCategories(response.data))
      .catch((error) => console.error(error));
  };

  const handleCategorySelect = (name) => {
    setSelectedCategory(name);
  };

  return (
    <div className="ChooseByCategory">
      <div className="selectCategory">
        <div className="categories-buttons">
          <ul className="price-sort">
            <span className="category">Цена</span>
            <button
              className="chooseBtn"
              onClick={() => {
                setSelectedProducts(
                  [...selectedProducts].sort((a, b) => b.price - a.price)
                );
                setProducts([...products].sort((a, b) => b.price - a.price));
              }}
            >
              <li>по убыванию</li>
            </button>
            <button
              className="chooseBtn"
              onClick={() => {
                setSelectedProducts(
                  [...selectedProducts].sort((a, b) => a.price - b.price)
                );
                setProducts([...products].sort((a, b) => a.price - b.price));
              }}
            >
              <li>по возрастанию</li>
            </button>
          </ul>
          <span className="category">Категории</span>
          {categories.map((elem) => (
            <button
              key={elem.content}
              type="button"
              className="chooseBtn menu-trigger"
              onClick={() => {
                handleCategorySelect(elem.name);
              }}
            >
              {elem.name}
            </button>
          ))}
          <button
            type="button"
            className="chooseBtn menu-trigger"
            onClick={() => {
              handleCategorySelect("");
            }}
          >
            Все
          </button>
        </div>
      </div>

      <ListOfProducts
        selectedCategory={selectedCategory}
        products={products}
        setList={setList}
        list={list}
        setProduct={setProduct}
        selectedProducts={selectedProducts}
        setSelectedProducts={setSelectedProducts}
        setCartCounter={setCartCounter}
        cartCounter={cartCounter}
      />
    </div>
  );
};

export default ChooseByCategory;
