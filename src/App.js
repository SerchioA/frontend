import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import Header from "./Header";
import ChooseByCategory from "./ChooseByCategory";
import Registration from "./Registration";
import Footer from "./Footer";
import ProductPage from "./ProductPage";
import { Routes, Route } from "react-router-dom";
import MissPage from "./MissPage";

const App = () => {
  const [products, setProducts] = useState([]);
  const [modalActive, setModalActive] = useState(false);
  const [product, setProduct] = useState(
    JSON.parse(localStorage.getItem("myProduct")) || {}
  );
  let [list, setList] = useState(
    JSON.parse(localStorage.getItem("myList")) || []
  );
  let [cartCounter, setCartCounter] = useState(
    parseInt(localStorage.getItem("myCounterrrr")) || 0
  );

  useEffect(() => {
    getProducts();
  }, []);
  const getProducts = () => {
    axios
      .get("https://imtbdev.pythonanywhere.com/api/products/")
      .then((response) => setProducts(response.data));
  };

  return (
    <div className="wrapper">
      <Header
        setModalActive={setModalActive}
        list={list}
        setList={setList}
        setCartCounter={setCartCounter}
        cartCounter={cartCounter}
      />
      <div className="main">
        <Registration
          modalActive={modalActive}
          setModalActive={setModalActive}
        />

        <Routes>
          <Route
            path="/"
            element={
              <ChooseByCategory
                products={products}
                setProducts={setProducts}
                setList={setList}
                list={list}
                setProduct={setProduct}
                setCartCounter={setCartCounter}
                cartCounter={cartCounter}
              />
            }
          />
          <Route
            path={`products/:unique_id`}
            element={
              <ProductPage
                products={products}
                product={product}
                setProduct={setProduct}
                list={list}
                setList={setList}
                setCartCounter={setCartCounter}
                cartCounter={cartCounter}
              />
            }
          />
          <Route path="*" element={<MissPage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};
export default App;
