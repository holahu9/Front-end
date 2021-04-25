import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { loginUser } from './../../api/user';
import { toast } from 'react-toastify';
import { useLocation } from "react-router-dom";
import { AuthContext } from '../../context/AuthContext'
import './style.css'
function Login() {
  const { login } = useContext(AuthContext);
  const location = useLocation();
  const EmailRegister = location?.state?.request?.email
  const [email, setEmail] = useState(EmailRegister ? EmailRegister : '');
  const [password, setPassword] = useState("");
  const history = useHistory();
  const handlerLogin = (e) => {
    e.preventDefault();
    try {
      loginUser(email, password).then((result) => {
        if (result?.data?.code === 200) {
          toast.success("Login Success");
          let token = result?.data?.data?.token
          let userInfo = {
            name: result?.data?.data?.name,
            role: result?.data?.data?.role,
            email: result?.data?.data?.email,
            _id: result?.data?.data?._id,
          }
          login(token, userInfo)
          return history.push("/");
        }
        toast.error("Login Fail Check Email or Password");
      }).catch((error) => {
        console.log(error?.response?.data);
        if (error?.response?.data?.code == 401) return toast.error("Login Fail Check Email or Password");
        toast.error(error?.response?.data.message);
      })
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <section>
      <div className="containerLogin" >
        <div className="TitleLogin">
          <span style={{ color: '#FF0000' }}>L</span>
          <span style={{ color: '#66CC66' }}>O</span>
          <span style={{ color: '#FF9966' }}>G</span>
          <span style={{ color: '#eff0f7' }}>I</span>
          <span style={{ color: '#FF0066' }}>N</span>
        </div>
        <form onSubmit={handlerLogin}>
          <div class="form-group">
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
          </div>
          <div class="form-group">
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
          </div>
          <div className="containerBtnLogin">
            <button className="btn btn_" type="submit">Login</button>
          </div>
        </form>
        <p>Don't have an account? <Link to="/users/register">Sign Up</Link></p>
      </div>
    </section>
  );

}

export default Login;