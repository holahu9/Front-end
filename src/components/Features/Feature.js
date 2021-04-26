
import React from "react";
import Card from "./Card";
import { getListProfile } from './../../api/profile'
import './style.css'
import { Link } from 'react-router-dom'
import Loading from '../../common/Loading'
const Feature = () => {
    const [listProfile, setListProfile] = React.useState([])
    const [loading, setLoading] = React.useState(true)
    React.useEffect(() => {
        getListProfile().then((result) => {

            if (result?.data?.status === "success") {
                setListProfile(result?.data?.data)
                setLoading(false)
            }
        }).catch(() => {
            setListProfile([])
        })
        return () => {
            setListProfile([])
        }
    }, [])

    return (
        <section className="containerFeatures">
            <div className="container-fluid containerColor">
                <div className="row">
                    <div className="card-body mt-5">
                        <div className="containerTitleMenu">
                            <Link to="/"><span className="title-wrap-home">Home</span></Link>
                            <span className="card-title ">Features</span>
                        </div>
         
                        {
                            loading ? <Loading></Loading>: (
                                <div className="row ">
                                    { listProfile.map(item => (
                                        <Card
                                            id={item.id}
                                            name={item.name}
                                            image={item.image}
                                            link={item.link}
                                            salon_name={item.salon_name}
                                            _id={item._id}
                                            phone={item.phone}
                                            star_rate={item.star_rate}
                                            key={item._id}
                                        />
                                    ))}
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </section>
    );
}



export default Feature;