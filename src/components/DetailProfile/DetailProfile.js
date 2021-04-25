import React, { useContext } from 'react';
import "./Style.css";
import { AuthContext } from '../../context/AuthContext';
import { useParams, useHistory } from "react-router-dom";
import { getProfile } from '../../api/profile'
import { getReviewsOfUser } from '../../api/reviews'
import ModalGrid from './ModalGrid';
const DetailProfile = () => {
  const { userData, token } = useContext(AuthContext);
  const [inforProfile, setInforProfile] = React.useState(null)
  const [isReviews, setRevies] = React.useState(false)
  const [show, setShow] = React.useState(false);
  const { id } = useParams();
  const history = useHistory();
  React.useEffect(() => {
    (() => {
      if (id) {
        getProfile(id).then((result) => {
          if (result?.data?.status === "success") setInforProfile(result?.data?.data)
        }).catch(() => {
          setInforProfile(null)
        })
        if (token) {
          getReviewsOfUser(id, token).then((result) => {
            if (result?.data?.data) {
              setRevies(true)
            }
          }).catch(() => {
            setRevies(false)
          })
        }
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
  const showInfor = () => {
    return (
      <div>
        <span>{inforProfile.name}</span>
      </div>
    )
  }
  return (
    <div className="login1">
      <div className="container emp-profile">
        {
          inforProfile ? showInfor() : null
        }
        {
          !isReviews ? <button onClick={handlerReviews}>ReViws</button> : null
        }

      </div>
      <ModalGrid {...{ show, handleClose, id }}></ModalGrid>
    </div>
  )
}

export default DetailProfile
