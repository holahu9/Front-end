import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "./components/Navbar/Navbar";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Profile from "./components/Profile/Profiles";
import Feature from "./components/Features/Feature";
import Reviews from "./components/Reviews/Reviews";
import AuthContextProvider from "./context/AuthContext";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import DetailProfile from "./components/DetailProfile/DetailProfile";

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Navbar />
        <Route exact path="/" component={Header} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/feature" component={Feature} />
        <Route exact path="/reviews" component={Reviews} />
        <Route exact path="/Detail-Profile/:id" component={DetailProfile} />
        <Footer />
        <ToastContainer style={{zIndex:9999999999999}}/>
      </Router>
    </AuthContextProvider>
  );
}

export default App;
