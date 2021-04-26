import React from 'react';
import { Link } from 'react-router-dom'
import { BsStarHalf, BsStarFill, BsStar } from "react-icons/bs";
const Projects = (props) => {
    const showRating = () => {
        return (
            <div className='containerStar'>
                {props?.star_rate - Math.floor(props?.star_rate) > 0 ? (
                    <React.Fragment>
                        {
                            Array(Math.floor(props?.star_rate)).fill(0).map((_, index) => {
                                console.log(index)
                                return (
                                    <BsStarFill
                                        key={index}
                                        size={24}
                                        style={{
                                            marginRight: 10,
                                            cursor: "pointer",
                                            color: 'rgb(255 185 13)'
                                        }}
                                    />
                                )
                            })
                        }
                        <BsStarHalf
                            size={24}
                            style={{
                                marginRight: 10,
                                cursor: "pointer",
                                color: 'rgb(255 185 13)'
                            }}
                        />
                        {
                            5 - Math.floor(props?.star_rate) - 1 === 0 ? null : (
                                Array(Math.floor(5 - Math.floor(props?.star_rate) - 1)).fill(0).map((_, index) => {
                                    return (
                                        <BsStar
                                            key={index}
                                            size={24}
                                            style={{
                                                marginRight: 10,
                                                cursor: "pointer",
                                                color: 'rgb(255 185 13)'
                                            }}
                                        />
                                    )
                                })
                            )
                        }
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        {
                            Array(Math.floor(props?.star_rate)).fill(0).map((_, index) => {
                                return (
                                    <BsStarFill
                                        key={index}
                                        size={24}
                                        style={{
                                            marginRight: 10,
                                            cursor: "pointer",
                                            color: 'rgb(255 185 13)'
                                        }}
                                    />
                                )
                            })
                        }
                        {
                            5 - props?.star_rate === 0 ? null : (
                                Array(Math.floor(5 - props?.star_rate)).fill(0).map((_, index) => {
                                    return (
                                        <BsStar
                                            key={index}
                                            size={24}
                                            style={{
                                                marginRight: 10,
                                                cursor: "pointer",
                                                color: 'rgb(255 185 13)'
                                            }}
                                        />
                                    )
                                })
                            )
                        }

                    </React.Fragment>
                )
                }
            </div>
        )
    }
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
                        {showRating()}
                        <Link to={`/Detail-Profile/${props._id}`}
                            className="btn btn-outline myButton buttonMargin">View</Link>

                    </div>
                </div>
            </div>

        </div>
    );
}

export default Projects;