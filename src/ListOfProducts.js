import axios from "axios";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const ListOfProducts = ({
  selectedCategory,
  products,
  setList,
  list,
  setProduct,
  selectedProducts,
  setSelectedProducts,
  setCartCounter,
  cartCounter,
}) => {
  // http://127.0.0.1:8000/api/products/
  useEffect(() => {
    axios
      .get(
        `https://imtbdev.pythonanywhere.com/api/products/?category=${selectedCategory}`
      )
      .then((response) => {
        setSelectedProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [selectedCategory]);

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

  function handleClick(e) {
    e.preventDefault();
  }
  useEffect(() => {
    localStorage.setItem("myList", JSON.stringify(list));
  }, [list]);

  if (selectedCategory !== "") {
    return (
      <div className="listOfProducts">
        {selectedProducts.map((elem) => (
          <Link
            key={elem.price}
            onClick={() => setProduct(elem)}
            className="link"
            to={`products/${elem.unique_id}`}
          >
            <div className="cardOfproduct">
              <img className="prod-img" src={elem.image} alt="" />
              <span className="manufacturer">{elem.manufacturer}</span>
              <span className="name">{elem.name}</span>
              <div className="price-and-add-to-cart" onClick={handleClick}>
                <span className="price">{elem.price} ₽</span>
                <i
                  id="cart-icon"
                  className="add-to-cart fa-solid fa-cart-plus fa-xl"
                  onClick={() => {
                    addToCart(elem);
                  }}
                ></i>
              </div>
            </div>
          </Link>
        ))}
      </div>
    );
  } else if (selectedCategory === "") {
    return (
      <div className="listOfProducts">
        {products.map((elem) => (
          <Link
            key={elem.image}
            onClick={() => setProduct(elem)}
            className="link"
            to={`products/${elem.unique_id}`}
          >
            <div className="cardOfproduct">
              <img className="prod-img" src={elem.image} alt="" />
              <span className="manufacturer">{elem.manufacturer}</span>
              <span className="name">{elem.name}</span>
              <div className="price-and-add-to-cart" onClick={handleClick}>
                <span className="price">{elem.price} ₽</span>
                <i
                  id="cart-icon"
                  className="add-to-cart fa-solid fa-cart-plus fa-xl"
                  onClick={() => {
                    addToCart(elem);
                  }}
                ></i>
              </div>
            </div>
          </Link>
        ))}
      </div>
    );
  }
};
export default ListOfProducts;
