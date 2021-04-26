import React, { useContext } from 'react';
import "./Style.css";
import { toast } from 'react-toastify';
import { AuthContext } from './../../context/AuthContext';
import { createProfile } from '../../api/profile'
import { uploadImage } from '../../api/upload'
import { getIsCreateprofile } from '../../api/profile'
import { Link } from 'react-router-dom'
import Loading from '../../common/Loading'
const Profiles = () => {
  const { userData, token } = useContext(AuthContext);
  const [numberPhone, setPhone] = React.useState('')
  const [salonName, setSallonName] = React.useState('')
  const [addrWebsite, setAddrWebsite] = React.useState('')
  const [urlPhoto, setUrlPhoto] = React.useState('https://res.cloudinary.com/dq8rwm2xl/image/upload/v1619358123/image/khr7mhtuttu5kweudkh1.jpg');
  const [inforProfle, setInforProfile] = React.useState(null)
  const [loading, setLoading] = React.useState(true)
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
  const ShowFormCreateProfile = () => {
    return (
      <form onSubmit={handlerCreateProfile}>
        <div className="conainerCreateInforProfile">
          <h3 className="title">  Welcome Back!  </h3>
          <h5 className="title"> Hello {userData?.name ? userData?.name : ''}   </h5>
          <div className="containerRating">
            <span className="proile-rating">Rating : <span>8/10</span></span>
          </div>
          <div className="containerUserName">
            <span>Name</span>
            <span>{userData?.name ? userData?.name : ''}</span>
          </div>
          <div className="containerPhone flex">
            <span>Phone:</span>
            <input
              type="text"
              placeholder="Number Phone"
              onChange={(e) => setPhone(e.target.value)}
              value={numberPhone}
              required
            />
          </div>
          <div className="flex">
            <span>Salon Name</span>
            <input
              type="text"
              placeholder="Salon Name"
              onChange={(e) => setSallonName(e.target.value)}
              value={salonName}
              required
            />
          </div>
          <div className="flex">
            <span>Website</span>
            <input
              type="text"
              placeholder="Website"
              onChange={(e) => setAddrWebsite(e.target.value)}
              value={addrWebsite}
              required
            />
          </div>
          <div className="profile-img">
            <span>Photo</span>
            <img src={urlPhoto} alt="avatar" />
            <div className="file btn btn-lg btn-primary">
              Change Photo
              <input type="file" name="file" onChange={onFileChange} required />
            </div>
          </div>
          <div className="btnSubmit">
            <input type="submit" className="profile-edit-btn" name="btnAddMore" defaultValue="Edit Profile" />
          </div>
        </div>
      </form>
    )
  }
  const ShowInforProfile = () => {
    return (
      <div className="conainerItemInforProfile">
        <div className="containerTabs">
          <div  className="containerTabProfiles"><span>Profile</span></div>
        </div>
        <div className="containerUsername flex">
          <span>Name :</span>
          <span>{inforProfle?.name}</span>
        </div>
        <div className="containerPhone flex">
          <span>Phone :</span>
          <span>{inforProfle?.phone}</span>
        </div>
        <div className="containerImage flex">
          <span>Photo :</span>
          <img src={inforProfle?.image} alt="avatar" className="img-fluid" />
        </div>
        <div className="containerSalonName flex">
          <span>Salon name :</span>
          <span>{inforProfle?.salon_name}</span>
        </div>
        <div className="containerWebsite flex">
          <span>Website :</span>
          <span>{inforProfle?.website}</span>
        </div>
        <div className=" flex" >
          <span>Average Star :</span>
          <span>{inforProfle?.star_rate}</span>
        </div>
        <div className="containerReviews flex" style={{
          borderBottomLeftRadius: '20px',
          borderBottomRightRadius: '20px'
        }}>
          <span>Reviews :</span>
          <span>{inforProfle?.reviews_number}</span>
        </div>
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
                <span className="card-title ">Profile</span>
              </div>
              <div className="container">
                {
                  (!inforProfle ? ShowFormCreateProfile() : ShowInforProfile())
                }

              </div>
            </div>
          )
      }
    </React.Fragment>

  )
}

export default Profiles
