import React, { useContext } from 'react';
import "./Style.css";
import { AuthContext } from '../../context/AuthContext';
import { useParams, useHistory } from "react-router-dom";
import { getProfile } from '../../api/profile'
import { getReviewsOfUser } from '../../api/reviews'
import ModalGrid from './ModalGrid';
import Loading from '../../common/Loading'
import { Link } from 'react-router-dom'
const DetailProfile = () => {
  const { userData, token } = useContext(AuthContext);
  const [inforProfile, setInforProfile] = React.useState(null)
  const [isReviews, setRevies] = React.useState(false)
  const [show, setShow] = React.useState(false);
  const [loading, setLoading] = React.useState(true)
  const { id } = useParams();
  const history = useHistory();
  React.useEffect(() => {
    (() => {
      if (id) {
        if (token) {
          getReviewsOfUser(id, token).then((result) => {
            if (result?.data?.data) {
              setRevies(true)
            }
          }).catch(() => {
            setRevies(false)
          })
        }
        getProfile(id).then((result) => {
          if (result?.data?.status === "success") {
            setInforProfile(result?.data?.data)
            setLoading(false)
          }
        }).catch(() => {
          setInforProfile(null)
        })

      }
    })()
    return () => setInforProfile(null)
  }, [])
  const handlerReviews = () => {
    if (!token) {
      return history.push("/login");
    }
    setShow(true)
  }
  const handleClose = () => {
    setShow(false)
  }

  const ShowInforProfile = () => {
    return (
      <div className="conainerItemInforProfile">
        <div className="containerUsername flex">
          <span>Name :</span>
          <span>{inforProfile?.name}</span>
        </div>
        <div className="containerPhone flex">
          <span>Phone :</span>
          <span>{inforProfile?.phone}</span>
        </div>
        <div className="containerImage flex">
          <span>Photo :</span>
          <img src={inforProfile?.image} alt="avatar" className="img-fluid" />
        </div>
        <div className="containerSalonName flex">
          <span>Salon name :</span>
          <span>{inforProfile?.salon_name}</span>
        </div>
        <div className="containerWebsite flex">
          <span>Website :</span>
          <span>{inforProfile?.website}</span>
        </div>
        <div className="containerReviews flex">
          <span>Reviews :</span>
          <span>{inforProfile?.reviews_number}</span>
        </div>
        {
          !isReviews ? (
            <div className="containerBtnReviews flex">
              <button onClick={handlerReviews}>Reviews</button>
            </div>
          ) : null
        }

      </div>
    )
  }

  return (
    <React.Fragment>
      {
        loading ?
          <Loading></Loading> : (
            <div className="conatinerProfile container-fluid">
              <div className="containerTitleMenu">
                <Link to="/"><span className="title-wrap-home">Home</span></Link>
                <span className="card-title ">Profile {inforProfile?.name ? inforProfile?.name : ''}</span>
              </div>
              <div className="container">
                {
                  inforProfile ? ShowInforProfile() : null
                }

              </div>
              <ModalGrid {...{ show, handleClose, id,setRevies }}></ModalGrid>
            </div>
          )
      }
    </React.Fragment>

  )
}

export default DetailProfile
