import { useState, useEffect } from "react";
import Cart from "./Cart";
import { Link } from "react-router-dom";
import "./Header.css";
const Header = ({
  setModalActive,
  setList,
  list,
  setCartCounter,
  cartCounter,
}) => {
  let [cartActive, setCartActive] = useState(false);
  let [pageYOffsetNow, setPageYOffsetNow] = useState();

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset === pageYOffsetNow) {
        setCartActive(true);
      } else {
        setCartActive(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  function handleClickOutside(event) {
    const element = document.getElementById("cartModal");
    if (
      element &&
      !element.contains(event.target) &&
      event.target.id !== "cart-icon"
    )
      setCartActive(false);
  }
  useEffect(() => {
    localStorage.setItem("myCounterrrr", cartCounter.toString());
  }, [cartCounter]);

  return (
    <header className="header">
      <div className="header-icons">
        <img className="logo" src="../public/image.png" alt="" />
        <Link className="homeLink" to="/">
          AKZ
        </Link>
        <div className="cart-user-icons">
          <i
            onClick={() => setModalActive(true)}
            className="user-icon header-icon fa-solid fa-user fa-2xl"
          ></i>
          <i
            id="cart-icon"
            onClick={() => {
              setCartActive((cartActive = !cartActive));
              setPageYOffsetNow(window.pageYOffset);
            }}
            className={`fa-solid header-icon fa-cart-shopping fa-2xl cartIcon ${
              cartActive && `active`
            }`}
          >
            <span className="cartCounter">{cartCounter}</span>
          </i>
        </div>
      </div>
      {cartActive && (
        <div className="cartModal" id="cartModal">
          <Cart
            list={list}
            setList={setList}
            setCartCounter={setCartCounter}
            cartCounter={cartCounter}
          />
        </div>
      )}
    </header>
  );
};
export default Header;
