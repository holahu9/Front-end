import { useState, useCallback, useEffect } from "react";
import CryptoJS from "crypto-js";
export const SECRET_KEY = 'kjsdfoqweoirsldfjkhsfoiwfjhasdfjkhs';

// let logoutTimer;
function setCookie(name, value, expires) {
  document.cookie =
    name + "=" + (value || "") + "; expires=" + expires + "; path=/";
}
function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}
function eraseCookie(name) {
  document.cookie = name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}

export const useAuth = () => {
  const [token, setToken] = useState(false);
  const [user, setUser] = useState({});

  const login = useCallback((token, userData, expirationDate) => {
    setToken(token);
    setUser(userData);
    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setCookie("token", token, tokenExpirationDate.toUTCString());
    const cryptoText = CryptoJS.AES.encrypt(
      JSON.stringify(userData),
      SECRET_KEY
    ).toString();
    setCookie("userData", cryptoText, tokenExpirationDate.toUTCString());
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    eraseCookie("userData");
  }, []);
  useEffect(() => {
    const token = getCookie("token");
    const userData = getCookie("userData");

    if (token && userData) {
      const data = JSON.parse(
        CryptoJS.AES.decrypt(userData, SECRET_KEY).toString(CryptoJS.enc.Utf8)
      );
      login(token, data);
    }
  }, []);

  return { token, login, logout, userData: user };
};
