import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";

import { registerUser } from './../../api/user';
import { toast } from 'react-toastify';
function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVerify, setPasswordVerify] = useState("");
  const [userName, setUserName] = useState("");
  const [role, setRole] = useState("1");

  const history = useHistory();

  const handlerRegister = (e) => {
    e.preventDefault();
    try {
      if (password != passwordVerify) return toast.error("Confirm Your Password Fail");
      if (password.length < 5) return toast.error("Password length must be at least 5 characters long");
      console.log(email, password, role)
      registerUser(email, userName, password, role).then(result => {
        if (result?.data?.code === 200) {
          toast.success("Register Success");
          history.push("/login", {
            request: {
              email,
            }
          });
        }
      }).catch(error => {
        if (error?.response?.data?.code === 401) return toast.error("Register Fail");
        toast.error(error?.response?.data?.message);
      })
    } catch (err) {
      toast.error("Register Fail")
    }
  };
  return (
    <section>
      <div className="containerRegister">
        <div className="TitleRegister">
          <span style={{ color: '#FF0000' }}>R</span>
          <span style={{ color: '#66CC66' }}>E</span>
          <span style={{ color: '#FF9966' }}>G</span>
          <span style={{ color: '#eff0f7' }}>I</span>
          <span style={{ color: '#FF0066' }}>S</span>
          <span style={{ color: '#FF0000' }}>T</span>
          <span style={{ color: '#66CC66' }}>E</span>
          <span style={{ color: '#FF9966' }}>R</span>
        </div>
        <form onSubmit={handlerRegister}>
          <div className="form-group  text-left">
            <label htmlFor="">What is Your Email ?</label>
            <div className="text">
              <input
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
            </div>
          </div>
          <div className="form-group  text-left">
            <label htmlFor="">Username</label>
            <div className="text">
              <input
                type="text"
                placeholder="username"
                onChange={(e) => setUserName(e.target.value)}
                value={userName}
                required
              />
            </div>
          </div>
          <div className="form-group  text-left">
            <label htmlFor="">Enter Your PassWord</label>
            <div className="text">
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />
            </div>
          </div>
          <div className="form-group  text-left">
            <label htmlFor=""> Confirm Your Password</label>
            <div className="text">
              <input
                type="password"
                placeholder="Verify your password"
                onChange={(e) => setPasswordVerify(e.target.value)}
                value={passwordVerify}
                required
              />
            </div>
          </div>
          <div className="form-group  text-left">
            <label htmlFor="">Choose Your Role</label>
            <div className="text">
              <select
                style={{ width: 100 }}
                type="role"
                placeholder="Choose Your Role:"
                onChange={(e) => setRole(e.target.value)}
              >
                <option selected="selected" value='1' >User</option>
                <option value='2' >NailTech</option>
              </select>
            </div>
          </div>
          <div className="containerBtnLogin">
            <button className="btn btn_" type="submit">Sign Up</button>
          </div>
      
        </form>
      </div>
    </section>
  );
}

export default React.memo(Register);