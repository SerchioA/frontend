import React, { useEffect, useState } from "react";
import axios from "axios";

const RegLog = ({ loginActive, registerActive, setModalActive }) => {
  const [usernameLog, setUsernameLog] = useState("");
  const [passwordLog, setPasswordLog] = useState("");
  const [emailReg, setEmailReg] = useState("");
  const [usernameReg, setUsernameReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");
  const [autintificated, setAutintificated] = useState(false);

  const handleSubmitRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://imtbdev.pythonanywhere.com/api/register/",
        {
          username: usernameReg,
          email: emailReg,
          password: passwordReg,
        }
      );
      if (response.status === 201) {
        setModalActive(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://imtbdev.pythonanywhere.com/api/login/",
        {
          username: usernameLog,
          password: passwordLog,
        }
      );
      localStorage.setItem("token", response.data.access);
      if (response.status === 200) {
        alert(`Привет ${usernameLog}`);
        setAutintificated(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (loginActive) {
    return (
      <form onSubmit={handleSubmitLogin}>
        <h1 className="loginIcon">AKZ</h1>
        <input
          type="text"
          className="input"
          placeholder="Email или имя пользователя"
          value={usernameLog}
          onChange={(event) => setUsernameLog(event.target.value)}
          required
        />
        <input
          type="password"
          value={passwordLog}
          className="input"
          placeholder="Пароль"
          onChange={(event) => setPasswordLog(event.target.value)}
          required
        />
        <button type="submit" className="submit">
          Войти
        </button>
      </form>
    );
  } else if (registerActive) {
    return (
      <form onSubmit={handleSubmitRegister}>
        <h1 className="loginIcon">AKZ</h1>
        <input
          type="text"
          className="input"
          placeholder="Имя пользователя"
          value={usernameReg}
          required
          onChange={(e) => setUsernameReg(e.target.value)}
        />
        <input
          type="email"
          className="input"
          placeholder="Email"
          value={emailReg}
          required
          onChange={(e) => setEmailReg(e.target.value)}
        />
        <input
          type="password"
          className="input"
          placeholder="Пароль"
          value={passwordReg}
          required
          onChange={(e) => setPasswordReg(e.target.value)}
        />
        <button type="submit" className="submit">
          Зарегистрироваться
        </button>
      </form>
    );
  }
};

export default RegLog;
