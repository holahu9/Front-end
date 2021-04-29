import React from 'react';
import {FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub} from 'react-icons/fa';
import image from "../../assets/slide_0.jpg";
import "./style.css";

const About = () => {
    return (
    
        
      <React.Fragment>  
            <div className="about">
                <div className="row">
                
                    <div className="col-lg-7 col-sm-12 ">
                      
                        <ul className="header_ul">
                            <li><FaFacebookF /></li>
                            <li><FaTwitter/></li>
                            <li><FaLinkedinIn/></li>
                            <li><FaGithub/></li>

                        </ul>
                        
                        <p>
          Nailed It! is an application created for users to leave reviews for nail techinicans within the DMV, 
          specifically in the Tysons Corner area. Here, nail technicians will create their own profiles after registration,
          to be featured in Feature page. Then users log into their account and find their nail
          tech to leave a review based on their services.  </p>
                    
                    
                    </div>

                    <div className="col-lg-5 col-sm-12">
                        <img className = "pic" src={image} alt="photo"></img>

                    </div>

                </div>
            </div>
            </React.Fragment>      
        
    )
}

export default About;















