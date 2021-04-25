import React from 'react';
import {Link} from "react-scroll";
import { EmailIcon, EmailShareButton, FacebookIcon, FacebookShareButton, LinkedinShareButton, LinkedinIcon } from "react-share";
//import "./Footer.css";
const Footer = () => {
    return (
        <div className="footer">
            <div className="container">
                <div className="row">
                    <div className="col-lg-4 col-md-6 col-sm-6">
                        <div className="d-flex">
                            <p>Members:</p>
                        </div>
                        <div className="d-flex">
                            <p>Duc Dinh</p>
                        </div>
                        <div className="d-flex">
                            <p>Danielle</p>
                        </div>
                        <div className="d-flex">
                            <p>Kokhob</p>
                        </div>
                        <div className="d-flex">
                            <p>Maryam</p>
                        </div>
                        <div className="d-flex">
                            <p>Kyle</p>
                        </div>
                    </div>
                    <div className=" col-lg-3 col-md-2 col-sm-6">
                    <div className="row">
                    <div className="col">
                        <Link smooth={true} to="home" offset={-110} className="footer-nav">Home</Link>
                        <br />
                        <Link smooth={true} to="reviews" offset={-110} className="footer-nav">About Us</Link>
                        <br />
                        <Link smooth={true} to="account" offset={-110} className="footer-nav">Reviews</Link>
                    </div>
                    <div className="col">
                        <Link smooth={true} to="about" offset={-110} className="footer-nav">Profile</Link>
                        <br />
                        <Link smooth={true} to="feature" offset={-110} className="footer-nav">Feature</Link>
                        <br />
                        <Link smooth={true} to="contacts" offset={-110} className="footer-nav">Contact</Link>
                    </div>

                    </div>
                    </div>
                    <div className="col-lg-5 col-md-5 col-sm-6 align-items-center">
                    <div className="d-flex justify-content-center">
                        
                        <LinkedinShareButton 
                        url={"https://www.linkedin.com/in/duc-dinh-5013a9bb/"}
                        quote={"FullStack Developer"}
                        hashtag="#javascript"
                        >
                            <LinkedinIcon className="mx-3" size={36}/>
                        </LinkedinShareButton>
                        <EmailShareButton 
                        url={"https://www.linkedin.com/in/duc-dinh-5013a9bb/"}
                        >         
                            <EmailIcon className="mx-3" size={36}/>
                        </EmailShareButton>


                        <FacebookShareButton 
                        url={"https://www.facebook.com/thienduc.dinh"}
                        >         
                            <FacebookIcon className="mx-3" size={36}/>
                        </FacebookShareButton>

                    </div>
                    <p className="p-3 text-center">
                        Copyright&copy;
                        {new Date().getFullYear()} | All Rights Reserved
                    </p>

                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default Footer