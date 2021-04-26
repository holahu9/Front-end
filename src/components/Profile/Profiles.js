import React, { useContext } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from './../../context/AuthContext';
import { createProfile } from '../../api/profile'
import { uploadImage } from '../../api/upload'
import { getIsCreateprofile } from '../../api/profile'
import { Link } from 'react-router-dom'
import Loading from '../../common/Loading'
import { getReviews } from '../../api/reviews'
import { FaStar } from "react-icons/fa";
import ModalGrid from './ModalGrid';
import InforProfile from './InforProfile';
import FormCreateProfile from './FormCreateProfile';
import ListReviews from './ListReviews';
import "./Style.css";
const Profiles = () => {
  const { userData, token } = useContext(AuthContext);
  const [numberPhone, setPhone] = React.useState('')
  const [salonName, setSallonName] = React.useState('')
  const [addrWebsite, setAddrWebsite] = React.useState('')
  const [urlPhoto, setUrlPhoto] = React.useState('https://res.cloudinary.com/dq8rwm2xl/image/upload/v1619358123/image/khr7mhtuttu5kweudkh1.jpg');
  const [inforProfle, setInforProfile] = React.useState(null)
  const [loading, setLoading] = React.useState(true)
  const [listReviews, setlistReviews] = React.useState(null)
  const [isTab, setTab] = React.useState(0)
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    (() => {
      if (token) {
        getIsCreateprofile(token).then((result) => {
          if (result?.data?.status === "success") {
            if (result?.data?.data) {
              setInforProfile(result?.data?.data)
            }
            setLoading(false)
          }
        }).catch((e) => {
          setInforProfile(null)
        })
      }
    })()
    return () => setInforProfile(null)
  }, [token])
  const handleClose = () => {
    setShow(false)
  }
  const handlerShow = () => {
    setShow(true)
  }

  React.useEffect(() => {
    (() => {
      if (inforProfle) {
        getReviews(inforProfle?._id).then((result) => {
          if (result?.data?.status === "success") {
            if (result?.data?.data) {
              setlistReviews(result?.data?.data)
            }

          }
        }).catch(() => {
          setlistReviews(null)
        })
      }
    })()
  }, [inforProfle])
  const handlerCreateProfile = (e) => {
    e.preventDefault();
    if (numberPhone.length < 5) return toast.error('phone length must be at least 5 characters long');
    try {
      createProfile(userData?.name, numberPhone, urlPhoto, salonName, addrWebsite, token).then((result) => {
        if (result?.data?.status === "success") toast.success('Create success');
        setPhone('')
        setSallonName('')
        setAddrWebsite('')
        window.location.reload()
      }).catch((e) => {
        toast.error('Create Fail');
      })
    } catch (error) {

    }
  }
  const onFileChange = (event) => {
    uploadImage(event.target.files[0]).then((result) => {
      if (result?.status === 200) setUrlPhoto(result?.data?.path)
    }).catch((e) => {
      console.log(e.response)
    })
  }

  const showListRevies = () => <ListReviews {...{listReviews}}></ListReviews>
  const ShowFormCreateProfile = () => <FormCreateProfile {...{
    handlerCreateProfile,
    userData,
    onFileChange,
    setPhone,
    numberPhone,
    setSallonName,
    salonName,
    setAddrWebsite,
    addrWebsite,
    urlPhoto
  }}></FormCreateProfile>

  const ShowInforProfile = () => <InforProfile {...{ inforProfle, handlerShow }}></InforProfile>
  return (
    <React.Fragment>
      {
        loading ?
          <Loading></Loading> : (
            <div className="conatinerProfile conatinerProfile_ container-fluid">
              <div className="containerTitleMenu">
                <Link to="/"><span className="title-wrap-home">Home</span></Link>
                <span className="card-title ">Profile</span>
              </div>
              <div className="container">
                {
                  (!inforProfle ? ShowFormCreateProfile() : (
                    <React.Fragment>
                      <div className="conainerItemInforProfile">
                        <div className="containerTabs">
                          <div onClick={() => setTab(0)} style={{
                            fontWeight: isTab === 0 ? 'bold' : 'normal',
                            background: isTab === 0 ? '#570f17' : '#FFF',
                          }} className="containerTabProfiles"><span style={{ color: isTab === 0 ? '#fff' : '#570f17' }}>Profile</span></div>
                          <div onClick={() => setTab(1)} style={{
                            fontWeight: isTab === 1 ? 'bold' : 'normal',
                            background: isTab === 1 ? '#570f17' : '#FFF',
                          }} className="containerTabReviewss"><span style={{ color: isTab === 1 ? '#fff' : '#570f17' }}>Seen Reviews</span></div>
                        </div>
                        {isTab === 0 && ShowInforProfile()}
                        {isTab === 1 && showListRevies()}
                      </div>
                    </React.Fragment>
                  ))
                }
              </div>
            </div>
          )
      }
      <ModalGrid {...{ show, handleClose, inforProfle, handlerShow,token }}></ModalGrid>
  
    </React.Fragment>

  )
}

export default Profiles
