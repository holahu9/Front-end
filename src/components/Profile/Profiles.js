import React, { useContext } from 'react';
import "./Style.css";
import { toast } from 'react-toastify';
import { AuthContext } from './../../context/AuthContext';
import { createProfile } from '../../api/profile'
import { uploadImage } from '../../api/upload'
import { getProfile, getIsCreateprofile } from '../../api/profile'
const Profiles = () => {
  const { userData, token } = useContext(AuthContext);
  const [numberPhone, setPhone] = React.useState('')
  const [salonName, setSallonName] = React.useState('')
  const [addrWebsite, setAddrWebsite] = React.useState('')
  const [urlPhoto, setUrlPhoto] = React.useState('https://res.cloudinary.com/dq8rwm2xl/image/upload/v1619358123/image/khr7mhtuttu5kweudkh1.jpg');
  const [isCreated, setIsCreate] = React.useState(false)
  React.useEffect(() => {
    (() => {
      if (token) {
        getIsCreateprofile(token).then((result) => {
          console.log(result)
          if (result?.data?.status === "success") {
            if (result?.data?.data) {
              setIsCreate(true)
            }
          }
        }).catch((e) => {
          console.log(e.response)
          setIsCreate(false)
        })
      }
    })()
    return () => setIsCreate(false)
  }, [token])

  const handlerCreateProfile = (e) => {
    e.preventDefault();
    try {
      createProfile(userData?.name, numberPhone, urlPhoto, salonName, addrWebsite, token).then((result) => {
        console.log(result)
        if (result?.data?.status === 200) toast.success('Create success');
        setPhone('')
        setSallonName('')
        setAddrWebsite('')
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
        <div className="row">
          <div className="col-md-4">
            <div className="profile-img">
              <img src={urlPhoto} alt="avatar" />
              <div className="file btn btn-lg btn-primary">
                Change Photo
              <input type="file" name="file" onChange={onFileChange} required />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="profile-head">
              <h5>
                Hello, {userData?.name ? userData?.name : ''}
              </h5>
              <h6>
                Welcome Back!
            </h6>
              <p className="proile-rating">Rating : <span>8/10</span></p>
              <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item">
                  <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">About</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Reviews</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-2">
            <input type="submit" className="profile-edit-btn" name="btnAddMore" defaultValue="Edit Profile" />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="tab-content profile-tab" id="myTabContent">
              <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                <div className="row">
                  <div className="col-md-6">
                    <label>Name</label>
                  </div>
                  <div className="col-md-6">
                    <p>{userData?.name ? userData?.name : ''}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label>Phone:</label>
                  </div>
                  <div className="col-md-6">
                    <div class="form-group">
                      <input
                        type="text"
                        placeholder="Number Phone"
                        onChange={(e) => setPhone(e.target.value)}
                        value={numberPhone}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label>Salon Name</label>
                  </div>
                  <div className="col-md-6">
                    <div class="form-group">
                      <input
                        type="text"
                        placeholder="Salon Name"
                        onChange={(e) => setSallonName(e.target.value)}
                        value={salonName}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label>Website</label>
                  </div>
                  <div className="col-md-6">
                    <div class="form-group">
                      <input
                        type="text"
                        placeholder="Website"
                        onChange={(e) => setAddrWebsite(e.target.value)}
                        value={addrWebsite}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                {/* <div className="row">
                <div className="col-md-6">
                  <label>Experience</label>
                </div>
                <div className="col-md-6">
                  <p>Expert</p>
                </div>
              </div> */}




              </div>
            </div>
          </div>
        </div>
      </form>
    )
  }
  return (
    <div className="login1">
      <div className="container emp-profile">
        {
          !isCreated ? ShowFormCreateProfile() : null
        }

      </div>



    </div>
  )
}

export default Profiles
