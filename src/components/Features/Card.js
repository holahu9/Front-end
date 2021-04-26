import React from 'react';
import { Link } from 'react-router-dom'
const Projects = (props) => {
    return (
        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-3 containerItemFeatures">
            <div className="card h-100 ContainerItemFeatures">
                <div className="card-body text-center cardBodyBorder">
                    <h4 className="card-title">{props.name}</h4>
                    <h7 className="card-title">{props.salon_name}</h7>
                </div>

                <div className="embed-responsive embed-responsive-4by3">
                    <img src={props.image}
                        className="img-fluid card-img-top embed-responsive-item" alt="nail_pic" />
                </div>

                <div className="card-foot">
                    <div className="card-footer text-center">
                        <Link to={`/Detail-Profile/${props._id}`} 
                            className="btn btn-outline myButton buttonMargin">View</Link>

                    </div>
                </div>
            </div>

        </div>
    );
}

export default Projects;