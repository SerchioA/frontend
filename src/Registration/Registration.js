import { useState } from "react";
import "./registration.css";
// import axios from "axios";
import RegLog from "./RegLog";

const Registration = ({ modalActive, setModalActive }) => {
  const [loginActive, setloginActive] = useState(true);
  const [registerActive, setregisterActive] = useState(false);

  function regButtonHandle() {
    setregisterActive(true);
    setloginActive(false);
  }
  function loginButtonHandle() {
    setregisterActive(false);
    setloginActive(true);
  }

  return (
    <div
      className={
        modalActive ? "registration-modal active" : "registration-modal"
      }
      onClick={() => setModalActive(false)}
    >
      <div
        className="registration-modal__content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="btnGroup">
          <span className="regButton " onClick={() => regButtonHandle()}>
            Регистрация
          </span>
          <span className="loginButton " onClick={() => loginButtonHandle()}>
            Войти
          </span>
        </div>
        <RegLog
          loginActive={loginActive}
          registerActive={registerActive}
          setModalActive={setModalActive}
        />
      </div>
    </div>
  );
};

export default Registration;
